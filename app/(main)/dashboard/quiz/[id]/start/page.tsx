"use client";

import { Button } from "@/components/ui/button";
import { QuizDetailContext } from "@/context/QuizDetailContext";
import React from "react";

const StartQuiz = () => {
  const { quizDetails } = React.useContext(QuizDetailContext);
  const questions = quizDetails?.questionList || [];

  const [quizNumber, setQuizNumber] = React.useState(0);

  const [selectedAnswers, setSelectedAnswers] = React.useState<
    (number | null)[]
  >(() => questions.map(() => null));

  const currentQuestion = questions[quizNumber];
  const isLastQuestion = quizNumber === questions.length;

  const selectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      if (updated[quizNumber] === optionIndex) {
        updated[quizNumber] = null;
      } else {
        updated[quizNumber] = optionIndex;
      }
      return updated;
    });
  };
  const score = questions.reduce(
    (acc: number, question: any, index: number) => {
      if (
        selectedAnswers[index] !== null &&
        question.options[selectedAnswers[index]!] === question.answer
      ) {
        return acc + 1;
      }
      return acc;
    },
    0
  );

  return (
    <div className="py-16 px-14 max-w-3xl mx-auto">
      {!questions.length ? (
        <p>No quiz data available.</p>
      ) : isLastQuestion ? (
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">Quiz Summary</h1>
          <p className="text-xl font-semibold mb-6 text-center">
            Your score: {score} / {questions.length}
          </p>
          {questions.map((q: any, i: number) => {
            const selectedIndex = selectedAnswers[i];
            const isCorrect =
              selectedIndex !== null && q.options[selectedIndex] === q.answer;

            return (
              <div
                key={i}
                className="mb-6 p-4 border border-[#2e877c] rounded-xl bg-gray-50 space-y-2"
              >
                <p className="font-semibold">
                  Q{i + 1}: {q.question}
                </p>

                <div className="flex items-center gap-2">
                  {selectedIndex !== null ? (
                    isCorrect ? (
                      <span className="text-green-600 font-bold">✔</span>
                    ) : (
                      <span className="text-red-600 font-bold">✖</span>
                    )
                  ) : (
                    <span className="text-gray-500">Not answered</span>
                  )}
                  <span>
                    {selectedIndex !== null &&
                      `${String.fromCharCode(65 + selectedIndex)}. ${
                        q.options[selectedIndex]
                      }`}
                  </span>
                </div>

                {!isCorrect && selectedIndex !== null && (
                  <p className="text-green-700 text-sm">Correct: {q.answer}</p>
                )}
                <p className="text-gray-700 text-sm">
                  Explanation: {q.explanation}
                </p>
              </div>
            );
          })}

          <Button
            onClick={() => {
              setQuizNumber(0);
              setSelectedAnswers(questions.map(() => null));
            }}
            className="mt-6"
          >
            Restart Quiz
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold mb-6">
            {currentQuestion?.question}
          </h1>

          <div className="flex flex-col gap-4">
            {currentQuestion?.options.map((option: string, index: number) => {
              const isSelected = selectedAnswers[quizNumber] === index;
              return (
                <button
                  key={index}
                  onClick={() => selectOption(index)}
                  className={`flex items-center gap-4 border-2 rounded-lg py-4 px-4 font-semibold transition-colors
                    ${
                      isSelected
                        ? "border-[#2e877c] bg-[#daf5f1]"
                        : "border-gray-300 hover:border-[#2e877c]"
                    }`}
                >
                  <span className="text-lg">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-8">
            <Button
              disabled={quizNumber === 0}
              onClick={() => setQuizNumber((prev) => Math.max(0, prev - 1))}
            >
              Back
            </Button>
            <Button
              onClick={() =>
                setQuizNumber((prev) => Math.min(questions.length, prev + 1))
              }
              disabled={selectedAnswers[quizNumber] === null}
            >
              {quizNumber === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
