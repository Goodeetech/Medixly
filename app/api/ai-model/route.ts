import { QuizPrompt } from "@/lib/prompt/prompt";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(req: Request) {
  try {
    const { QuizTitle, QuizDescription, DifficultyLevel, timeLimit, Subject } =
      await req.json();

    const FinalPrompt = QuizPrompt.replace("{{quizTitle}}", QuizTitle)
      .replace("{{quizDescription}}", QuizDescription)
      .replace("{{difficulty}}", DifficultyLevel)
      .replace("{{timeLimit}}", timeLimit)
      .replace("{{subject}}", Subject);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat:free",
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
