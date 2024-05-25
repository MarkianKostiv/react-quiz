import { FormikHelpers } from "formik";
import { FormValues } from "../../interfaces/FormValues";
import { ToastContainer, toast } from "react-toastify";
export const onSubmit = (
  data: FormValues,
  { resetForm }: FormikHelpers<FormValues>
) => {
  console.log("Submitting form:", data);

  const hasOneTrueAnswerPerQuestion = data.questions.every(
    (question) =>
      question.answers.filter((answer) => answer.isTrue).length === 1
  );

  if (hasOneTrueAnswerPerQuestion) {
    const storageArray = localStorage.getItem("quizArray");
    let quizArray: FormValues[] = [];

    if (storageArray) {
      try {
        quizArray = JSON.parse(storageArray);
      } catch (e) {
        console.error("Error parsing local storage data:", e);
        localStorage.removeItem("quizArray");
      }
    }

    // Check if the quiz with the same id already exists
    const existingQuizIndex = quizArray.findIndex(
      (quiz) => quiz.id === data.id
    );

    if (existingQuizIndex !== -1) {
      // Replace the existing quiz with the updated one
      toast.success("Quiz was update successfully!");
      quizArray[existingQuizIndex] = data;
      resetForm();
    } else {
      // Add the new quiz
      toast.success("New Quiz was added successfully!");
      quizArray.push(data);
    }

    localStorage.setItem("quizArray", JSON.stringify(quizArray));
    console.log("Form submitted successfully:", data);
  } else {
    console.error("Each question must have exactly one true answer.");
  }
};
