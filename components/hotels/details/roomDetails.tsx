"use client";
import React, { useEffect, useState } from "react";
import { RoomDetailsHero } from "./room/Hero";
import { RoomContent } from "./room/roomcontent";
import { RoomType } from "@/lib/types";
import { useGetRoomDetails } from "@/lib/public/useGetHotels";

export const HotelRoomDetails = ({
  room,
  roomId,
  hotel,
}: {
  roomId: string;
  room: RoomType;
  hotel: string;
}) => {
  const [isLoading, setLoading] = useState(true);
  const { data } = useGetRoomDetails(hotel, roomId);
  console.log({ room: data });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  return (
    <div className="flex flex-col">
      <RoomDetailsHero isLoading={isLoading} room={room} />
      <RoomContent isLoading={isLoading} room={room} />
    </div>
  );
};
