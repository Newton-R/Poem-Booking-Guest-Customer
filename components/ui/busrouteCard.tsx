"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { usePathname, useRouter } from "next/navigation";

import { Agency, AgencyRoute } from "@/lib/types/agency";
import { useAgencies } from "@/lib/useAgency";
import { formatDuration } from "@/lib/utils";
import { City } from "@/lib/types/cities&amenities";

interface BusRouteCard {}

export const BusRouteCard = ({
  Busroute,
  cities,
  onClick,
}: {
  Busroute: AgencyRoute;
  onClick?: (id: AgencyRoute) => void;
  cities: City[];
}) => {
  const pathname = usePathname();
  const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL + Busroute.imageUrl;
  const originCity = cities.find((city) => city.id === Busroute.originCityId);
  const destinationCity = cities.find(
    (city) => city.id === Busroute.destinationCityId,
  );

  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick(Busroute);
        }
      }}
      className="flex flex-col gap-4 h-80"
    >
      <div className="flex-1 relative rounded-2xl overflow-hidden">
        <Image
          src={imgUrl}
          className="w-full h-full object-cover"
          width={300}
          height={300}
          alt="Img"
        />
        <span className="absolute top-4 left-4 p-1 px-2 bg-white/70 rounded-full text-xs">
          {formatDuration(Number(Busroute.estimatedDurationMinutes))}
        </span>
      </div>
      <div className=" flex flex-col justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-xl">
            {originCity?.name} to {destinationCity?.name}
          </span>
          {/* <p className="text-[14px] text-muted-foreground">
           
            {Busroute.frequency}
          </p> */}
        </div>
        <div className="flex flex-col">
          {/* <span className="text-xs decoration-1">
            {Busroute.formattedStartingPrice}
          </span> */}
          <span className="text-2xl font-bold text-primary">10 XAF</span>
        </div>
      </div>
    </div>
  );
};

export const AgencyCard = ({ agency }: { agency: Agency }) => {
  const imgUrl = String(process.env.NEXT_PUBLIC_IMAGE_URL) + agency.imageUrl;

  return (
    <div className="flex flex-col bg-bg-mute h-120 overflow-hidden rounded-2xl">
      <div className="overflow-hidden flex-1 relative">
        <img
          className="w-full h-full object-cover"
          width={200}
          height={200}
          src={imgUrl}
          alt="Image"
        />
      </div>
      <div className="p-6 flex flex-col">
        <div className="flex flex-col">
          <div>
            <span className="text-xl font-bold">{agency.name}</span>
            {/* <span className="text-muted-foreground text-xs flex items-center gap-1">
              {" "}
              <HugeiconsIcon icon={Clock} size={13} />{" "}
              {formatDuration(Number(busroute.estimatedDurationMinutes))} Travel
            </span> */}
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-muted-foreground">STARTING FROM</span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(agency.basePrice)}
            </span>
          </div>
        </div>
        <div className="flex mt-4 items-center gap-4">
          <Link className="w-full" href={`/buses/${agency.id}`}>
            <Button className={"rounded-md w-full p-5 px-8"}>Book Seat</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
