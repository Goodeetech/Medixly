"use client";
import React, { useEffect, useRef } from "react";
import axios from "axios";

interface QuizCartProps {
  formData: any; // Replace 'any' with the actual type if known, e.g., { question: string; answer: string }
}

const QuizCart: React.FC<QuizCartProps> = ({ formData }) => {
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (formData && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      GenerateQuiz();
    }
  }, []);

  const GenerateQuiz = async () => {
    const result = await axios.post("/api/ai-model", { ...formData });
    let content = result.data.content;

    const jsonMatch = content.match(/```json([\s\S]*?)```/);

    if (!jsonMatch || !jsonMatch[1]) {
      throw new Error("Could not extract JSON block from AI response");
    }

    try {
      const parsedQuestions = JSON.parse(jsonMatch[1].trim());
      console.log(parsedQuestions);
      // setQuestionList(parsedQuestions););
    } catch (error) {
      console.error("Failed to parse content", error);
      throw new Error("Invalid JSON format returned from AI");
    }
  };

  return (
    <div>
      <div></div>
    </div>
  );
};

export default QuizCart;
