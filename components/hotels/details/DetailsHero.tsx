import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Hotel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, Location, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const DetailsHero = ({ hotel }: { hotel: Hotel }) => {
  return (
    <div className="hero grid grid-rows-2 gap-2 bg-secondary-foreground grid-cols-4 relative">
      <div className="absolute top-0 left-0 w-full h-full  flex items-end p-6 bg-black/60 z-10">
        <div className="container-x flex flex-col gap-2 justify-end">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <div>
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HugeiconsIcon
                      icon={Star}
                      key={i}
                      size={18}
                      className={cn(
                        "text-yellow-400  text-[14px]",
                        i < hotel.rating ? "fill-yellow-400" : "",
                      )}
                    />
                  ))}
                </span>
              </div>
              <span className="text-4xl font-bold text-white">
                {hotel.name}
              </span>
              <span className="flex items-center gap-2 text-white">
                <HugeiconsIcon icon={Location} size={18} />
                <span>
                  {hotel.city}, {hotel.region}
                </span>
              </span>
            </div>
            {/* <div className="flex gap-2 text-white ">
              <Button className={"p-4 px-5 rounded-full"}>
                View all Photos
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      {hotel.images.map((image, index) => (
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
          <img
            src={image}
            alt={`Hotel ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
