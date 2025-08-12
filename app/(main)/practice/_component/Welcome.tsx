"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Welcome = () => {
  type FormDataType = {
    Subject: string;
    Topic?: string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    Subject: "",
    Topic: "",
  });
  const router = useRouter();

  const onHandleInputChange = (field: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    console.log("Data", formData);
  };

  return (
    <div className="  flex justify-between items-start gap-10   ">
      <div className="shadow-xl bg-gray-100 w-full px-10 py-10">
        <div className="flex  items-center flex-col gap-3">
          <div className="w-full flex justify-center items-center">
            <Image src={"/challe.png"} alt="challe" width={180} height={180} />
          </div>
          <h2 className="text-xl font-semibold text-green-950/90">
            Welcome to Clinical Challenges!
          </h2>
          <p className="text-sm text-green-950/70 text-center max-w-md">
            Test your knowledge with realistic cases, race against the clock,
            and get instant feedback to sharpen your skills
          </p>
        </div>
      </div>
      <div className="w-full px-8">
        <h2 className="text-md font-semibold  text-green-950/80 ">
          Choose your Specialty:
        </h2>
        <p className="text-sm text-gray-600">
          Set your preferred subject before starting.
        </p>
        <div className="w-full mt-4">
          <Select
            onValueChange={(value) => onHandleInputChange("Subject", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Anatomy">🧠 Anatomy</SelectItem>
              <SelectItem value="Physiology">🫀 Physiology</SelectItem>
              <SelectItem value="Biochemistry">🧪 Biochemistry</SelectItem>
              <SelectItem value="Pathology">🦠 Pathology</SelectItem>
              <SelectItem value="Pharmacology">💊 Pharmacology</SelectItem>
              <SelectItem value="Microbiology">🧫 Microbiology</SelectItem>
              <SelectItem value="Public Health">🌍 Public Health</SelectItem>
              <SelectItem value="Obstetrics and Gynaecology">
                👩‍🦰 Obstetrics and Gynaecology
              </SelectItem>
              <SelectItem value="pediatrics">👶 Pediatrics</SelectItem>

              <SelectItem value="Surgery">🔪 Surgery</SelectItem>
              <SelectItem value="Medicine">🩺 Medicine</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-4">
            <h2 className="font-semibold py-2 text-green-950/80">
              Topic (optional)
            </h2>
            <Input
              placeholder="Give us a topic you want to be tested on"
              className="placeholder:text-sm border border-gray-400"
              onChange={(e) => onHandleInputChange("Topic", e.target.value)}
            />
          </div>

          <Button
            className="w-full cursor-pointer mt-6"
            disabled={!formData.Subject}
          >
            Lets Go
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
