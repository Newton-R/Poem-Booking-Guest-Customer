import { LoadingHotelCard } from "@/components/loaders/LoadingHotelCard";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HotelCard, HotelInfoPlus } from "@/components/ui/hotelcard";
import { Hotel } from "@/lib/types";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const HotelsGrid = ({
  hotels,
  isLoading,
}: {
  isLoading: boolean;
  hotels: Hotel[];
}) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      {isLoading ? (
        <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <LoadingHotelCard key={i} />
          ))}
        </div>
      ) : hotels.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 w-full md:grid-cols-2 lg:grid-cols-4">
            {hotels.map((hotel, i) => (
              <HotelInfoPlus hotel={hotel} key={i} />
            ))}
          </div>
          {/* <div className="w-fit flex mt-4 gap-2">
            <Button
              size={"icon-lg"}
              className={
                "bg-secondary-foreground hover:bg-secondary-foreground/90"
              }
            >
              <HugeiconsIcon icon={ArrowLeft} size={20} />
            </Button>
            {Array.from({ length: 4 }).map((_, i) => (
              <Button size={"icon-lg"} variant={"outline"}>
                {i + 1}
              </Button>
            ))}
            <Button
              size={"icon-lg"}
              className={
                "bg-secondary-foreground hover:bg-secondary-foreground/90"
              }
            >
              <HugeiconsIcon icon={ArrowRight} size={20} />
            </Button>
          </div> */}
        </>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={AlertTriangle} size={40} />
            </EmptyMedia>
            <EmptyTitle>No Hotels of this Category</EmptyTitle>
            <EmptyDescription>
              There are not hotels available yet for the applied filters. Try
              finding something else.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
};
