"use client";
import { Button } from "@/components/ui/button";
import { QuizDetailContext } from "@/context/QuizDetailContext";
import { supabase } from "@/services/SupabaseClient";
import { Divide, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const StartQuiz = () => {
  const { id } = useParams();
  const { quizDetails, setQuizDetails } = React.useContext(QuizDetailContext);
  const [quizData, setQuizData] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const GetQuiz = async () => {
    try {
      setLoading(true);
      let { data: Quiz, error } = await supabase
        .from("Quiz")
        .select("*")

        // Filters
        .eq("Quiz_id", id);

      if (Quiz && Quiz.length > 0) {
        setQuizData(Quiz[0]);

        setLoading(false);
      }

      if (!Quiz || Quiz.length === 0) {
        toast("No quiz found with the given ID");
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      toast.error("An error occurred while fetching the quiz");
    } finally {
      setLoading(false);
    }
  };
  console.log("Quiz Details", quizDetails);

  useEffect(() => {
    if (id) {
      GetQuiz();
    }
  }, [id]);

  const getQuizQuestions = async () => {
    try {
      let { data: Quiz, error } = await supabase
        .from("Quiz")
        .select("questionList")

        // Filters
        .eq("Quiz_id", id);
      if (Quiz && Quiz.length > 0) {
        setQuizDetails(Quiz[0]);
        console.log(quizDetails);
        router.push(`/dashboard/quiz/${id}/start`);
      }
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      toast.error("An error occurred while fetching quiz questions");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr py-10 px-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader2Icon className="animate-spin text-primary h-12 w-12" />
          <p className="text-center text-primary mt-4 text-base font-medium">
            Loading quiz details...
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-6 transition-all duration-300">
          <h1 className="text-2xl font-bold text-[#0c534a]  text-center mb-4">
            {quizData?.QuizTitle}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 text-gray-700 mb-6 text-center">
            <div className=" rounded-xl py-2 px-3 shadow-md">
              <h3 className="text-sm text-[#2e877c] font-semibold">
                🧠 Difficulty
              </h3>
              <p className="text-sm mt-1">{quizData?.DifficultyLevel}</p>
            </div>
            <div className=" rounded-xl py-4 px-3 shadow-md">
              <h3 className="text-sm text-[#2e877c] font-semibold">
                ⏱️ Time Limit
              </h3>
              <p className="text-sm mt-1">
                {quizData?.TimeLimit || "Unlimited"}
              </p>
            </div>
            <div className=" rounded-xl py-4 px-3 shadow-md">
              <h3 className="text-sm text-[#2e877c]     font-semibold">
                📋 Questions
              </h3>
              <p className="text-sm mt-1">{quizData?.questionList?.length}</p>
            </div>
            <div className=" rounded-xl py-4 px-3 shadow-md">
              <h3 className="text-sm text-[#2e877c]  font-semibold">
                ✅ Format
              </h3>
              <p className="text-sm mt-1">Multiple Choice</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-xl mb-6">
            <h2 className="text-lg font-bold text-yellow-800 mb-2">
              📘 Instructions
            </h2>
            <ul className="list-disc list-inside text-[12px] text-yellow-900 space-y-1">
              <li>Answer all questions to the best of your ability.</li>
              <li>Do not refresh or close the tab during the quiz.</li>
              <li>Click “Submit” at the end to get your score.</li>
            </ul>
          </div>

          <div className="text-center mt-6">
            <p className="mb-4 text-lg font-semibold text-gray-800">
              Ready to challenge yourself? 🎯
            </p>

            <Button
              className="bg-[#45B4A6] hover:bg-[#214f49]  text-white px-6 cursor-pointer py-2 text-md rounded-xl shadow-lg transition-all duration-200"
              onClick={getQuizQuestions}
            >
              Start Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
