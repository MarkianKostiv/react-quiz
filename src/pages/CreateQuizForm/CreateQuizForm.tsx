import {
  Formik,
  Form,
  FieldArray,
  Field,
  FormikHelpers,
  ErrorMessage,
} from "formik";
import { Link } from "react-router-dom";
import { FormValues } from "../../interfaces/FormValues";
import { validationSchema } from "./validationSchema";
import "../../index.css";

export const CreateQuizForm = () => {
  const initialValues: FormValues = {
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

  const onSubmit = (
    data: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log("Submitting form:", data);

    const hasOneTrueAnswerPerQuestion = data.questions.every(
      (question) =>
        question.answers.filter((answer) => answer.isTrue).length === 1
    );

    if (hasOneTrueAnswerPerQuestion) {
      // Retrieve the current quiz array from local storage
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

  return (
    <div className='w-full flex flex-col'>
      <h1>Create Quiz</h1> <Link to={"/"}>Main</Link>
      <div className='w-full flex items-center justify-center'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className='w-full flex flex-col items-center justify-center bg-gray-800 gap-8'>
              <div className='w-full flex items-center bg-red-500 pt-4 pb-4 pl-8 pr-8'>
                <label className='flex flex-col items-start justify-center'>
                  Quiz Name:
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    className='border-2 border-black rounded-lg h-8 w-80'
                  />
                  <ErrorMessage
                    name='name'
                    component='span'
                    className='text-red-500 text-sm mt-1'
                  />
                </label>
              </div>

              <FieldArray name='questions'>
                {({ push, remove }) => (
                  <div className='flex flex-col bg-green-400 w-full gap-6'>
                    {values.questions.map((question, index) => (
                      <div
                        className='flex flex-col bg-green-500 gap-4'
                        key={index}
                      >
                        <div className='flex'>
                          <label
                            className='flex flex-col items-start justify-center'
                            htmlFor={`questions[${index}].question`}
                          >
                            Question {index + 1}:
                            <Field
                              className='border-2 border-black rounded-lg h-8 w-80'
                              type='text'
                              id={`questions[${index}].question`}
                              name={`questions[${index}].question`}
                            />
                            <ErrorMessage
                              name={`questions[${index}].question`}
                              component='span'
                              className='text-red-500 text-sm mt-1'
                            />
                          </label>
                          <label htmlFor={`questions[${index}].points`}>
                            Points:
                            <Field
                              type='number'
                              id={`questions[${index}].points`}
                              name={`questions[${index}].points`}
                            />
                            <ErrorMessage
                              name={`questions[${index}].points`}
                              component='span'
                              className='text-red-500 text-sm mt-1'
                            />
                          </label>
                        </div>

                        <FieldArray name={`questions[${index}].answers`}>
                          {({ push, remove }) => (
                            <div className='flex flex-col'>
                              {question.answers.map((answer, answerIndex) => (
                                <div
                                  key={answerIndex}
                                  className='flex gap-4'
                                >
                                  <label
                                    htmlFor={`questions[${index}].answers[${answerIndex}].answer`}
                                  >
                                    Answer {answerIndex + 1}:
                                    <Field
                                      type='text'
                                      id={`questions[${index}].answers[${answerIndex}].answer`}
                                      name={`questions[${index}].answers[${answerIndex}].answer`}
                                    />
                                    <ErrorMessage
                                      name={`questions[${index}].answers[${answerIndex}].answer`}
                                      component='span'
                                      className='text-red-500 text-sm mt-1'
                                    />
                                  </label>
                                  <label
                                    htmlFor={`questions[${index}].answers[${answerIndex}].isTrue`}
                                  >
                                    Set This Answer is True
                                    <Field
                                      type='checkbox'
                                      id={`questions[${index}].answers[${answerIndex}].isTrue`}
                                      name={`questions[${index}].answers[${answerIndex}].isTrue`}
                                    />
                                  </label>
                                  <button
                                    type='button'
                                    onClick={() => remove(answerIndex)}
                                  >
                                    Remove Answer
                                  </button>
                                </div>
                              ))}
                              <button
                                type='button'
                                onClick={() =>
                                  push({ answer: "", isTrue: false })
                                }
                              >
                                Add Answer
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        <div className='w-full flex gap-4'>
                          <button
                            type='button'
                            onClick={() =>
                              push({
                                question: "",
                                points: 1,
                                answers: [{ answer: "", isTrue: false }],
                              })
                            }
                          >
                            Add Question
                          </button>

                          <button
                            type='button'
                            onClick={() => remove(index)}
                          >
                            Remove Question
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              <div className='w-full flex justify-center items-center pb-4'>
                <button
                  className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6 
            bg-[#009C2F] hover:bg-[#339039] 
            duration-300 rounded-xl transform active:scale-95 
            active:bg-[#007B2C] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
