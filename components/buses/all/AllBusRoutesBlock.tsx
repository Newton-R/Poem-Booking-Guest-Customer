"use client";
import { AllBusHero } from "@/components/buses/all/AllBusHero";
import { Experience } from "@/components/buses/all/experience";
import { Hubs } from "@/components/buses/all/Hubs";
import { busRoutes } from "@/lib/data";
import { useGetTransportRoutes } from "@/lib/public/useGetBus";
import { TransportRoute } from "@/lib/types/transport";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

export interface OurFilter {
  destination: string;
  origin: string;
}

export const AllBusesRouteBLock = () => {
  const searchParams = useSearchParams();

  const urlFilters = {
    destination: searchParams.get("destination"),
    origin: searchParams.get("origin"),
    departure: searchParams.get("departure"),
  };
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OurFilter>({
    destination: urlFilters.destination ?? "",
    origin: urlFilters.origin ?? "",
  });

  const { data, isLoading } = useGetTransportRoutes();
  console.log({ transport: data?.data.data });

  const updateFilters = (key: keyof OurFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const routes = busRoutes.filter((route) => {
    const matchesDestination =
      !filter.destination || route.destination === filter.destination;
    const matchesOrigin = !filter.origin || route.origin === filter.origin;

    return matchesDestination && matchesOrigin;
  });

  return (
    <main className="flex flex-col gap-20">
      <AllBusHero updateFilter={updateFilters} filter={filter} />
      <Hubs
        isLoading={isLoading}
        routes={data?.data.data ?? ([] as TransportRoute[])}
      />
      <Experience />
    </main>
  );
};

export const BusBlockDone = () => {
  return (
    <Suspense>
      <AllBusesRouteBLock />
    </Suspense>
  );
};
