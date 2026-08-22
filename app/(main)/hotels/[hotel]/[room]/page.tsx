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


export default async function RoomDetailsPage({ params }: { params: Promise<{ room: string, hotel: string }> }) {
  const { room, hotel } = await params
  const currentHotel = hotels.find((h) => h.id === hotel)
  const currentRoom = currentHotel?.rooms.find((r) => r.id === room)

  if (!currentRoom) {
    return <div className="mt-[calc(var(--nav-height)+20px)]">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={AlertTriangle} size={40} />
          </EmptyMedia>
          <EmptyTitle>Hotel not found</EmptyTitle>
          <EmptyDescription>
            This hotel doesn't seem to exist please try refreshing the page or
            going back
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  }

  return <HotelRoomDetails room={currentRoom} />
}