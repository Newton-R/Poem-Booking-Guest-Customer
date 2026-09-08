import { ChevronRight, Location, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
// import { Hotel } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import Link from "next/link";
import { Hotel } from "@/lib/types/hotels";

export const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const image = hotel.images.find((i) => i.isPrimary);
  const url = String(process.env.NEXT_PUBLIC_IMAGE_URL) + image?.imageUrl;
  return (
    <Link
      href={`/hotels/${hotel.id}`}
      className="border border-border rounded-xl flex overflow-hidden bg-white flex-col h-90"
    >
      <div className="w-full relative flex-1 overflow-hidden">
        <Image
          alt="demo Image"
          src={url ?? ""}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 text-[12px] p-1 px-2 rounded-full bg-white/90 text-black">
          {hotel.address}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 ">
        <div className="flex flex-col gap-2 pb-2 border-b border-border">
          <span className="flex w-full justify-between items-center">
            <span className="font-bold">{hotel.name}</span>
            <span className="text-primary text-xs flex items-center gap-1">
              <HugeiconsIcon
                icon={Star}
                size={10}
                className="fill-primary text-primary"
              />
              {Number(hotel.starRating).toFixed(1)}
            </span>
          </span>
          <p className="text-[14px] line-clamp-1">{hotel.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex flex-col gap-1">
            <span className="text-xs">Starts at</span>
            <span className="text-2xl font-bold">
              {formatPrice(hotel.minPrice)}
            </span>
          </span>
          <HugeiconsIcon icon={ChevronRight} size={18} />
        </div>
      </div>
    </Link>
  );
};

export const HotelInfoPlus = ({ hotel }: { hotel: Hotel }) => {
  const image = hotel.images.find((i) => i.isPrimary);
  const url =
    String(process.env.NEXT_PUBLIC_IMAGE_URL) + (image?.imageUrl ?? "");
  return (
    <div className="border border-border rounded-xl flex overflow-hidden bg-white flex-col h-90">
      <div className="w-full relative flex-1 overflow-hidden">
        <Image
          alt="demo Image"
          src={url ?? ""}
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
          {hotel.starRating.toFixed(1)}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-4 ">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold">{hotel.name}</span>
          <span className="text-xs flex gap-0.5 text-muted-foreground">
            <HugeiconsIcon icon={Location} size={16} />
            {hotel.address}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[10px] text-muted-foreground">
            STARTING FROM
          </span>
          <span className="text-xs flex items-end gap-0.5 text-muted-foreground">
            <span className="text-2xl font-bold text-black">
              {formatPrice(hotel.minPrice)}
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
