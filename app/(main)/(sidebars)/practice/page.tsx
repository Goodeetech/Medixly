"use client";
import React, { useState } from "react";
import Welcome from "./_component/Welcome";
import Specialty from "./_component/Specialty";

const Practice = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="md:py-20 pt-8 px-10 ">
      <Welcome />
    </div>
  );
};

export default Practice;
