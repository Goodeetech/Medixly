import { MicVocal, Timer } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { LibraryQuizContext } from "@/context/LibraryQuizContext";
import { useRouter } from "next/navigation";
import moment from "moment";

const QuizOfDay = ({ QuizzesDay }: { QuizzesDay: any }) => {
  console.log("QuizzesDay", QuizzesDay?.id);
  const router = useRouter();

  const GoToQuiz = (id: string) => {
    router.push(`/quizzes/library/${id}`);
  };

  return (
    <div>
      <div className="mt-7 mb-2 flex w-fit  gap-4 max-h-[260px]  py-4 px-4 bg-white rounded-lg ">
        <div className="mt-6">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg uppercase  bg-gradient-to-b from-[#4382BE] to-[#45B4A6] text-transparent bg-clip-text">
              Quiz of the day
            </h2>
            <h2 className="h-4 w-4 rounded-full  bg-gradient-to-b from-[#4382BE] to-[#45B4A6] py-2"></h2>
          </div>
          <p className="mt-2 uppercase text-sm font-bold  text-green-950">
            Topic: {QuizzesDay?.title}
          </p>
          <p className="text-xs max-w-md text-green-800">
            {QuizzesDay?.description}
          </p>
          <div className="mt-4 flex items-center justify-between  ">
            <div className="text-xs flex items-center gap-1 ">
              <Timer size={14} />
              {moment().format("MMMM Do YYYY")}
            </div>
            <div className="text-xs mr-4 flex items-center gap-1">
              <MicVocal size={14} />
              <h2>{QuizzesDay?.subject}</h2>
            </div>
          </div>
          <div className="mt-8 mx-4 ">
            <Button
              className="w-full cursor-pointer"
              onClick={() => GoToQuiz(QuizzesDay?.id)}
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOfDay;
