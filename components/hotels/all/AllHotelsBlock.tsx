"use client";
import React, { useEffect, useState } from "react";
import { AllHotelsHero } from "./Hero";
import { HotelFilters } from "./Hero";
import { HotelsGrid } from "./HotelsGrid";
import { hotels } from "@/lib/data";
import { Hotel } from "@/lib/types";

export const AllHotelsBlock = () => {
  const [Myhotels, setHotels] = useState<Hotel[]>(hotels);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="container-x flex flex-col gap-6">
      <AllHotelsHero
        onChange={(filters: HotelFilters) => {
          setHotels(
            hotels.filter((hotel) => {
              const matchesRegion =
                !filters.region || hotel.region === filters.region;
              const matchesCollection =
                !filters.collectionId ||
                hotel.collectionIds.includes(filters.collectionId);
              const matchesRating =
                !filters.rating || hotel.rating >= Number(filters.rating);
              const price = hotel.startingPrice;
              const matchesPrice =
                !filters.priceRange ||
                (filters.priceRange === "under-100000" && price < 100000) ||
                (filters.priceRange === "100000-150000" &&
                  price >= 100000 &&
                  price <= 150000) ||
                (filters.priceRange === "150000-250000" &&
                  price > 150000 &&
                  price <= 250000) ||
                (filters.priceRange === "over-250000" && price > 250000);

              return (
                matchesRegion &&
                matchesCollection &&
                matchesRating &&
                matchesPrice
              );
            }),
          );
        }}
      />
      <HotelsGrid isLoading={isLoading} hotels={Myhotels} />
    </div>
  );
};
