import React from "react";
import { Skeleton } from "../ui/skeleton";

export const LoadingHotelCard = () => {
  return (
    <div className="border border-border rounded-xl flex overflow-hidden bg-white flex-col gap-4 p-4 h-90">
      <Skeleton className="w-full relative flex-1 overflow-hidden"></Skeleton>
      <div className="flex flex-col gap-4 ">
        <Skeleton className="w-[90%] h-6 rounded-full" />
        <Skeleton className="w-[60%] h-6 rounded-full" />
        <Skeleton className="w-[30%] h-6 rounded-full" />
      </div>
    </div>
  );
};
