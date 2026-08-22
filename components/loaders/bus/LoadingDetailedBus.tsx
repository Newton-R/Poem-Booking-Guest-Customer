import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const LoadingDetailedBus = () => {
  return (
    <div className="flex flex-col bg-white h-120 overflow-hidden rounded-2xl">
      <Skeleton className="overflow-hidden flex-1 relative"></Skeleton>
      <div className="p-6 flex flex-col">
        <Skeleton className="flex h-11 w-1/2 justify-between"></Skeleton>
        <Skeleton className="flex justify-between h-8 w-[80%] bg-background p-4 rounded-md items-center mt-3"></Skeleton>
        <Skeleton className="flex h-7 w-[30%] mt-4 items-center gap-4"></Skeleton>
      </div>
    </div>
  );
};
