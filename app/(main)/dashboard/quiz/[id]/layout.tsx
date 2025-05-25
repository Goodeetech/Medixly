import React, { ReactNode } from "react";
import QuizProvider from "./provider";

const layout = ({ children }: { children: ReactNode }) => {
  return <QuizProvider>{children}</QuizProvider>;
};

export default layout;
