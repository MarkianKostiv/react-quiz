import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FormValues } from "../../interfaces/FormValues";
import { useTimer } from "react-timer-hook";
import { QuizTestList } from "../../components/QuizPages/QuizTestList";
import { handleAnswerChange } from "./handleAnswerChange";

export const QuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<FormValues | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [score, setScore] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [feedback, setFeedback] = useState<{ [key: number]: boolean }>({});
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const quizzes = localStorage.getItem("quizArray");
    if (quizzes) {
      const parsedQuizzes: FormValues[] = JSON.parse(quizzes);
      const selectedQuiz = parsedQuizzes.find((item) => item.id === quizId);
      if (selectedQuiz) {
        setQuiz(selectedQuiz);
        const initialAnswers = selectedQuiz.questions.reduce(
          (acc, _, index) => ({ ...acc, [index]: -1 }),
          {}
        );
        setUserAnswers(initialAnswers);

        const timeInSeconds = selectedQuiz.time * 60;
        const expiryTimestamp = new Date();
        expiryTimestamp.setSeconds(
          expiryTimestamp.getSeconds() + timeInSeconds
        );
        setTime(expiryTimestamp);
      }
    }
  }, [quizId]);

  const handleSubmit = () => {
    if (quiz) {
      let calculatedScore = 0;
      let newFeedback: any = {};
      quiz.questions.forEach((question, questionIndex) => {
        const selectedAnswerIndex = userAnswers[questionIndex];
        if (
          selectedAnswerIndex !== undefined &&
          selectedAnswerIndex !== -1 &&
          question.answers[selectedAnswerIndex].isTrue
        ) {
          calculatedScore += question.points;
          newFeedback[questionIndex] = true;
        } else {
          newFeedback[questionIndex] = false;
        }
      });
      setScore(calculatedScore);
      setFeedback(newFeedback);
    }
  };

  useEffect(() => {
    if (isTimeUp) {
      handleSubmit();
    }
  }, [isTimeUp]);

  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp: time || new Date(),
      onExpire: () => setIsTimeUp(true),
      autoStart: false,
    });

  useEffect(() => {
    if (time) {
      restart(time);
    }
  }, [time]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const totalPossibleScore = quiz.questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <Link
        to={`/`}
        className='text-blue-500 hover:underline'
      >
        Main
      </Link>
      <h1 className='text-2xl font-bold mb-4'>{quiz.name}</h1>
      <div className='mb-4'>
        <h2 className='text-xl'>
          Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className='space-y-6'
      >
        <QuizTestList
          quiz={quiz}
          userAnswers={userAnswers}
          handleAnswerChange={handleAnswerChange}
          setUserAnswers={setUserAnswers}
          score={score}
          feedback={feedback}
        />
        <button
          type='submit'
          className='w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'
        >
          Submit Quiz
        </button>
      </form>
      {score !== null && (
        <div className='mt-4 p-4 bg-green-100 border border-green-400 rounded'>
          <h2 className='text-xl font-bold'>
            Your Score: {score}/{totalPossibleScore}
          </h2>
        </div>
      )}
      {isTimeUp && (
        <div className='mt-4 p-4 bg-red-100 border border-red-400 rounded'>
          <h2 className='text-xl font-bold'>
            Time's up! Your score has been submitted.
          </h2>
        </div>
      )}
    </div>
  );
};
