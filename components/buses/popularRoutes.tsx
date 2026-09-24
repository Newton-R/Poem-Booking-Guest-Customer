"use client";
import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";
import { AgencyCard, BusRouteCard } from "../ui/busrouteCard";
import Link from "next/link";
import { busRoutes } from "@/lib/data";
import { useGetAgencies } from "@/lib/public/useGetAgencies";
import { LoadingDetailedBus } from "../loaders/bus/LoadingDetailedBus";

export const PopularRoutesSection = () => {
  const { data, isError, isLoading } = useGetAgencies();
  return (
    <section className="flex container-x flex-col gap-6">
      <div className="w-full flex flex-col gap-2 md:flex-row items-end justify-between">
        <div>
          <h2>Popular Inter-City Routes</h2>
          <p className="text-muted-foreground">
            Connecting you to the heart of Cameroon with style.
          </p>
        </div>
        <Link href={"/buses/all"}>
          <Button variant={"link"}>
            View all routes <HugeiconsIcon icon={ArrowRight} />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading || !data
          ? Array.from({ length: 3 }).map((_, i) => (
              <LoadingDetailedBus key={i} />
            ))
          : data.data
              .slice(0, 4)
              .map((route, i) => <AgencyCard agency={route} key={i} />)}
      </div>
    </section>
  );
};
