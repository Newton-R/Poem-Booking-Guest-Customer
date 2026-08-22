import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

export const LoadingGridHero = () => {
  return (
    <div className="hero grid grid-rows-2 gap-2  grid-cols-4 relative">
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className={cn(
            "rounded-2xl overflow-hidden",
            index === 0
              ? "col-span-2 row-span-2"
              : index === 1
                ? "col-span-1 row-span-1"
                : index === 2
                  ? "col-span-1 row-span-1"
                  : index === 3
                    ? "col-span-2 row-span-1"
                    : "",
          )}
        >
          <Skeleton className="min-h-full bg-bg-mute" />
        </div>
      ))}
    </div>
  );
};
