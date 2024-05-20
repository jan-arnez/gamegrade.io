"use server";
import getSession from "@/lib/getSession";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default async function updateScore(formData: FormData) {
  const session = await getSession();
  const user = session?.user;

  if (!user || !user.id) {
    return redirect("/signin");
  }

  const newScore = Number(formData.get("score"));
  const id = formData.get("id") as string;

  if (!id || !newScore) {
    return NextResponse.json({ error: "Missing fields" });
  }

  const currentScore = await prisma.quiz.findFirst({
    where: {
      id,
    },
    select: {
      score: true,
    },
  });

  if (!currentScore) {
    return NextResponse.json({ error: "Quiz not found" });
  }

  if (!currentScore.score || currentScore.score < newScore) {
    await prisma.quiz.update({
      where: {
        id,
      },
      data: {
        score: newScore,
      },
    });
  }
}
