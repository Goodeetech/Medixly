"use client";
import FormCard from "@/components/layers/FormCard";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateQuiz = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  return (
    <div className="py-8 px-6 bg-gray-100 mx-6 my-4 rounded-sm">
      <div className="flex flex-col gap-6 lg:px-30 px-8">
        <div className=" flex gap-6 items-center">
          <div onClick={() => router.back()} className="cursor-pointer">
            <ArrowLeft />
          </div>
          <h3 className="text-xl font-semibold">Create New Quiz</h3>
        </div>
        <Progress value={33.33} className="transition-all duration-500" />
        <FormCard />
      </div>
    </div>
  );
};

export default CreateQuiz;
