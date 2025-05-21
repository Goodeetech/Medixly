"use client";
import FormCard from "@/components/layers/FormCard";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import QuizCard from "./_component/QuizCart";

const CreateQuiz = () => {
  type FormDataType = {
    QuizTitle: string;
    QuizDescription: string;
    Subject: string;
    DifficultyLevel: string;
    TimeLimit: string;
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataType>({
    QuizTitle: "",
    QuizDescription: "",
    Subject: "",
    DifficultyLevel: "",
    TimeLimit: "",
  });
  const router = useRouter();

  const onHandleInputChange = (field: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    console.log("Data", formData);
  };

  const GoToNext = () => {
    const allRequiredField: (keyof FormDataType)[] = [
      "QuizTitle",
      "QuizDescription",
      "DifficultyLevel",
      "Subject",
      "TimeLimit",
    ];

    const filledFields = allRequiredField.every(
      (field) =>
        formData[field] &&
        typeof formData[field] === "string" &&
        formData[field].trim() !== ""
    );

    if (!filledFields) {
      toast.error("Please fill all the fields before proceeding.");
      return;
    } else {
      setStep(step + 1);
      console.log("Data", formData);
    }
  };

  return (
    <div className="py-8 lg:px-6 px-2 bg-gray-100 lg:mx-6 mx-2  my-4 rounded-sm">
      <div className="flex flex-col gap-6 lg:px-30 px-4">
        <div className=" flex gap-6 items-center">
          <div onClick={() => router.back()} className="cursor-pointer">
            <ArrowLeft />
          </div>
          <h3 className="text-xl font-semibold">
            {step == 1 ? "Create New Quiz" : "Preview Quiz"}
          </h3>
        </div>
        <Progress
          value={33.33 * step}
          className="transition-all duration-500"
        />
        {step == 1 ? (
          <FormCard
            onHandleInputChange={onHandleInputChange}
            GoToNext={GoToNext}
          />
        ) : (
          <QuizCard formData={formData} />
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
