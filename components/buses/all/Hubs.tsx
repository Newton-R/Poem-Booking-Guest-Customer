import { DetailedBusRouteCard } from "@/components/ui/busrouteCard";
import React from "react";

export const Hubs = () => {
  return (
    <section className="container-x">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <DetailedBusRouteCard key={i} />
        ))}
      </div>
    </section>
  );
};
