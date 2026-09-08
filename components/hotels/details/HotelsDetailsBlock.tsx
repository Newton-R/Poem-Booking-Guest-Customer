"use client";
import React, { useEffect, useState } from "react";
import { DetailsHero } from "./DetailsHero";
import { DetailsContent } from "./DetailsContent";
import { Hotel, RoomCategory } from "@/lib/types";
import {
  useGetHotelsAvailability,
  useGetHotelsDetail,
} from "@/lib/public/useGetHotels";
import { data } from "motion/react-client";

export const HotelsDetailsBlock = ({ id }: { id: string }) => {
  const { data: Hotel, isLoading } = useGetHotelsDetail(id);
  console.log({ details: Hotel });

  // console.log({ hotel: Hotel });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  // }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-20">
      <DetailsHero isLoading={isLoading} hotel={Hotel?.data} />
      <DetailsContent id={id} isLoading={isLoading} hotel={Hotel?.data} />
    </div>
  );
};
