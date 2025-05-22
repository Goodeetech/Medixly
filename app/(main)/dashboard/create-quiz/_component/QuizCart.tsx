"use client";
import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

interface QuizCartProps {
  formData: any; // Replace 'any' with the actual type if known, e.g., { question: string; answer: string }
}

const QuizCart: React.FC<QuizCartProps> = ({ formData }) => {
  const [questionList, setQuestionList] = React.useState<any[]>([]); // Replace 'any' with the actual type if known
  const [loading, setLoading] = React.useState(false);
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (formData && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      // GenerateQuiz();
    }
  }, []);

  const GenerateQuiz = async () => {
    setLoading(true);
    const result = await axios.post("/api/ai-model", { ...formData });
    let content = result.data.content;

    const jsonMatch = content.match(/```json([\s\S]*?)```/);

    if (!jsonMatch || !jsonMatch[1]) {
      throw new Error("Could not extract JSON block from AI response");
    }

    try {
      const parsedQuestions = JSON.parse(jsonMatch[1].trim());
      console.log(parsedQuestions);
      setQuestionList(parsedQuestions);
      setLoading(false);
      // setQuestionList(parsedQuestions););
    } catch (error) {
      console.error("Failed to parse content", error);
      throw new Error("Invalid JSON format returned from AI");
    }
  };

  return (
    <div>
      <div>
        {loading ? (
          <div className="flex p-2 bg-gray-50 shadow-lg rounded-lg  gap-4 items-center justify-center">
            <div className="">
              <Loader2Icon
                className="animate-spin "
                color="#308579"
                size={40}
              />
            </div>
            <div>
              <h1 className="text-md text-gray-900 font-semibold">
                Medixly is Generating Your Ultimate Quiz Experience…
              </h1>
              <h4 className="text-sm text-[#308579] font-normal">
                Please wait while our AI tailors questions that will test,
                teach, and thrill you.
              </h4>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex px-6 py-2 items-center bg-gray-50  gap-4 justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  You&apos;re One Step Away from Boosting Your Brainpower
                </h1>
                <h3 className="text-sm text-gray-500">
                  Get ready to challenge your mind — click ‘Start Quiz’ and let
                  the learning begin
                </h3>
              </div>
              <div>
                <Image
                  src={"/gemini.png"}
                  alt="gemini"
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <div>
              <div className="px-6 my-2 bg-[#272A30] rounded-lg text-gray-200 py-4">
                <h3 className="uppercase"> {formData?.QuizTitle}</h3>
                <h4 className="text-sm">{formData?.QuizDescription}</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCart;
