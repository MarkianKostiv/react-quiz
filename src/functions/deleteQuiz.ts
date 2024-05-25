import { FormValues } from "../interfaces/FormValues";
import { toast } from "react-toastify";
export const deleteQuiz = (
  quizId: string,
  array: FormValues[],
  setFunc: (quizzes: FormValues[]) => void
) => {
  const updatedArray = array.filter((item: any) => item.id !== quizId);
  console.log(updatedArray);
  setFunc(updatedArray);
  const strArray = JSON.stringify(updatedArray);
  localStorage.setItem("quizArray", strArray);
  toast.success(`Quiz deleted successfully!`);
};
