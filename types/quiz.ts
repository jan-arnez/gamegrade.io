export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
  createdAt: Date;
  updatedAt: Date;
  questionId: string;
};

export type Question = {
  id: string;
  question: string;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
  quizId: string;
};
export type QuizWithQuestions = {
  id: string;
  questions: Question[];
  score?: number;
  timeToAnswer: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
