import React from "react";
import { Input } from "../ui/input";
import { BookCheckIcon, Check, CheckCircle } from "lucide-react";

const FormCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg flex flex-col gap-4">
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
      <div>
        <div>
          <BookCheckIcon />
          <label></label>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
