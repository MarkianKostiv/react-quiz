import { FormValues } from "../../interfaces/FormValues";
export const initialValues: FormValues = {
  id: crypto.randomUUID(),
  name: "",
  time: 1,
  questions: [
    {
      question: "",
      points: 1,
      answers: [{ answer: "", isTrue: false }],
    },
  ],
};
