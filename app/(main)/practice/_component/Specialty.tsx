import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const Specialty = () => {
  type FormDataType = {
    Subject: string;
  };
  const [formData, setFormData] = useState<FormDataType>({
    Subject: "",
  });
  const router = useRouter();

  const onHandleInputChange = (field: string, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    console.log("Data", formData);
  };
  return (
    <div className="w-full px-10 shadow-xl bg-gray-100 py-10">
      <h2 className="text-md font-semibold ">Choose your Specialty:</h2>
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
      </div>
    </div>
  );
};

export default Specialty;
