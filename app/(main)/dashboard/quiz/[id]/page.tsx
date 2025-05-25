"use client";
import { Button } from "@/components/ui/button";
import { QuizDetailContext } from "@/context/QuizDetailContext";
import { supabase } from "@/services/SupabaseClient";
import { Divide, Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const StartQuiz = () => {
  const { id } = useParams();
  const { quizDetails, setQuizDetails } = React.useContext(QuizDetailContext);
  const [quizData, setQuizData] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);

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
        setQuizDetails(Quiz[0]);
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

  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader2Icon className="animate-spin text-gray-500 mx-auto mt-20 h-10 w-10" />
          <p className="text-center text-gray-600 mt-4">
            Loading quiz details...
          </p>
        </div>
      ) : (
        <div>
          <div className="max-w-3xl lg:mx-auto mx-10  mt-10 bg-gray-100 p-6 rounded-lg shadow-2xl">
            <h1 className="text-3xl font-bold text-center mb-2">
              {quizData?.QuizTitle}
            </h1>
            <p className="text-gray-600 text-center mb-6">
              {quizData?.QuizDescription}
            </p>

            <div className="grid grid-cols-2 gap-6 text-gray-800 mb-6">
              <div>
                <h3 className="font-semibold">🧠 Difficulty</h3>
                <p>{quizData?.DifficultyLevel}</p>
              </div>
              <div>
                <h3 className="font-semibold">⏱️ Time Limit</h3>
                <p>{quizData?.TimeLimit || "Unlimited"}</p>
              </div>
              <div>
                <h3 className="font-semibold">📋 Number of Questions</h3>
                <p>{quizData?.questionList?.length}</p>
              </div>
              <div>
                <h3 className="font-semibold">✅ Format</h3>
                <p>Multiple Choice</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-yellow-800">
                Instructions
              </h2>
              <ul className="list-disc list-inside text-sm mt-2 text-yellow-900">
                <li>Answer all questions to the best of your ability</li>
                <li>Do not refresh or close the tab while taking the quiz</li>
                <li>Click “Submit” at the end to see your score</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="mb-4 text-md font-medium text-gray-700">
                Ready to challenge yourself? 🎯
              </p>
              <Button className="bg-[#308579] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#246c60] transition">
                Start Quiz
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartQuiz;
