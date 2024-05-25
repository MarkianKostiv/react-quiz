import { useState, useEffect } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Link, useParams } from "react-router-dom";
import { validationSchema } from "./validationSchema";
import { onSubmit } from "./onSubmit";
import { initialValues } from "./initialValues";
import { getDataLS } from "../../functions/getDataLS";
import { FormValues } from "../../interfaces/FormValues";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FromProps {
  isAddOrUpdate: string;
}

export const CreateQuizForm = ({ isAddOrUpdate }: FromProps) => {
  const [startInitialValues, setStartInitialValues] =
    useState<FormValues>(initialValues);
  const { quizId } = useParams<{ quizId: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (isAddOrUpdate === "Add") {
          setStartInitialValues(initialValues);
        } else if (isAddOrUpdate === "Update" && quizId) {
          const quizValues = await getDataLS("quizArray");
          const selectedQuiz = quizValues.find((item) => item.id === quizId);
          if (selectedQuiz) {
            setStartInitialValues(selectedQuiz);
          }
        }
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAddOrUpdate, quizId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full flex flex-col'>
      <ToastContainer />
      <h1>Create Quiz</h1>
      <Link to={"/"}>Main</Link>
      <div className='w-full flex items-center justify-center'>
        <Formik
          initialValues={startInitialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
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
