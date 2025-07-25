import { QuizLibraryPrompt } from "@/lib/prompt/prompt";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { title, questionCount, prompt } = await req.json();
  const seed = Math.floor(Math.random() * 100000);

  const FinalPrompt = QuizLibraryPrompt.replace("{{title}}", title)
    .replace("{{prompt}}", prompt)
    .replace("{{questionCount}}", questionCount)
    .replace("{{seed}}", seed.toString());

  const openai = new OpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.time("🔁 GROQ Completion");
      const completion = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: FinalPrompt }],
      });
      console.timeEnd("🔁 GROQ Completion");

      const message = completion.choices?.[0]?.message?.content;

      if (!message) {
        console.warn(`⚠️ No content received on attempt ${attempt}.`);
        if (attempt === maxRetries) {
          return NextResponse.json(
            { error: "No content received from AI after multiple attempts." },
            { status: 500 }
          );
        }
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        continue;
      }

      // 🔍 Strict validation: try parsing or fallback to regex match
      let parsed;
      try {
        parsed = JSON.parse(message); // Try direct parse
        if (!Array.isArray(parsed)) throw new Error("Not an array");
      } catch {
        const jsonMatch = message.match(/\[\s*{[\s\S]*?}\s*\]/);
        if (!jsonMatch) {
          console.error(
            "❌ Could not extract valid JSON array from AI response"
          );
          throw new Error("Invalid JSON format from AI");
        }

        parsed = JSON.parse(jsonMatch[0]);
        if (!Array.isArray(parsed)) {
          throw new Error("Extracted content is not a JSON array");
        }
      }

      // ✅ Valid JSON array — return clean result
      console.log("✅ Success on attempt:", attempt);
      return NextResponse.json({ content: JSON.stringify(parsed) });
    } catch (error: any) {
      const isNetworkError =
        !error.response ||
        error.code === "ECONNRESET" ||
        error.code === "ENOTFOUND" ||
        error.code === "ETIMEDOUT" ||
        error.name === "FetchError";

      if (!isNetworkError) {
        console.error("❌ Fatal error:", error.message);
        return NextResponse.json(
          { error: "An unrecoverable error occurred." },
          { status: 500 }
        );
      }

      console.warn(`⚠️ Network error on attempt ${attempt}: ${error.message}`);
      if (attempt === maxRetries) {
        return NextResponse.json(
          { error: "Failed due to network issues after multiple attempts." },
          { status: 500 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
}
