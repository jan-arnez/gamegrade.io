import { Answer, QuizWithQuestions } from "@/types/quiz";
import { useEffect, useState } from "react";

export const useQuizGame = (id: string) => {
  const [quiz, setQuiz] = useState<QuizWithQuestions | null>(null);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/games/quiz/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const quizData: QuizWithQuestions = await response.json();
        if (quizData && quizData.id && quizData.questions) {
          setQuiz(quizData);
          setInitialTime(quizData.timeToAnswer);
          setTimeLeft(quizData.timeToAnswer);
          setCurrentQuestionIndex(0); // Ensure starting from the first question
        } else {
          setError("No quiz data found");
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    if (initialTime > 0) {
      setProgress((timeLeft / initialTime) * 100);
    }
  }, [timeLeft, initialTime]);

  const handleAnswerClick = (answer: Answer) => {
    setSelectedAnswer(answer);

    if (answer.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (
      quiz &&
      quiz.questions &&
      currentQuestionIndex + 1 < quiz.questions.length
    ) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(initialTime);
    }
  };

  return {
    quiz,
    currentQuestionIndex,
    selectedAnswer,
    error,
    score,
    timeLeft,
    progress,
    handleAnswerClick,
  };
};
