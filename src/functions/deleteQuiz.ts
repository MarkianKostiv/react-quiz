import { FormValues } from "../interfaces/FormValues";
export const deleteQuiz = (id: string) => {
  const quizzes = localStorage.getItem("quizArray");
  if (quizzes) {
    const parsedQuizzes = JSON.parse(quizzes);
    const updatedQuizzes = parsedQuizzes.filter(
      (quiz: FormValues) => quiz.id !== id
    );
    localStorage.setItem("quizArray", JSON.stringify(updatedQuizzes));
  }
};
