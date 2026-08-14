import { Clock, Redo } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import Link from "next/link";

interface BusRouteCard {}

export const BusRouteCard = () => {
  return (
    <div className="flex flex-col gap-4 h-80">
      <div className="flex-1 relative rounded-2xl overflow-hidden">
        <Image
          src={"/default.png"}
          className="w-full h-full object-cover"
          width={300}
          height={300}
          alt="Img"
        />
        <span className="absolute top-4 left-4 p-1 px-2 bg-white/70 rounded-full text-xs">
          4h 30m
        </span>
      </div>
      <div className=" flex justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-xl">Douala to Yaounde</span>
          <p className="text-[14px] text-muted-foreground">
            Daily departures every 30 mins
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-xs decoration-1">8,000 XAF</span>
          <span className="text-2xl font-bold text-primary">7,000 XAF</span>
        </div>
      </div>
    </div>
  );
};

export const DetailedBusRouteCard = () => {
  return (
    <div className="flex flex-col bg-bg-mute h-120 overflow-hidden rounded-2xl">
      <div className="overflow-hidden flex-1 relative">
        <span className="p-1 px-2 rounded-full bg-white/70 text-black absolute top-4 left-4 text-xs">
          From Douala
        </span>
        <Image
          className="w-full h-full object-cover"
          width={200}
          height={200}
          src={"/default.png"}
          alt="Image"
        />
      </div>
      <div className="p-6 flex flex-col">
        <div className="flex justify-between">
          <div>
            <span className="text-xl font-bold">To Yaounde</span>
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              {" "}
              <HugeiconsIcon icon={Clock} size={13} /> 3h 45m Travel
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">STARTING FROM</span>
            <span className="text-xl font-bold text-primary">6,500 XAF</span>
          </div>
        </div>
        <div className="flex justify-between bg-background p-4 rounded-md items-center mt-3">
          <span className="text-xs flex items-center gap-2">
            <HugeiconsIcon icon={Redo} size={13} className="text-primary" />
            Every 30 Mins
          </span>
          <span className="text-[10px] text-primary bg-primary/20 rounded-xs p-1 px-2">
            HIGH FREQUENCY
          </span>
        </div>
        <div className="flex mt-4 items-center gap-4">
          <Link className="w-full" href={"/buses/route"}>
            <Button className={"rounded-md w-full p-5 px-8"}>Book Seat</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
