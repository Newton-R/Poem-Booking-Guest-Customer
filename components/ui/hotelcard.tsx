import { ChevronRight, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";

export const HotelCard = () => {
  return (
    <div className="border border-border rounded-xl flex overflow-hidden bg-white flex-col h-90">
      <div className="w-full relative flex-1 overflow-hidden">
        <Image
          alt="demo Image"
          src={"/default.png"}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 text-[12px] p-1 px-2 rounded-full bg-white/90 text-black">
          DOUALA
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 ">
        <div className="flex flex-col gap-2 pb-2 border-b border-border">
          <span className="flex w-full justify-between items-center">
            <span className="font-bold">Blue Pearl</span>
            <span className="text-primary text-xs flex items-center gap-1">
              <HugeiconsIcon
                icon={Star}
                size={10}
                className="fill-primary text-primary"
              />
              4.9
            </span>
          </span>
          <p className="text-[14px]">Small description about the hotels</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex flex-col gap-1">
            <span className="text-xs">Starts at</span>
            <span className="text-2xl font-bold">80,000XAF</span>
          </span>
          <HugeiconsIcon icon={ChevronRight} size={18} />
        </div>
      </div>
    </div>
  );
};
