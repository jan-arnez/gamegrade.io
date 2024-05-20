import openai from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
export const maxDuration = 60;
export async function POST(req: NextRequest) {
  console.log("AI is running -----------------------------------------");
  const { data, questionsAmount }: { data: string; questionsAmount: number } =
    await req.json();
  try {
    if (!data || !questionsAmount) {
      throw new Error("Data or question amount is missing");
    }
    const prompt = `Given the following lecture text, generate a JSON object that represents a quiz according to this schema: Quiz (questions: Question[]); Question (question: String, answers: Answer[]); Answer (text: String, isCorrect: Boolean). The JSON should be one line without spaces. Generate exactly ${questionsAmount}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: data,
        },
      ],
    });

    let quizContent = response.choices[0].message?.content;

    let quizData;

    if (quizContent) {
      quizContent = quizContent.trim();
      const jsonMatch = quizContent.match(/```json([\s\S]*?)```/);
      if (jsonMatch) {
        quizContent = jsonMatch[1].trim();
      }
    }

    if (!quizContent) {
      console.log("No content in response", quizContent);
      throw new Error("No content in response");
    }

    quizData = JSON.parse(quizContent);
    console.log("AI is finished -----------------------------------------");
    return NextResponse.json({ quizData });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz data" },
      { status: 500 },
    );
  }
}
