"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QuizCategory } from "@/lib/QuizLibrary/QuizLib";
import {
  ArrowRight,
  Download,
  Heart,
  Loader2Icon,
  LoaderCircle,
  Settings,
  Share2Icon,
  TimerIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Quiz = {
  id: string;
  title: string;
  questionCount: number;
  prompt: string;
};
const SingleLibraryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  console.log(id);
  const [singleQuiz, setSingleQuiz] = useState<any | null>(null);
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  console.log("SINGLE Quiz", singleQuiz);

  const getQuiz = () => {
    const allQuizzes = QuizCategory.flatMap(
      (category) => category.quizzes || []
    );
    const matchedQuiz = allQuizzes.find((quiz) => quiz.id === id);
    setSingleQuiz(matchedQuiz);
  };

  const CreateLibraryQuiz = async () => {
    try {
      if (!singleQuiz) return;
      const result = await axios.post("/api/quiz-library", singleQuiz);
      let content = result.data.content;
      let parsedQuestions;
      try {
        parsedQuestions = JSON.parse(content);
      } catch (innerError) {
        // If content isn't directly parseable, try extracting a JSON array
        const jsonMatch = content.match(/\[\s*{[\s\S]*}\s*\]/);
        if (jsonMatch) {
          parsedQuestions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error(
            "Could not extract a valid JSON array from AI response"
          );
        }
      }
      setQuestionList(parsedQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Quiz generation failed:", error);
      alert("An error occurred while generating the quiz. Please try again.");
      router.push("/dashboard/create-quiz");
    }
  };

  useEffect(() => {
    if (id) {
      getQuiz();
    }
  }, [id]);

  useEffect(() => {
    if (singleQuiz && id) {
      //   CreateLibraryQuiz();
    }
  }, [id, singleQuiz]);

  return (
    <div className="px-10 py-4 bg-gray-100 mx-6 ">
      <div className="flex justify-center items-center">
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
                Medixly is Generating Your {singleQuiz?.title} Quiz Experience…
              </h1>
              <h4 className="text-sm text-[#308579] font-normal">
                Please wait while our AI tailors questions that will test,
                teach, and thrill you.
              </h4>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex md:px-6  items-center bg-gray-50  gap-4 justify-between mt-20 md:mt-10">
              <div className="max-w-md">
                <h1 className="lg:text-3xl md:text-2xl text-xl font-bold">
                  You&apos;re One Step Away from Boosting Your Brainpower
                </h1>
                <h3 className="text-sm text-gray-500">
                  Get ready to challenge your mind — click ‘Start Quiz’ and let
                  the learning begin
                </h3>
              </div>
              <div className="hidden lg:block">
                <Image
                  src={"/gemini.png"}
                  alt="gemini"
                  width={150}
                  height={150}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div>
              <div className="px-4  md:mx-8 py-4     my-8 mt-8 bg-[#34363b] rounded-lg max-w-xl lg:max-w-full mx-auto text-gray-200 shadow-2xl flex gap-10 items-center justify-center  relative">
                <div className="lg:flex hidden justify-center items-center   shadow-xl bg-[#1f2020] rounded ">
                  <Image
                    src={"/quizimage.png"}
                    alt="quiz"
                    height={200}
                    width={200}
                    className="h-full "
                  />
                </div>
                <div>
                  <h3 className="text-2xl  capitalize font-semibold">
                    {singleQuiz?.title}
                  </h3>

                  <div className="grid grid-cols-2 ">
                    <div className="flex items-center gap-2 mt-4">
                      <div className="bg-black p-1 rounded-full inline-flex items-center justify-center">
                        <Settings color="#308579" size={16} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xs font-extralight">Difficulty</h3>
                        <h2 className="text-xs">Medium</h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="bg-black   p-1 rounded-full">
                        <TimerIcon color="#308579" size={16} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xs font-extralight">Time Limit</h3>
                        <h2 className="text-xs">10mins</h2>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex md:flex-row items-center gap-6">
                    <Button
                      className="!px-8 cursor-pointer !py-2 tracking-wider"
                      //   disabled={loadingSave}
                      //   onClick={handleStartQuiz}
                    >
                      Start Quiz <ArrowRight size={32} />
                    </Button>
                    <div className="p-2 rounded-full outline-gray-400 outline lg:flex items-center hidden ">
                      <Share2Icon size={16} />
                    </div>
                    <div className="p-2 rounded-full outline-gray-400 outline lg:flex items-center hidden">
                      <Heart size={16} />
                    </div>

                    <Button
                      variant="outline"
                      className="bg-[#34363b] cursor-pointer tracking-wide font-medium pr-2"
                      //   onClick={handleSaveQuiz}
                      //   disabled={loadingSave}
                    >
                      <Download color="#308579" />
                      save
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

export default SingleLibraryPage;
