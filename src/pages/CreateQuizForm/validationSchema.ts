import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Quiz name is required"),
  time: Yup.number()
    .typeError("Points must be a number")
    .required("Points is required")
    .min(1, "Minimum 1 point"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      points: Yup.number()
        .typeError("Points must be a number")
        .required("Points is required")
        .min(1, "Minimum 1 point"),
      answers: Yup.array()
        .of(
          Yup.object().shape({
            answer: Yup.string().required("Answer is required"),
            isTrue: Yup.boolean(),
          })
        )
        .test(
          "at-least-one-true",
          "Exactly 1 correct answer is required",
          (answers) => answers?.filter((answer) => answer.isTrue).length === 1
        ),
    })
  ),
});
