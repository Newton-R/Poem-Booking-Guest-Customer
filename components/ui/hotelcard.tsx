import { ChevronRight, Location, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { Hotel } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import Link from "next/link";

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
            <span className="text-2xl font-bold">80,000 XAF</span>
          </span>
          <HugeiconsIcon icon={ChevronRight} size={18} />
        </div>
      </div>
    </div>
  );
};

export const HotelInfoPlus = ({ hotel }: { hotel: Hotel }) => {
  return (
    <div className="border border-border rounded-xl flex overflow-hidden bg-white flex-col h-90">
      <div className="w-full relative flex-1 overflow-hidden">
        <Image
          alt="demo Image"
          src={hotel.image}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
        <span className="text-primary absolute top-2 right-2 text-[12px] p-1 px-2 rounded-full bg-white/90 text-xs flex items-center gap-1">
          <HugeiconsIcon
            icon={Star}
            size={10}
            className="fill-primary text-primary"
          />
          {hotel.rating}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-4 ">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold">{hotel.name}</span>
          <span className="text-xs flex gap-0.5 text-muted-foreground">
            <HugeiconsIcon icon={Location} size={16} />
            {hotel.city}, {hotel.region}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[10px] text-muted-foreground">
            STARTING FROM
          </span>
          <span className="text-xs flex items-end gap-0.5 text-muted-foreground">
            <span className="text-2xl font-bold text-black">
              {hotel.formattedStartingPrice ??
                formatPrice(hotel.startingPrice, hotel.currency)}
            </span>
            / night
          </span>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <Link href={`/hotels/${hotel.id}`} className="flex-1">
            <Button className={"p-4 w-full"} variant={"outline"}>
              Details
            </Button>
          </Link>
          <Link href={`/hotels/${hotel.id}`} className="flex-1">
            <Button className={"p-4 w-full"}>Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
