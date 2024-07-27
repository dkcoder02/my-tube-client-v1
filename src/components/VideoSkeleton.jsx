import { Skeleton } from "@/components/ui/skeleton";
import { useId } from "react";

export default function VideoSkeleton() {
  const id = useId();
  return (
    <div className="flex flex-col space-y-3" key={id}>
      <Skeleton className="h-[200px] w-[330px] sm:h-[150px] sm:w-[330px] rounded-xl bg-slate-300" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-9 w-9 rounded-full bg-slate-300" />
        <div className="space-y-2 ">
          <Skeleton className="h-4 w-[200px] sm:w-[200px] bg-slate-300" />
          <Skeleton className="h-4 w-[200px] sm:w-[200px] bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
