"use client";
import { AllBusHero } from "@/components/buses/all/AllBusHero";
import { Experience } from "@/components/buses/all/experience";
import { Hubs } from "@/components/buses/all/Hubs";
import { busRoutes } from "@/lib/data";
import React, { useEffect, useState } from "react";

export interface OurFilter {
  destination: string;
  origin: string;
}

const AllBusesRouteBLock = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OurFilter>({
    destination: "",
    origin: "",
  });

  const updateFilters = (key: keyof OurFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const routes = busRoutes.filter((route) => {
    const matchesDestination =
      !filter.destination || route.destination === filter.destination;
    const matchesOrigin = !filter.origin || route.origin === filter.origin;

    return matchesDestination && matchesOrigin;
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <main className="flex flex-col gap-20">
      <AllBusHero updateFilter={updateFilters} filter={filter} />
      <Hubs isLoading={loading} routes={routes} />
      <Experience />
    </main>
  );
};

export default AllBusesRouteBLock;
