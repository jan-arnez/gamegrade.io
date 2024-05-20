import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getSession from "@/lib/getSession";
import { formateDate } from "@/lib/utils";
import prisma from "@/prisma/db";
import Link from "next/link";

const GenerationHistory = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return (
      <div className="container flex h-full w-full items-center justify-center">
        You need to be logged in to access this content.
      </div>
    );
  }

  const quizzes = await prisma.quiz.findMany({
    where: {
      userId: user.id,
    },
  });

  if (!quizzes) {
    return <div>Looks like there is no history.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 ">
        {quizzes.map((quiz) => (
          <GenerationHistoryCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </>
  );
};

type GenerationHistoryCardProps = {
  quiz: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    score: number | null;
    timeToAnswer: number;
    userId: string;
  };
};

const GenerationHistoryCard = ({ quiz }: GenerationHistoryCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Game ID: {quiz.id}</CardTitle>
      <CardDescription>
        Generated at {formateDate(quiz.createdAt)}
      </CardDescription>
    </CardHeader>

    <CardFooter>
      <Link href={`/quiz/${quiz.id}`} className="w-full">
        <Button className="w-full">Play this Game</Button>
      </Link>
    </CardFooter>
  </Card>
);

export default GenerationHistory;
