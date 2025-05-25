"use client";
import { QuizDetailContext } from "@/context/QuizDetailContext";
import React, { ReactNode, useState } from "react";

const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizDetails, setQuizDetails] = useState<any>();
  return (
    <QuizDetailContext.Provider value={{ quizDetails, setQuizDetails }}>
      {children}
    </QuizDetailContext.Provider>
  );
};

export default QuizProvider;
