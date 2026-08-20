import { Button } from "@/components/ui/button";
import { HotelCard, HotelInfoPlus } from "@/components/ui/hotelcard";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const HotelsGrid = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="grid grid-cols-1 gap-6 w-full md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <HotelInfoPlus key={i} />
        ))}
      </div>
      <div className="w-fit flex mt-4 gap-2">
        <Button
          size={"icon-lg"}
          className={"bg-secondary-foreground hover:bg-secondary-foreground/90"}
        >
          <HugeiconsIcon icon={ArrowLeft} size={20} />
        </Button>
        {Array.from({ length: 4 }).map((_, i) => (
          <Button size={"icon-lg"} variant={"outline"}>
            {i + 1}
          </Button>
        ))}
        <Button
          size={"icon-lg"}
          className={"bg-secondary-foreground hover:bg-secondary-foreground/90"}
        >
          <HugeiconsIcon icon={ArrowRight} size={20} />
        </Button>
      </div>
    </div>
  );
};
