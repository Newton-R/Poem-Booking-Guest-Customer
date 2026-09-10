import { HotelRoomDetails } from "@/components/hotels/details/roomDetails";
import { hotels } from "@/lib/data";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AlertTriangle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { useGetRoomDetails } from "@/lib/public/useGetHotels";
import { RoomType } from "@/lib/types";

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ room: string; hotel: string }>;
}) {
  const { room, hotel } = await params;
  const currentHotel = hotels.find((h) => h.id === hotel);
  const currentRoom = currentHotel?.rooms.find((r) => r.id === room);

  return (
    <HotelRoomDetails
      hotel={hotel}
      roomId={room}
      room={currentRoom ?? ({} as RoomType)}
    />
  );
}
