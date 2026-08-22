import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Location, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { RoomType } from "@/lib/types";
import { LoadingGridHero } from "@/components/loaders/hoteldetails/GridHero";

export const RoomDetailsHero = ({ room, isLoading }: { room: RoomType, isLoading: boolean }) => {
  if (isLoading) {
    return <LoadingGridHero className="container-x" />
  }
  return (
    <div className=" grid grid-rows-2 container-x hero border-none gap-2  grid-cols-4 relative">

      {room.images && room.images.map((image, index) => (
        <div
          key={index}
          className={cn("rounded-2xl overflow-hidden", index === 0
            ? "col-span-2 row-span-2"
            : index === 1
              ? "col-span-1 row-span-1"
              : index === 2
                ? "col-span-1 row-span-1"
                : index === 3
                  ? "col-span-2 row-span-1"
                  : "")}
        >
          <img
            src={image}
            alt={`room image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>

  );
};
