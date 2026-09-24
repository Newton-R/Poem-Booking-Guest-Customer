"use client";
import { AllBusHero } from "@/components/buses/all/AllBusHero";
import { Experience } from "@/components/buses/all/experience";
import { Hubs } from "@/components/buses/all/Hubs";
import { busRoutes } from "@/lib/data";
import { useGetAgencies } from "@/lib/public/useGetAgencies";
import { useGetTransportRoutes } from "@/lib/public/useGetBus";
import { Agency } from "@/lib/types/agency";
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

  const { data: agencies, isLoading } = useGetAgencies();
  console.log({ agencies: agencies });
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
        agencies={agencies?.data ?? ([] as Agency[])}
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
