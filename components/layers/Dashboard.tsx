"use client";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  MicVocal,
  Plus,
  PlusCircle,
  PlusCircleIcon,
  PlusIcon,
  Timer,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import QuizCard from "./QuizCard";
import Link from "next/link";
import { Chart } from "./Chart";
import { ChartPie } from "./PieChart";
import { supabase } from "@/services/SupabaseClient";
import { QuizDetailContext } from "@/context/QuizDetailContext";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { QuizzesPerDay } from "@/lib/prompt/QuizPerDay/quizzes";
import Image from "next/image";
import QuizOfDay from "./QuizOfDay";

const Dashboard = () => {
  const [loading, setLoading] = React.useState(true);
  const [quiz, setQuiz] = useState<any[]>([]);

  const { user } = useUser();
  const [QuizzesDay, setQuizzesDay] = useState<any>();

  const hasFetched = useRef(false);

  const getDailyQuiz = () => {
    const day = new Date();
    const dayIndex = day.getDay();
    const todayQuiz = QuizzesPerDay[dayIndex];

    setQuizzesDay(todayQuiz);
    console.log("Quizzes", todayQuiz);
  };

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

  useEffect(() => {
    if (user) {
      if (hasFetched.current) return;
      hasFetched.current = true;
      GetQuiz();
      getDailyQuiz();
    }
  }, [user]);

  const GetQuiz = async () => {
    setLoading(true);
    try {
      const { data: Quiz, error } = await supabase
        .from("Quiz")
        .select("created_at, Quiz_id, QuizTitle")
        .eq("userEmail", user?.emailAddresses[0]?.emailAddress)
        .or("status.is.null,status.neq.completed")
        .order("created_at", { ascending: false }) // newest first
        .range(0, 2);

      if (error) {
        console.error("Error fetching quiz:", error);
        // clear on error
      } else {
        setQuiz(Quiz || []); // set to empty array if no data
      }
    } catch (error) {
      console.error("Unexpected error fetching quiz:", error);
      setQuiz([]); // clear on catch error too
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 my-4 mx-6 py-6 px-4 rounded-lg">
      <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <h4 className="text-[#436964] text-sm mt-2">
            Track progress. Master topics. Stay sharp.
          </h4>
        </div>
        <div className="flex items-center  gap-4">
          <Link href="/dashboard/create-quiz">
            <Button className="bg-gradient-to-b from-[#4382BE] to-[#45B4A6] px-8 py-5 tracking-wide rounded-full cursor-pointer flex items-center gap-x-2 transition-all duration-300 hover:from-[#366FA0] hover:to-[#379D91]">
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-4 gap-4">
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
      <div className="grid lg:grid-cols-3   grid-cols-1 mt-4">
        <QuizOfDay QuizzesDay={QuizzesDay} />
        <div className=" py-6 w-full">
          <ChartPie />
        </div>
        <div className="bg-white  rounded-lg shadow-lg p-6 font-semibold ">
          <div className="flex items-center  justify-between">
            <h2>Quiz</h2>
            <Link href="/dashboard/create-quiz">
              <Button
                variant="outline"
                className="flex gap-2 cursor-pointer px-4 rounded-full border-[#45B4A6] text-[#289f8f] hover:text-[#308579] transition-all duration-400"
              >
                <PlusIcon color="#289f8f" /> <h2>New</h2>
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <LoaderCircle
                color="#289f8f"
                className="animate-spin h-10 w-10"
              />
            </div>
          ) : (
            <div>
              {!quiz || quiz.length === 0 ? (
                <div className="flex flex-col gap-4 justify-center items-center h-[200px]">
                  <h2 className="text-sm flex justify-center items-center text-center">
                    No Pending Quiz.
                  </h2>
                  <Link
                    href="/dashboard/create-quiz"
                    className="text-[#289f8f] transition-all duration-300 ml-2 flex items-center gap-2 cursor-pointer outline outline-[#289f8f] rounded-full px-4 py-2 hover:bg-[#289f8f] hover:text-white "
                  >
                    <Plus />
                    <h2 className="text-[15px]"> Create Quiz</h2>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-1 flex-col gap-6 mt-4">
                    {quiz.map((quiz: any, index: number) => (
                      <Link
                        href={`/dashboard/quiz/${quiz?.Quiz_id}`}
                        key={index}
                        className="flex gap-2 items-center  p-2 hover:bg-[#44B0A8] hover:text-white hover:font-semibold bg-gray-0 rounded-lg transition-all duration-300 "
                      >
                        <div className="h-4 w-4 bg-[#44B0A8] rounded-full" />
                        <div>
                          <h3 className="text-sm font-medium">
                            {quiz?.QuizTitle}
                          </h3>
                          <p className="font-extralight text-xs">
                            Created:{" "}
                            {moment(quiz?.created_at).format("MMMM Do YYYY")}{" "}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
