import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { LoadingRoomAccommodationCard } from "./LoadingRoomCard";

export const LoadingHotelDetailsContent = () => {
  return (
    <div className="container-x mb-20 flex gap-8">
      <div className="flex flex-col gap-20 flex-1">
        <div className="flex flex-col gap-4 text-[14px]">
          <h3 className="text-2xl font-bold border-b border-border pb-2">
            Hotel Details
          </h3>
          <div className="flex flex-col gap-3">
            <Skeleton className="w-[80%] h-6" />
            <Skeleton className="w-[40%] h-6" />
            <Skeleton className="w-[20%] h-6" />
          </div>
          {/* <p>
            The hotel seamlessly blends corporate efficiency with 'Curated
            Comfort,' offering panoramic views of the city's lush hills. Its
            architectural grandeur and meticulously designed interiors reflect a
            commitment to luxury that has defined the Yaoundé skyline for
            decades.
          </p> */}
        </div>

        {/* Amenities section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold pb-2">Amenities </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 4].map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 items-center text-center p-4 border border-border rounded-lg"
              >
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="font-semibold h-18 w-[80%]"></Skeleton>
              </div>
            ))}
          </div>
        </div>

        {/* Accomodation section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold pb-2">Accommodation</h3>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingRoomAccommodationCard key={i} />
            ))}
          </div>
        </div>

        {/* Guest Experience */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between pb-3 border-b border-border items-end">
            <h2 className="text-2xl font-bold pb-2">Guest Experiences</h2>
            <Skeleton className="flex gap-2 items-end w-30 h-12"></Skeleton>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 3].map((_, i) => (
              <div
                key={i}
                className="p-4 bg-white flex flex-col gap-6 border-border rounded-md"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="w-30 h-4 rounded-full" />
                      <Skeleton className="w-20 h-4 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Skeleton className="w-[90%] h-6 rounded-full" />
                  <Skeleton className="w-[60%] h-6 rounded-full" />
                  <Skeleton className="w-[30%] h-6 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-90 gap-4">
        <div className="flex flex-col border border-secondary-foreground rounded-2xl overflow-hidden">
          <div className="p-6 bg-secondary-foreground text-white flex justify-between">
            <Skeleton className="h-8 w-30" />
            <Skeleton className="h-8 w-20" />
          </div>

          {/* filter forms */}

          <div className="p-4">
            <Skeleton className="flex h-70 flex-col gap-4 p-6"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};
