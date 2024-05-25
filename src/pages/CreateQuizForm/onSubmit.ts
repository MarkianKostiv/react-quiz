import { FormikHelpers } from "formik";
import { FormValues } from "../../interfaces/FormValues";
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

    // If there is already an array in local storage, parse it
    if (storageArray) {
      try {
        quizArray = JSON.parse(storageArray);
      } catch (e) {
        console.error("Error parsing local storage data:", e);
        // Clear corrupted data
        localStorage.removeItem("quizArray");
      }
    }

    // Add the new quiz data to the array
    quizArray.push(data);

    // Save the updated array back to local storage
    localStorage.setItem("quizArray", JSON.stringify(quizArray));

    console.log("Form submitted successfully:", data);
    resetForm();
  } else {
    console.error("Each question must have exactly one true answer.");
  }
};
