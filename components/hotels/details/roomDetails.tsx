import React from "react";
import { RoomDetailsHero } from "./room/Hero";
import { RoomContent } from "./room/roomcontent";

export const HotelRoomDetails = () => {
  return (
    <div className="flex flex-col">
      <RoomDetailsHero />
      <RoomContent />
    </div>
  );
};
