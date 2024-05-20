"use server";
import getSession from "@/lib/getSession";
import { absoluteUrl } from "@/lib/utils";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

type Answer = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

type QuizData = {
  quizData: {
    questions: Question[];
    score?: number;
    timeToAnswer: number;
  };
};

async function fetchQuizData(data: string, questionsAmount: number) {
  console.log("Fetching data-------------");
  const response = await fetch(absoluteUrl("/api/ai/quiz"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: data, questionsAmount: questionsAmount }),
  });

  try {
    if (!response.ok) {
      const errorText = await response.json();
      throw Error(`Error fetching quiz data: ${errorText}`);
    }

    const responseBody = await response.json();

    return responseBody;
  } catch (error) {
    throw new Error("Failed to parse JSON response");
  }
}

export default async function generateQuiz(formData: FormData) {
  const session = await getSession();
  const user = session?.user;

  if (!user || !user.id) {
    return { message: "Not authorized" };
  }

  const dataSource = await prisma.dataSource.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!dataSource) {
    return { message: "Add Data Source" };
  }

  const cost = Number(formData.get("cost"));
  const questionsAmount = Number(formData.get("questionsAmount"));
  const timeToAnswer = Number(formData.get("timeToAnswer"));

  if (!questionsAmount) {
    return { message: "Add questions amount" };
  }

  if (!cost) {
    return { message: "Add cost" };
  }

  if (!timeToAnswer && timeToAnswer !== 0) {
    return { message: "Add time to answer" };
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      tokens: true,
      dataSource: {
        select: {
          data: true,
        },
      },
    },
  });
  if (user.tokens < cost) {
    return redirect("/platform/token-store");
  }

  if (!userData || !userData.tokens) {
    return { message: "User does not exist." };
  }

  const data: QuizData = await fetchQuizData(dataSource.data, questionsAmount);

  const questions = data.quizData.questions;

  console.log(questions);

  const newQuiz = await prisma.quiz.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      questions: {
        create: questions.map((q) => ({
          question: q.question,
          answers: {
            create: q.answers.map((a) => ({
              text: a.text,
              isCorrect: a.isCorrect,
            })),
          },
        })),
      },
      score: 0,
      timeToAnswer: timeToAnswer,
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      tokens: Number(user.tokens) - cost,
    },
  });

  return redirect(`/quiz/${newQuiz.id}`);
}
