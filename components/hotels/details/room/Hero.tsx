import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Location, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { RoomType } from "@/lib/types";

export const RoomDetailsHero = ({ room }: { room: RoomType }) => {
  // const hotelImages = [
  //   {
  //     img: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     className: "col-span-2 row-span-2",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     className: "col-span-1 row-span-1",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     className: "col-span-1 row-span-1",
  //   },
  //   {
  //     img: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     className: "col-span-2 row-span-1",
  //   },
  // ];
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
