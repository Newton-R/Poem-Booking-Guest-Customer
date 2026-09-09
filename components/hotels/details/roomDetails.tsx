"use client";
import React, { Suspense, useEffect, useState } from "react";
import { RoomDetailsHero } from "./room/Hero";
import { RoomContent } from "./room/roomcontent";
import { RoomType } from "@/lib/types";
import { useGetRoomDetails } from "@/lib/public/useGetHotels";
import { HotelRoomDetail } from "@/lib/types/hotels";

export const HotelRoomDetails = ({
  room,
  roomId,
  hotel,
}: {
  roomId: string;
  room: RoomType;
  hotel: string;
}) => {
  const { data, isLoading } = useGetRoomDetails(hotel, roomId);
  console.log({ room: data });

  return (
    <div className="flex flex-col">
      <RoomDetailsHero
        isLoading={isLoading}
        room={data?.data ?? ({} as HotelRoomDetail)}
      />
      <Suspense>
        <RoomContent
          isLoading={isLoading}
          room={data?.data ?? ({} as HotelRoomDetail)}
        />
      </Suspense>
    </div>
  );
};
