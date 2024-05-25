import { Link } from "react-router-dom";
import { deleteQuiz } from "../../functions/deleteQuiz";
import { FormValues } from "../../interfaces/FormValues";

interface QuizListProps {
  quizzesList: FormValues[];
  quizzes: FormValues[];
  setQuizzesList: (quizzes: FormValues[]) => void;
}

export const QuizList = ({
  quizzesList,
  quizzes,
  setQuizzesList,
}: QuizListProps) => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-6'>
      <h2>Quizzes List</h2>
      <ul className='flex flex-wrap gap-5'>
        {quizzesList.map((item) => {
          return (
            <li
              className='bg-yellow-300 w-80 h-52 flex flex-col justify-center p-4 rounded-lg shadow-md'
              key={item.id}
            >
              <h2>{item.name}</h2>
              <div className='flex justify-between items-center gap-5'>
                <Link to={`/quiz/${item.id}`}>
                  <button
                    className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6
                    bg-[#f6b53d] hover:bg-[#b1893e]
                    duration-300 rounded-xl transform active:scale-95
                    active:bg-[#fedd9f] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
                  >
                    Start Quiz
                  </button>
                </Link>
                <button
                  className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6
                  bg-[#f6623d] hover:bg-[#9d4b36]
                  duration-300 rounded-xl transform active:scale-95
                  active:bg-[#f5b8a9] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
                  onClick={() => {
                    deleteQuiz(item.id, quizzes, setQuizzesList);
                  }}
                >
                  Delete Quiz
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
