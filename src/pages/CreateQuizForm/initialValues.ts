import { FormValues } from "../../interfaces/FormValues";
export const initialValues: FormValues = {
  id: crypto.randomUUID(),
  name: "",
  questions: [
    {
      question: "",
      points: 1,
      answers: [{ answer: "", isTrue: false }],
    },
  ],
};
