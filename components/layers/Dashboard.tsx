import { Plus, PlusCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import QuizCard from "./QuizCard";
import Link from "next/link";

const Dashboard = () => {
  const project = [
    {
      title: "Total Quizzes",
      value: 24,
    },
    {
      title: "Ended Quizzes",
      value: 10,
    },
    {
      title: "Pending Quizzes",
      value: 24,
    },
  ];

  return (
    <div className="bg-gray-100 my-4 mx-6 py-6 px-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <h4 className="text-[#436964] text-sm mt-2">
            Track progress. Master topics. Stay sharp.
          </h4>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/create-quiz">
            <Button className=" bg-gradient-to-b from-[#4382BE] to-[#45B4A6] px-8 py-5 tracking-wide rounded-full cursor-pointer  flex items-center gap-x-2 hover:bg-[#366861] transition-all duration-400 ">
              <Plus size={32} />
              Create Quiz
            </Button>
          </Link>

          <Button
            variant="outline"
            className="border-[#45B4A6] hidden lg:block text-[#436964] hover:text-[#308579] transition-all duration-400 cursor-pointer"
          >
            Import Data
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 mt-4 gap-4">
        <QuizCard
          title="Total Quizzes"
          value={24}
          subtext="increased from last month"
        />
        <QuizCard
          title="Ended Quizzes"
          value={10}
          subtext="increased from last month"
        />
        <QuizCard title="Pending Quizzes" value={2} subtext="On Discuss" />
      </div>
    </div>
  );
};

export default Dashboard;
