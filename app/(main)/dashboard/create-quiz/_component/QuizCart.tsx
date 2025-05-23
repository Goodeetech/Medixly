"use client";
import React, { useEffect, useRef } from "react";
import axios from "axios";
import {
  ArrowRight,
  Download,
  Heart,
  Loader2Icon,
  Settings,
  Settings2Icon,
  Share,
  Share2Icon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface QuizCartProps {
  formData: any; // Replace 'any' with the actual type if known, e.g., { question: string; answer: string }
  step: number;
  GoToNext: () => void;
}

const QuizCart: React.FC<QuizCartProps> = ({ formData, step, GoToNext }) => {
  const [questionList, setQuestionList] = React.useState<any[]>([]); // Replace 'any' with the actual type if known
  const [loading, setLoading] = React.useState(false);
  const hasFetchedRef = useRef(false);
  const { user } = useUser();
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
              <div className="md:px-4 mx-8 my-2 bg-[#34363b] rounded-lg text-gray-200 shadow-2xl flex gap-10 items-center justify-center py-4 ">
                <div className="lg:flex hidden justify-center items-center   shadow-xl bg-[#1f2020] rounded ">
                  <Image
                    src={"/quizimage.png"}
                    alt="quiz"
                    height={250}
                    width={250}
                    className="h-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl capitalize font-semibold">
                    {formData?.QuizTitle}
                  </h3>
                  <h5 className="font-light text-xs">
                    {formData?.QuizDescription}
                  </h5>

                  <div className="flex mt-6 gap-2 items-center">
                    {/* <div className=" rounded-full bg-amber-200 h-8 w-8 "></div> */}
                    <Image
                      src={formData?.imageUrl || "/quizimage.png"}
                      alt="imagee"
                      height={20}
                      width={20}
                      className=""
                    />
                    <div className="flex flex-col ">
                      <h3 className="text-xs font-extralight">Created by</h3>
                      <h2 className="text-xs">{user?.fullName}</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <div className="flex items-center gap-2 mt-4">
                      <div className="bg-black p-1 rounded-full inline-flex items-center justify-center">
                        <Settings color="#308579" size={16} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xs font-extralight">Difficulty</h3>
                        <h2 className="text-xs">{formData?.DifficultyLevel}</h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="bg-black   p-1 rounded-full">
                        <TimerIcon color="#308579" size={16} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xs font-extralight">Time Limit</h3>
                        <h2 className="text-xs">{formData?.TimeLimit}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-6">
                    <Button className="!px-8 cursor-pointer !py-2 tracking-wider">
                      Start Quiz <ArrowRight size={32} />
                    </Button>
                    <div className="p-2 rounded-full outline-gray-400 outline flex items-center ">
                      <Share2Icon size={16} />
                    </div>
                    <div className="p-2 rounded-full outline-gray-400 outline flex items-center ">
                      <Heart size={16} />
                    </div>

                    <Button
                      variant="outline"
                      className="bg-[#34363b] cursor-pointer tracking-wide font-medium"
                      onClick={GoToNext}
                    >
                      <Download color="#308579" /> save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCart;
