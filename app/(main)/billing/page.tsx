import { PricingTable } from "@clerk/nextjs";
import React from "react";

const Billing = () => {
  return (
    <div className="p-10">
      <div>
        <h2 className="text-center font-semibold text-3xl">Choose Your Plan</h2>
        <p className="text-center text-sm">
          Select a subscription bundle to get access to unlimited quiz
          experience
        </p>
      </div>
      <div className="pt-10">
        <PricingTable />
      </div>
    </div>
  );
};

export default Billing;
