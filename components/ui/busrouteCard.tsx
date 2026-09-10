"use client";
import { Clock, Redo } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { BusRoute } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { usePathname } from "next/navigation";
import { TransportRoute } from "@/lib/types/transport";
import { formatDuration } from "@/lib/utils";

interface BusRouteCard {}

export const BusRouteCard = ({ Busroute }: { Busroute: BusRoute }) => {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/${Busroute.id}`}
      className="flex flex-col gap-4 h-80"
    >
      <div className="flex-1 relative rounded-2xl overflow-hidden">
        <Image
          src={Busroute.image}
          className="w-full h-full object-cover"
          width={300}
          height={300}
          alt="Img"
        />
        <span className="absolute top-4 left-4 p-1 px-2 bg-white/70 rounded-full text-xs">
          {Busroute.duration.hours}h {Busroute.duration.minutes}min
        </span>
      </div>
      <div className=" flex justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-xl">
            {Busroute.origin} to {Busroute.destination}
          </span>
          <p className="text-[14px] text-muted-foreground">
            {/* Daily departures every  mins */}
            {Busroute.frequency}
          </p>
        </div>
        <div className="flex flex-col">
          {/* <span className="text-xs decoration-1">
            {Busroute.formattedStartingPrice}
          </span> */}
          <span className="text-2xl font-bold text-primary">
            {Busroute.formattedStartingPrice}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const DetailedBusRouteCard = ({
  busroute,
}: {
  busroute: TransportRoute;
}) => {
  const imgUrl = String(process.env.NEXT_PUBLIC_IMAGE_URL) + busroute.imageUrl;
  return (
    <div className="flex flex-col bg-bg-mute h-120 overflow-hidden rounded-2xl">
      <div className="overflow-hidden flex-1 relative">
        <span className="p-1 px-2 rounded-full bg-white/80 text-primary font-bold absolute top-4 left-4 text-xs">
          From {busroute.originCity}
        </span>
        <Image
          className="w-full h-full object-cover"
          width={200}
          height={200}
          src={imgUrl}
          alt="Image"
        />
      </div>
      <div className="p-6 flex flex-col">
        <div className="flex justify-between">
          <div>
            <span className="text-xl font-bold">
              To {busroute.destinationCity}
            </span>
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              {" "}
              <HugeiconsIcon icon={Clock} size={13} />{" "}
              {formatDuration(Number(busroute.estimatedDurationMinutes))} Travel
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">STARTING FROM</span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(busroute.startingPrice)}
            </span>
          </div>
        </div>
        <div className="flex justify-between bg-background p-4 rounded-md items-center mt-3">
          <span className="text-xs flex items-center gap-2">
            <HugeiconsIcon icon={Redo} size={13} className="text-primary" />
            {/* {busroute.frequency} */}
          </span>
          <span className="text-[10px] text-primary bg-primary/20 rounded-xs p-1 px-2">
            HIGH FREQUENCY
          </span>
        </div>
        <div className="flex mt-4 items-center gap-4">
          <Link className="w-full" href={`/buses/${busroute.id}`}>
            <Button className={"rounded-md w-full p-5 px-8"}>Book Seat</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
