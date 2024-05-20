import { Answer } from "@prisma/client";

interface AnswerOptionProps {
  answer: Answer;
  selectedAnswer: Answer | null;
  handleAnswerClick: (answer: Answer) => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  answer,
  selectedAnswer,
  handleAnswerClick,
}: AnswerOptionProps) => {
  return (
    <div
      key={answer.id}
      className={`h-max w-full cursor-pointer rounded-md border p-4 text-left ${
        selectedAnswer
          ? answer.isCorrect
            ? "border-green-500  bg-green-500/20"
            : selectedAnswer.id === answer.id
              ? "border-red-500 bg-red-500/20"
              : ""
          : ""
      }`}
      onClick={() => !selectedAnswer && handleAnswerClick(answer)}
    >
      {answer.text}
    </div>
  );
};

export default AnswerOption;
