import {
  ArrowBigLeft,
  ArrowLeft,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowUpRightFromCircle,
} from "lucide-react";
import React from "react";

const QuizCard = ({
  title,
  value,
  subtext,
}: {
  title: string;
  value: number;
  subtext: string;
}) => {
  return (
    <div>
      <div
        className={`py-4 rounded-lg px-2 shadow  bg-white ${
          title === "Total Quizzes" &&
          "bg-gradient-to-b from-[#4382BE] to-[#45B4A6] text-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[16px]">{title}</h2>
          <div className="p-1 rounded-full border border-gray-400">
            <ArrowUpRight />
          </div>
        </div>

        <h3 className="lg:text-4xl text-2xl mt-4">{value}</h3>
        <p className="text-[#436964] text-xs mt-2">{subtext}</p>
      </div>
    </div>
  );
};

export default QuizCard;
