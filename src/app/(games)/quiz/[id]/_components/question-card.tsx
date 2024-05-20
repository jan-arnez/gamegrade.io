import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Answer, Question } from "@/types/quiz";
import AnswerOption from "./answer-options";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: Answer | null;
  handleAnswerClick: (answer: Answer) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
}

const QuestionCard = ({
  question,
  selectedAnswer,
  handleAnswerClick,
  currentQuestionIndex,
  totalQuestions,
  progress,
}: QuestionCardProps) => {
  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader className="space-y-6">
        <div className="text-center text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </div>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-rows-1 gap-y-3">
        {question.answers.length > 0 ? (
          question.answers.map((answer) => (
            <AnswerOption
              key={answer.id}
              answer={answer}
              selectedAnswer={selectedAnswer}
              handleAnswerClick={handleAnswerClick}
            />
          ))
        ) : (
          <div>There was a problem with getting answers</div>
        )}
      </CardContent>
      <CardFooter>
        <Progress value={progress} className="w-full bg-muted-foreground" />
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
