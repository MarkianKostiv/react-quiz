import { Link } from "react-router-dom";
import { deleteQuiz } from "../../functions/deleteQuiz";
import { FormValues } from "../../interfaces/FormValues";
import { useState } from "react";

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
  const [nameValue, setNameValue] = useState<string>("");
  const [originalQuizzes, setOriginalQuizzes] = useState<FormValues[]>(quizzes);

  const handleSearch = () => {
    const filteredQuizzes = originalQuizzes.filter((quiz) =>
      quiz.name.toLowerCase().includes(nameValue.toLowerCase())
    );
    setQuizzesList(filteredQuizzes);
  };

  const handleReset = () => {
    setNameValue("");
    setQuizzesList(originalQuizzes);
  };

  return (
    <div className='w-full flex flex-col items-center justify-center gap-6 pb-4'>
      <h2>Quizzes List</h2>
      <div className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Find by name...'
          value={nameValue}
          onChange={(event) => setNameValue(event.target.value)}
          className='border-2 border-gray-300 rounded-lg px-3 py-2'
        />
        <button
          onClick={handleSearch}
          className={`font-semibold px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none`}
        >
          Find
        </button>
        <button
          onClick={handleReset}
          className={`font-semibold px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none`}
        >
          Reset
        </button>
      </div>
      <ul className='flex flex-wrap gap-5'>
        {quizzesList.map((item) => (
          <li
            className='bg-yellow-300 w-80 h-52 flex flex-col justify-center p-4 rounded-lg shadow-md'
            key={item.id}
          >
            <h2>{item.name}</h2>
            <div className='flex flex-wrap justify-between items-center gap-5'>
              <Link to={`/quiz/${item.id}`}>
                <button
                  className={`font-semibold text-xl px-6 py-4 bg-[#f6b53d] hover:bg-[#b1893e] duration-300 rounded-xl transform active:scale-95 active:bg-[#fedd9f] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
                >
                  Start Quiz
                </button>
              </Link>
              <Link to={`updateQuiz/${item.id}`}>
                <button
                  className={`font-semibold text-xl px-6 py-4 bg-[#3dddf6] hover:bg-[#3994a2] duration-300 rounded-xl transform active:scale-95 active:bg-[#88ecfb] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
                >
                  Edit Quiz
                </button>
              </Link>
              <button
                className={`font-semibold text-xl px-6 py-4 bg-[#f6623d] hover:bg-[#9d4b36] duration-300 rounded-xl transform active:scale-95 active:bg-[#f5b8a9] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
                onClick={() => deleteQuiz(item.id, quizzes, setQuizzesList)}
              >
                Delete Quiz
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
