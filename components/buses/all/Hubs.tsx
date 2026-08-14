import { DetailedBusRouteCard } from "@/components/ui/busrouteCard";
import React from "react";

export const Hubs = () => {
  return (
    <section className="container-x fkex flex-col gap-6">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-xl">Littoral Hub</h2>
        <div className="flex-1 border-b border-primary bg-primary" />
        <span className="text-xs text-primary ">3 Active Routes</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <DetailedBusRouteCard key={i} />
        ))}
      </div>
      <div></div>
    </section>
  );
};
