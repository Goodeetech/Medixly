"use client";
import { useEffect, useState } from "react";
import { PricingTable } from "@clerk/nextjs";
import { Loader, Loader2Icon } from "lucide-react";

const Billing = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    setLoading(false);
  }, []);

  return (
    <div className="p-10">
      {!mounted ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2Icon className="animate-spin h-14 w-14 " />
        </div>
      ) : (
        <div>
          <div>
            <h2 className="text-center font-semibold text-3xl">
              Choose Your Plan
            </h2>
            <p className="text-center text-sm">
              Select a subscription bundle to get access to unlimited quiz
              experience
            </p>
          </div>
          <div className="pt-10">{mounted ? <PricingTable /> : null}</div>
        </div>
      )}
    </div>
  );
};

export default Billing;
