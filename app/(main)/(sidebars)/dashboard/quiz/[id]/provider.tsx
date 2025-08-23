"use client";
import { QuizDetailContext } from "@/context/QuizDetailContext";
import React, { ReactNode, useState } from "react";

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizDetails, setQuizDetails] = useState<any>();
  const [quizAll, setQuizAll] = useState<any>();
  return (
    <QuizDetailContext.Provider
      value={{ quizDetails, setQuizDetails, quizAll, setQuizAll }}
    >
      {children}
    </QuizDetailContext.Provider>
  );
};

export default QuizProvider;
