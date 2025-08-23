import { Button } from "@/components/ui/button";
import { Settings, Subscript, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SaveQuiz = ({ formData }: { formData: any }) => {
  return (
    <div className="mt-4 flex mx-16 flex-col items-center justify-center gap-4 p-2 shadow-md bg-white rounded-lg">
      <div className="text-center">
        <Image
          src={"/check.png"}
          alt="success"
          width={50}
          height={50}
          className="mx-auto"
        />

        <div className="flex flex-col items-center justify-center gap-2 text-center mt-6">
          <div>
            <Image src={"/webbi.png"} alt="hello" height={400} width={400} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700">
            Your Quiz Kingdom Awaits
          </h3>
          <h4 className="text-xs text-gray-600">
            Every quiz you’ve created is a portal to knowledge, challenge, and
            mastery. Dive back in, refine your craft, or spark minds around the
            world.
          </h4>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="bg-black p-1 rounded-full inline-flex items-center justify-center">
              <Settings color="#308579" size={16} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-extralight">Difficulty</h3>
              <h2 className="text-xs">{formData?.DifficultyLevel}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="bg-black   p-1 rounded-full">
              <TimerIcon color="#308579" size={16} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-extralight">Time Limit</h3>
              <h2 className="text-xs">{formData?.TimeLimit}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="bg-black   p-1 rounded-full">
              <Subscript color="#308579" size={16} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs font-extralight">Subject</h3>
              <h2 className="text-xs">{formData?.Subject}</h2>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 px-8">
          <Link href={"/dashboard"}>
            <Button className="w-full">Go To Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SaveQuiz;
