import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { link } from "fs";
function App() {
  const quizArray: any = [];
  const quizzes: any = localStorage.getItem("quizArray");
  if (!quizzes) {
    localStorage.setItem("quizArray", quizArray);
  }
  const [quizzesList, setQuizzesList] = useState<any>([]);
  useEffect(() => {
    // const quizzes = localStorage.getItem("quizArray");
    const parsedQuizzes = JSON.parse(quizzes);
    setQuizzesList(parsedQuizzes);
  }, []);
  return (
    <div
      className={`font-extrabold text-3xl flex w-full 
    h-screen justify-start items-center flex-col gap-7 p-12`}
    >
      <Link to={`createQuiz/`}>
        <button
          className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6 
            bg-[#45f3f9] hover:bg-[#3baaae] 
            duration-300 rounded-xl transform active:scale-95 
            active:bg-[#9dfbff] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
        >
          Create your Quiz
        </button>
      </Link>
      {quizzesList ? (
        <div className='w-full flex flex-col items-center justify-center gap-6'>
          <h2>Quizzes List</h2>
          <ul className='flex flex-wrap gap-5'>
            {quizzesList.map((item: any) => {
              return (
                <li
                  className=' bg-yellow-300 w-56 h-36 flex flex-col justify-center p-4 rounded-lg shadow-md'
                  key={item.id}
                >
                  <h2>{item.name}</h2>
                  <button
                    className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6 
            bg-[#f6b53d] hover:bg-[#b1893e] 
            duration-300 rounded-xl transform active:scale-95 
            active:bg-[#fedd9f] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
                  >
                    Start Quiz
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className='p-8 text-red-400'>There are no quizzes for now</p>
      )}
    </div>
  );
}

export default App;
