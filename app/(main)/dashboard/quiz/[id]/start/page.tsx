"use client";

import Timer from "@/components/layers/Timer";
import { Button } from "@/components/ui/button";
import { QuizDetailContext } from "@/context/QuizDetailContext";
import { supabase } from "@/services/SupabaseClient";
import {
  ArrowBigUp,
  ArrowUp,
  ArrowUp01Icon,
  Check,
  CheckCheckIcon,
  ChevronUp,
  CircleCheck,
  LoaderIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const StartQuiz = () => {
  const { id } = useParams();
  const router = useRouter();
  const { quizDetails } = React.useContext(QuizDetailContext);
  // console.log("id", id);
  const questions = quizDetails?.questionList || [];
  const [loading, setloading] = React.useState(false);

  const [quizNumber, setQuizNumber] = React.useState(0);

  const [selectedAnswers, setSelectedAnswers] = React.useState<
    (number | null)[]
  >(() => questions.map(() => null));

  const currentQuestion = questions[quizNumber];
  const isLastQuestion = quizNumber === questions.length;
  console.log("currentQuestion", questions);
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
    <div className="py-16 px-10 lg:w-full  mx-auto lg:mx-0">
      {!questions.length ? (
        <div>
          <p>No quiz data available.</p>
          <Button onClick={() => router.back()} className="mt-4">
            Back
          </Button>
        </div>
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

          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => {
                setQuizNumber(0);
                setSelectedAnswers(questions.map(() => null));
              }}
              className="cursor-pointer"
            >
              Restart Quiz
            </Button>
            <Link href="/dashboard">
              <Button className="cursor-pointer">Dashboard</Button>
            </Link>
          </div>
        </div>
      ) : (
        // main question display
        <div className="lg:grid lg:grid-cols-12 w-full gap-10">
          <div className="lg:col-span-9">
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
                    className={`flex items-center justify-between gap-4 border-2 rounded-lg py-4 px-4 font-semibold transition-colors
                    ${
                      isSelected
                        ? "border-[#2e877c] bg-[#daf5f1]"
                        : "border-gray-300 hover:border-[#2e877c]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {" "}
                      <h2
                        className={`text-lg  inline-flex items-center justify-center`}
                      >
                        {String.fromCharCode(65 + index)}.
                      </h2>
                      <div>{option}</div>
                    </div>
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
                onClick={async () => {
                  if (quizNumber === questions.length - 1) {
                    // Calculate score (if needed)
                    const score = questions.reduce(
                      (acc: number, question: any, index: number) => {
                        if (
                          selectedAnswers[index] !== null &&
                          question.options[selectedAnswers[index]!] ===
                            question.answer
                        ) {
                          return acc + 1;
                        }
                        return acc;
                      },
                      0
                    );
                    setloading(true);

                    // Update quiz in Supabase
                    const { data, error } = await supabase
                      .from("Quiz")
                      .update({
                        status: "completed",
                        score,
                        completedAt: new Date().toISOString(), // optional
                      })
                      .eq("Quiz_id", id) // use the actual quiz ID here
                      .select();

                    if (error) {
                      console.error("Failed to update quiz:", error.message);
                      return;
                    }

                    // Move to summary screen
                    setQuizNumber((prev) => prev + 1);
                    setloading(false);
                  } else {
                    setQuizNumber((prev) =>
                      Math.min(questions.length, prev + 1)
                    );
                  }
                }}
                disabled={selectedAnswers[quizNumber] === null}
              >
                {loading ? <LoaderIcon className="animate-spin" /> : ""}
                {quizNumber === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3 lg:flex gap-4 flex-col hidden  ">
            <div>
              <Timer />
            </div>
            <div>
              <Collapsible className="bg-white shadow-2xl p-4">
                <CollapsibleTrigger className="flex justify-between items-center gap-10 text-sm">
                  <div>Quiz Questions List</div>
                  <div>
                    <ChevronUp color="#2e877c" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 mt-2">
                    {questions.map((quiz: any, index: number) => (
                      <div
                        key={index}
                        className={`${
                          quizNumber >= index &&
                          "text-green-900 bg-green-100  rounded-lg"
                        } flex justify-between gap-6 items-center p-2 text-sm`}
                      >
                        <h2> Quiz Question {index + 1}</h2>
                        <div>
                          {quizNumber >= index && (
                            <CircleCheck strokeWidth={2} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
