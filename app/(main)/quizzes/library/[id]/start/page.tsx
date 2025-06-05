import { LibraryQuizContext } from "@/context/LibraryQuizContext";
import React, { useContext } from "react";

const StartQuiz = () => {
  const { libraryQuiz } = useContext(LibraryQuizContext);
  console.log(libraryQuiz);
  return <div>StartQuiz</div>;
};

export default StartQuiz;
