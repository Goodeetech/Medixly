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
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services/SupabaseClient";
import { useUserDetails } from "@/app/(main)/provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface QuizCartProps {
  formData: any; // Replace 'any' with the actual type if known, e.g., { question: string; answer: string }
  step: number;
  GoToNext: () => void;
}

const QuizCart: React.FC<QuizCartProps> = ({ formData, step, GoToNext }) => {
  const [questionList, setQuestionList] = React.useState<any[]>([]); // Replace 'any' with the actual type if known
  const [loading, setLoading] = React.useState(false);
  const [loadingSave, setLoadingSave] = React.useState(false);
  const hasFetchedRef = useRef(false);
  const uuidRef = useRef<string>(uuidv4());
  const { userDetails } = useUserDetails();
  console.log("User", userDetails);
  const router = useRouter();

  useEffect(() => {
    if (formData && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      GenerateQuiz();
    }
  }, []);

  const GenerateQuiz = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", { ...formData });

      let content = result.data.content;

      // If the content is already a JSON string, parse it directly
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
    } catch (error) {
      console.error("Quiz generation failed:", error);
      alert("An error occurred while generating the quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (): Promise<boolean> => {
    try {
      setLoadingSave(true);

      const { data, error } = await supabase.from("Quiz").insert([
        {
          ...formData,
          questionList,
          userEmail: userDetails?.email,
          Quiz_id: uuidRef.current,
        },
      ]);

      if (error) {
        console.error("Error saving quiz:", error);
        alert("Something went wrong while saving your quiz. Please try again.");
        setLoading(false);
        return false;
      }

      toast("🎉 Quiz saved successfully!");
      return true;
    } catch (err) {
      console.error("Unexpected error:", err);
      toast("An unexpected error occurred while saving the quiz.");
      return false;
    } finally {
      setLoadingSave(false);
    }
  };

  const handleSaveQuiz = async () => {
    const success = await handleSave();
    if (success) GoToNext();
  };

  const handleStartQuiz = async () => {
    const success = await handleSave();
    if (success) {
      router.push(`/dashboard/quiz/${uuidRef.current}`);
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
                      <h2 className="text-xs">{userDetails?.name}</h2>
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
                    <Button
                      className="!px-8 cursor-pointer !py-2 tracking-wider"
                      disabled={loadingSave}
                      onClick={handleStartQuiz}
                    >
                      {loadingSave && <Loader2Icon className="animate-spin" />}
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
                      onClick={handleSaveQuiz}
                      disabled={loadingSave}
                    >
                      <Download color="#308579" />
                      {loadingSave && <Loader2Icon className="animate-spin" />}
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

export default QuizCart;
