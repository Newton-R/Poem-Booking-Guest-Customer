import React from "react";
import { RoomDetailsHero } from "./room/Hero";
import { RoomContent } from "./room/roomcontent";
import { RoomType } from "@/lib/types";

export const HotelRoomDetails = ({ room }: { room: RoomType }) => {
  return (
    <div className="flex flex-col">
      <RoomDetailsHero room={room} />
      <RoomContent room={room} />
    </div>
  );
};
