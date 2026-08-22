"use client"
import React, { useEffect, useState } from "react";
import { RoomDetailsHero } from "./room/Hero";
import { RoomContent } from "./room/roomcontent";
import { RoomType } from "@/lib/types";

export const HotelRoomDetails = ({ room }: { room: RoomType }) => {

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  })

  return (
    <div className="flex flex-col">
      <RoomDetailsHero isLoading={isLoading} room={room} />
      <RoomContent isLoading={isLoading} room={room} />
    </div>
  );
};
