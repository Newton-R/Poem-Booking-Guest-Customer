import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";
import { BusRouteCard } from "../ui/busrouteCard";

export const PopularRoutesSection = () => {
  return (
    <section className="flex container-x flex-col gap-6">
      <div className="w-full flex items-end justify-between">
        <div>
          <h2>Popular Inter-City Routes</h2>
          <p className="text-muted-foreground">
            Connecting you to the heart of Cameroon with style.
          </p>
        </div>
        <Button variant={"link"}>
          View all routes <HugeiconsIcon icon={ArrowRight} />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <BusRouteCard key={i} />
        ))}
      </div>
    </section>
  );
};
