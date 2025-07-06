import { useEffect, useState } from "react";

const Timer = ({ time }: { time: number }) => {
  const TOTAL_TIME = time * 60;
  const RADIUS = 54;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const strokeDashoffset =
    CIRCUMFERENCE - (timeLeft / TOTAL_TIME) * CIRCUMFERENCE;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-2 py-2 justify-center items-center   w-full bg-white shadow-2xl">
      <svg width="140" height="140">
        <circle
          stroke="#e5e7eb"
          fill="none"
          cx="70"
          cy="70"
          r={RADIUS}
          strokeWidth="10"
        />
        <circle
          stroke="#2e877c"
          fill="none"
          cx="70"
          cy="70"
          r={RADIUS}
          strokeWidth="10"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="20"
          fill="#111827"
        >
          {displayTime}
        </text>
      </svg>
      <div>Time Remaining:</div>
    </div>
  );
};

export default Timer;
