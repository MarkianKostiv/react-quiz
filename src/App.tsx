import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { QuizList } from "./components/App/QuizList";
import { getDataLS } from "./functions/getDataLS";
import { FormValues } from "./interfaces/FormValues";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [quizzesList, setQuizzesList] = useState<FormValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzes = await getDataLS("quizArray");
        setQuizzesList(quizzes);
        if (!quizzes || quizzes.length === 0) {
          localStorage.setItem("quizArray", JSON.stringify([]));
        }
      } catch (error) {
        toast.error("Error fetching quizzes from local storage");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div
      className={`font-extrabold text-3xl flex w-full 
    h-screen justify-start items-center flex-col gap-7 p-12`}
    >
      <ToastContainer />
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
      {loading ? (
        <p className='p-8 text-gray-400'>Loading quizzes...</p>
      ) : quizzesList.length > 0 ? (
        <QuizList
          quizzesList={quizzesList}
          quizzes={quizzesList}
          setQuizzesList={setQuizzesList}
        />
      ) : (
        <p className='p-8 text-red-400'>There are no quizzes for now</p>
      )}
    </div>
  );
}

export default App;
