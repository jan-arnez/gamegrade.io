"use client";
import generateQuiz from "@/action/generateQuiz";
import SelectOptions from "@/app/platform/(pages)/data-source/_components/select-options";
import { User } from "next-auth";
import React, { useState } from "react";
import StatusButton from "./global/status-button";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface PlayButtonProps {
  user: User;
}

const PlayButton: React.FC<PlayButtonProps> = ({ user }) => {
  const [cost, setCost] = useState(5);

  const handleSelectChange = (value: string) => {
    let newCost;

    switch (value) {
      case "10":
        newCost = 5;
        break;
      case "15":
        newCost = 8;
        break;
      case "20":
        newCost = 10;
        break;
      case "25":
        newCost = 13;
        break;
      case "30":
        newCost = 15;
        break;
      default:
        newCost = 5;
    }

    setCost(newCost);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Play Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <div className="flex flex-col space-y-1.5">
            <DialogTitle>Quiz: The fun way to learn!</DialogTitle>
            <DialogDescription>
              Test your skills with interactive quiz.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="space-y-3">
          <form className="w-full space-y-6" action={generateQuiz}>
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="questionsAmount">
                Select the number of questions you would like to generate
              </Label>
              <SelectOptions
                id={user.id!}
                onSelectChange={handleSelectChange}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="timeToAnswer">
                How many seconds do you want to answer each question?
              </Label>
              <Input
                type="number"
                name="timeToAnswer"
                placeholder="Enter time in seconds"
                defaultValue={0}
                min={0}
                step={5}
                required
              />
              <div>
                <p className="text-xs text-muted-foreground">
                  Leave 0 for unlimited time.
                </p>
              </div>
            </div>
            <Input type="hidden" name="cost" value={cost} />
            <StatusButton
              defaultText={`Generate Quiz for ${cost} tokens`}
              pendingText="This could take a minute..."
              className="w-full"
            />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlayButton;
