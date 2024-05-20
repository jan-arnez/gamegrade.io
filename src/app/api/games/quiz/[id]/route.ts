export const maxDuration = 60;
import prisma from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      questions: {
        select: {
          id: true,
          question: true,
          answers: true,
        },
      },
      timeToAnswer: true,
    },
  });

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json(quiz);
}
