"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { QuizCategory } from "@/lib/QuizLibrary/QuizLib";

const SingleLibraryPage = () => {
  const { id } = useParams();
  console.log(id);
  const [singleQuiz, setSingleQuiz] = useState<any[]>([]);

  const getQuiz = () => {
    const filteredQuiz = QuizCategory.filter((item) => {
      return item.quizzes?.some((quiz) => quiz.id === id);
    });
    console.log(filteredQuiz);
    setSingleQuiz(filteredQuiz);
  };

  const CreateLibraryQuiz = async () => {
    try {
      const result = await axios.post("/api/quiz-library", singleQuiz);
    } catch (error) {}
  };
  return <div>SingleLibraryPage</div>;
};

export default SingleLibraryPage;
