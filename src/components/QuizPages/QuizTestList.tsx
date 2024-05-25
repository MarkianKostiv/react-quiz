import { RadioGroup } from "@headlessui/react";
import { Checkbox } from "@headlessui/react";
export const QuizTestList = ({
  quiz,
  userAnswers,
  handleAnswerChange,
  score,
  feedback,
  setUserAnswers,
}: any) => {
  return (
    <ul className='space-y-4'>
      {quiz.questions.map((question: any, questionIndex: any) => (
        <li
          key={questionIndex}
          className='bg-white p-4 rounded shadow'
        >
          <h3 className='text-lg font-medium'>{question.question}</h3>
          <RadioGroup
            value={userAnswers[questionIndex]}
            onChange={(value) =>
              handleAnswerChange(questionIndex, value, setUserAnswers)
            }
          >
            <div className='space-y-2 mt-2'>
              {question.answers.map((answer: any, answerIndex: any) => (
                <RadioGroup.Option
                  key={answerIndex}
                  value={answerIndex}
                  className={({ checked }) =>
                    `flex items-center space-x-2 p-2 border rounded cursor-pointer ${
                      checked
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300"
                    }`
                  }
                >
                  {({ checked }) => (
                    <>
                      <input
                        type='radio'
                        name={`question-${questionIndex}`}
                        value={answerIndex}
                        checked={userAnswers[questionIndex] === answerIndex}
                        onChange={() =>
                          handleAnswerChange(questionIndex, answerIndex)
                        }
                        className='hidden'
                      />
                      <div className='flex items-center space-x-2'>
                        {checked && (
                          <Checkbox className='h-5 w-5 text-blue-500' />
                        )}
                        <span>{answer.answer}</span>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          {score !== null && (
            <div
              className={`mt-2 ${
                feedback[questionIndex] ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedback[questionIndex] ? "Correct" : "Incorrect"}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
