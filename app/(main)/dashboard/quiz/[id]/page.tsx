"use client";
import { QuizDetailContext } from "@/context/QuizDetailContext";
import { supabase } from "@/services/SupabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const StartQuiz = () => {
  const { id } = useParams();
  const { quizDetails, setQuizDetails } = React.useContext(QuizDetailContext);

  const GetQuiz = async () => {
    let { data: Quiz, error } = await supabase
      .from("Quiz")
      .select("*")

      // Filters
      .eq("Quiz_id", id);
    console.log("Quiz", Quiz);
    if (Quiz && Quiz.length > 0) {
      setQuizDetails(Quiz[0]);
    }
  };

  useEffect(() => {
    if (id) {
      GetQuiz();
    }
  }, [id]);

  return <div>StartQuiz</div>;
};

export default StartQuiz;
