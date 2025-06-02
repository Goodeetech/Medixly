"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QuizCategory } from "@/lib/QuizLibrary/QuizLib";

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

  return <div>SingleLibraryPage</div>;
};

export default SingleLibraryPage;
