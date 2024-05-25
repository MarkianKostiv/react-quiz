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
    return (
      <div className='w-full h-full flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col'>
      <ToastContainer />
      <h1 className='text-center font-semibold text-xl'>Create Quiz</h1>
      <Link
        className='flex items-center justify-center'
        to={"/"}
      >
        <button
          className={` font-semibold text-xl p-4 bg-slate-400 hover:bg-slate-600 
        hover:text-white active:bg-slate-200 rounded-xl duration-300`}
        >
          Main
        </button>
      </Link>
      <div className='w-full flex items-center justify-center p-6'>
        <Formik
          initialValues={startInitialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ values }) => (
            <Form
              className={`w-full flex flex-col 
            items-center justify-center bg-[#4D6CFA] gap-8 rounded-lg`}
            >
              <div className='w-full gap-3 flex items-center pt-4 pb-4 pl-8 pr-8'>
                <label className='flex flex-col items-start justify-center'>
                  Quiz Name:
                  <Field
                    type='text'
                    id='name'
                    name='name'
                    className='pl-4 border-2 border-black rounded-lg h-8 w-80'
                  />
                  <ErrorMessage
                    name='name'
                    component='span'
                    className='text-red-500 text-sm mt-1'
                  />
                </label>
                <label className='flex flex-col items-start justify-center'>
                  Quiz Time im minutes:
                  <Field
                    type='number'
                    id='time'
                    name='time'
                    className='pl-4 border-2 border-black rounded-lg h-8 w-10'
                  />
                  <ErrorMessage
                    name='time'
                    component='span'
                    className='text-red-500 text-sm mt-1'
                  />
                </label>
              </div>

              <FieldArray name='questions'>
                {({ push, remove }) => (
                  <div className='flex flex-col bg-green-400 w-full gap-6 pt-4 pb-4 pl-8 pr-8'>
                    {values.questions.map((question, index) => (
                      <div
                        className='flex flex-col bg-green-500 gap-4 p-4 rounded-xl'
                        key={index}
                      >
                        <div className='flex flex-col gap-4 p-4'>
                          <label
                            className='flex flex-col items-start justify-center'
                            htmlFor={`questions[${index}].question`}
                          >
                            Question {index + 1}:
                            <Field
                              className='pl-4 rounded-lg h-10 w-full'
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
                          <label
                            className='flex flex-col items-center justify-center'
                            htmlFor={`questions[${index}].points`}
                          >
                            Points:
                            <Field
                              className='border-2 border-black rounded-lg h-10 w-10 pl-2'
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
                            <div className='flex flex-col gap-4'>
                              {question.answers.map((answer, answerIndex) => (
                                <div
                                  key={answerIndex}
                                  className='flex flex-col gap- p-4'
                                >
                                  <label
                                    className='flex flex-col gap-2'
                                    htmlFor={`questions[${index}].answers[${answerIndex}].answer`}
                                  >
                                    Answer {answerIndex + 1}:
                                    <Field
                                      className='pl-4 rounded-lg h-8'
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
                                    className='flex gap-3 items-center cursor-pointer'
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
                                    className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 active:bg-red-200'
                                    onClick={() => remove(answerIndex)}
                                  >
                                    Remove Answer
                                  </button>
                                </div>
                              ))}
                              <button
                                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-200'
                                onClick={() =>
                                  push({ answer: "", isTrue: false })
                                }
                              >
                                Add Answer
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        <div className='w-full flex items-center justify-around p-2 gap-4 '>
                          <button
                            type='button'
                            className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6 
                            bg-[#009C2F] hover:bg-[#339039] 
                            duration-300 rounded-xl transform active:scale-95 
                            active:bg-[#007B2C] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
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
                            className={`font-semibold text-xl pt-4 pb-4 pr-6 pl-6 
                            bg-[#f84242] hover:bg-[#b43e3e] 
                            duration-300 rounded-xl transform active:scale-95 
                            active:bg-[#f69c9c] focus:outline-none shadow-md hover:shadow-lg active:shadow-none`}
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
