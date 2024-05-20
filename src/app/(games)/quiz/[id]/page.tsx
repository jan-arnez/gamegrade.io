"use client";
import updateScore from "@/action/updateScore";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuizGame } from "@/hooks/useQuizGame";
import { FormEvent } from "react";
import QuestionCard from "./_components/question-card";

const QuizGame = ({ params }: { params: { id: string } }) => {
  const {
    quiz,
    currentQuestionIndex,
    selectedAnswer,
    error,
    score,
    progress,
    handleAnswerClick,
  } = useQuizGame(params.id);

  if (error) {
    return (
      <div>
        <b>Error:</b> {error}
      </div>
    );
  }

  if (!quiz) return <Spinner />;
  if (!quiz.questions || quiz.questions.length === 0)
    return (
      <div>
        No questions available! Check if your data source contains enough
        information to generate a quiz.
      </div>
    );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.location.reload();
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="relative flex h-screen items-center justify-center">
      {currentQuestionIndex >= quiz.questions.length ? (
        <Card className="w-[500px] text-center">
          <CardHeader className="space-y-6">
            <CardTitle>You scored:</CardTitle>
            <div>
              {score} out of {quiz.questions.length}
            </div>
            <form action={updateScore} onSubmit={handleSubmit} method="POST">
              <input type="hidden" value={score} name="score" />
              <input type="hidden" value={params.id} name="id" />
              <Button className="w-full" type="submit">
                Play Again
              </Button>
            </form>
          </CardHeader>
        </Card>
      ) : (
        <>
          <QuestionCard
            progress={progress}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            handleAnswerClick={handleAnswerClick}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
          />
        </>
      )}
    </div>
  );
};

export default QuizGame;
