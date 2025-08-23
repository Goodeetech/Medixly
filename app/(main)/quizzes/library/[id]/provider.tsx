"use client";
import { LibraryQuizContext } from "@/context/LibraryQuizContext";
import React, { ReactNode, useState } from "react";

const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [libraryQuiz, setLibraryQuiz] = useState<any[]>([]);
  return (
    <LibraryQuizContext.Provider value={{ libraryQuiz, setLibraryQuiz }}>
      {children}
    </LibraryQuizContext.Provider>
  );
};

export default LibraryProvider;
