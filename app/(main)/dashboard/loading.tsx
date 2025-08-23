import { Loader2Icon } from "lucide-react";

// app/quizzes/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader2Icon size={18} color="green" />
    </div>
  );
}
