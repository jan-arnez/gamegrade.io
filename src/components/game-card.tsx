export const maxDuration = 60;
export const dynamic = "force-dynamic";

import quizThumbnail from "@/assets/quiz.webp";
import getSession from "@/lib/getSession";
import Image from "next/image";
import Link from "next/link";
import InfoButton from "./info-button";
import PlayButton from "./play-button";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const GameCard = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <Card className="h-full w-full rounded-md border bg-muted">
      <div className="relative h-[250px] w-full overflow-hidden rounded-md border bg-primary/10">
        <Image src={quizThumbnail} alt="" fill className="object-cover" />
      </div>
      <CardHeader className="space-y-6">
        <div className="space-y-1.5">
          <CardTitle>Quiz: Test your knowledge</CardTitle>
          <CardDescription>
            Test your skills with an interactive quiz.
          </CardDescription>
        </div>
        <div className="flex w-full gap-x-3">
          {user ? (
            <PlayButton user={user} />
          ) : (
            <Link href="/signin" className="w-full">
              <Button className="w-full">Sign in to unlock</Button>
            </Link>
          )}
          <InfoButton />
        </div>
      </CardHeader>
    </Card>
  );
};

export default GameCard;
