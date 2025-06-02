import { NextResponse } from "next/server";
import OpenAI from "openai";
import { QuizLibraryPrompt } from "@/lib/prompt/prompt";

export async function POST(req: Request) {
  const { title, questionCount, prompt } = await req.json();
  const seed = Math.floor(Math.random() * 100000);

  const FinalPrompt = QuizLibraryPrompt.replace("{{title}}", title)
    .replace("{{prompt}}", prompt)
    .replace("{{questionCount}}", questionCount)
    .replace("{{seed}}", seed.toString());

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-maverick:free",
      messages: [{ role: "user", content: FinalPrompt }],
    });
    console.log(completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Error generating interview questions:", error);
    return NextResponse.json({
      error: "Failed to generate interview questions",
    });
  }
}
