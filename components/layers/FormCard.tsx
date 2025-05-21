import React from "react";
import { Input } from "../ui/input";
import {
  BookCheckIcon,
  Check,
  CheckCircle,
  DiffIcon,
  Settings,
  Settings2Icon,
  Sheet,
  Timer,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

const FormCard = () => {
  return (
    <div className="bg-white shadow-2xl text-gray-800 p-6 rounded-lg flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <CheckCircle size={20} color="#1b7e71" />
          <label className="text-md font-semibold">Quiz Title</label>
        </div>
        <Input
          placeholder="Give your quiz a name"
          className="placeholder:text-sm border border-gray-400"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <BookCheckIcon size={20} color="#1b7e71" />
          <label className="text-md font-semibold">
            What’s this quiz about? (Keep it brief but powerful)
          </label>
        </div>
        <Textarea
          placeholder="e.g. Test your speed on how drugs move through the body — absorption to elimination. Built for fast recall!"
          className="placeholder:text-sm  border border-gray-400 h-[100px]"
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-2  items-center">
          <Sheet size={20} color="#1b7e71" />
          <label className="text-md font-semibold">
            Choose the subject of this quiz
          </label>
        </div>

        <Select>
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
            <SelectItem value="Surgery">🔪 Surgery</SelectItem>
            <SelectItem value="Medicine">🩺 Medicine</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <Settings size={20} color="#1b7e71" />
          <label className="text-md font-semibold">Difficulty Level</label>
        </div>
        <Select>
          <SelectTrigger className=" w-full">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">🟢 Easy (Flashcard-style)</SelectItem>
            <SelectItem value="Moderate">
              🟡 Moderate (You’ll think a bit)
            </SelectItem>
            <SelectItem value="Hard">
              🔴 Hard (Sleep-deprived night shift level)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <Timer size={20} color="#1b7e71" />
          <label className="text-md font-semibold">Time Limit</label>
        </div>
        <Select>
          <SelectTrigger className=" w-full">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="No time limit">No time limit</SelectItem>
            <SelectItem value="10 minutes">10 minutes</SelectItem>
            <SelectItem value="20 minutes">20 minutes</SelectItem>
            <SelectItem value="30 minutes">30 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end ">
        <Button className="cursor-pointer">Generate Quiz</Button>
      </div>
    </div>
  );
};

export default FormCard;
