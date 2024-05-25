export const handleAnswerChange = (
  questionIndex: number,
  answerIndex: number,
  setFunc: any
) => {
  setFunc((prev: any) => ({ ...prev, [questionIndex]: answerIndex }));
};
