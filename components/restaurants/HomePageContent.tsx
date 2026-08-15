"use client";
import {
  ArrowRight,
  Clock,
  DotFreeIcons,
  Location,
  Star,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RestaurantMainCard = () => {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/4`}
      className="rounded-2xl shadow-md overflow-hidden h-80 flex flex-col bg-white"
    >
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 flex flex-col p-4">
          <div className="flex justify-between w-full items-center">
            <span className="p-1 px-2 flex items-center bg-white/80 rounded-full gap-1 ">
              {/* <HugeiconsIcon
                icon={DotFreeIcons}
                size={20}
                className="fill-green-500 text-green-500"
              /> */}
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs">Open</span>
            </span>
            <span className="p-1 px-2 flex items-center bg-white/80 rounded-full gap-1 ">
              <HugeiconsIcon
                icon={Star}
                size={12}
                className="fill-yellow-500 text-yellow-500"
              />
              <span className="text-xs">4.5</span>
            </span>
          </div>
          <div className="mt-auto flex text-white gap-2">
            <div className="w-8 h-8 rounded-md font-bold text-center flex items-center justify-center bg-secondary-foreground border-2 border-white">
              N
            </div>
            <div className="text-[10px] flex flex-col">
              <span className="font-bold text-[11px]">Saveurs du Mboa</span>
              <span>Atlantic Catch & Spiced Poisson Braisé • Kribi</span>
            </div>
          </div>
        </div>
        <Image
          src={"/restau.jpg"}
          className="w-full h-full object-cover"
          width={500}
          height={500}
          alt="image"
        />
      </div>
      <div className="p-4 flex flex-col gap-6">
        <div className="flex gap-3 items-center">
          <span className="text-[10px] bg-blue-50 rounded-full p-1 px-2">
            CENTER
          </span>
          <span className="text-[10px] bg-blue-50 rounded-full p-1 px-2">
            Local
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span className="text-muted-foreground items-center flex gap-1 text-[10px]">
              <HugeiconsIcon icon={Clock} className="text-primary" size={12} />
              <span>20 - 35min</span>
            </span>
            <span className="text-muted-foreground items-center flex gap-1 text-[10px]">
              <HugeiconsIcon icon={Clock} className="text-primary" size={12} />
              <span>20 - 35min</span>
            </span>
          </div>
          <Button variant={"link"}>
            <HugeiconsIcon
              icon={ArrowRight}
              size={25}
              className="text-muted-foreground"
            />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export const RestaurantHomePageContent = () => {
  return (
    <section className="container-x flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <HugeiconsIcon icon={Location} className="text-primary" size={20} />
          <span>Regional specialties found near Your location</span>
        </div>
        <div>
          <span className="text-muted-foreground">Sort by:</span>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <RestaurantMainCard key={i} />
        ))}
      </div>
    </section>
  );
};
