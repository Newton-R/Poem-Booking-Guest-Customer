"use client";
import React, { Suspense, useEffect, useState } from "react";
import { RoomDetailsHero } from "./room/Hero";
import { RoomContent } from "./room/roomcontent";
import { RoomType } from "@/lib/types";
import { useGetRoomDetails } from "@/lib/public/useGetHotels";
import { HotelRoomDetail } from "@/lib/types/hotels";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AlertTriangle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const HotelRoomDetails = ({
  room,
  roomId,
  hotel,
}: {
  roomId: string;
  room: RoomType;
  hotel: string;
}) => {
  const { data, isLoading, isError } = useGetRoomDetails(hotel, roomId);

  if (!isError) {
    return (
      <div className="mt-[calc(var(--nav-height)+20px)]">
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
    );
  }

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
