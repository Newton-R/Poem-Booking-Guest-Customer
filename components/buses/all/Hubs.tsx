import { EmptyBusRoutes } from "@/components/emptystuff";
import { LoadingDetailedBus } from "@/components/loaders/bus/LoadingDetailedBus";
import { DetailedBusRouteCard } from "@/components/ui/busrouteCard";
import { BusRegion, BusRoute } from "@/lib/types";
import React from "react";

export const Hubs = ({
  routes,
  isLoading,
}: {
  routes: BusRoute[];
  isLoading: boolean;
}) => {
  const extract = (region: BusRegion) => {
    return routes.filter((r) => r.region === region);
  };

  const SplitGroups = () => {
    return [
      {
        groupName: "Littoral",
        routes: extract("Littoral"),
      },
      {
        groupName: "Central",
        routes: extract("Central"),
      },
      {
        groupName: "North West",
        routes: extract("North West"),
      },
      {
        groupName: "North East",
        routes: extract("North East"),
      },
      {
        groupName: "South West",
        routes: extract("South West"),
      },
      {
        groupName: "South East",
        routes: extract("South East"),
      },
    ];
  };

  if (isLoading) {
    return (
      <div className="container-x grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <LoadingDetailedBus key={i} />
        ))}
      </div>
    );
  }

  if (routes.length === 0) {
    return <EmptyBusRoutes />;
  }

  return (
    <section>
      {SplitGroups().map(
        (group, i) =>
          group.routes.length > 0 && (
            <div key={i} className="container-x flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-xl">{group.groupName} Hub</h2>
                <div className="flex-1 border-b border-primary bg-primary" />
                <span className="text-xs text-primary ">
                  {group.routes.length} Active Routes
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.routes.map((r, i) => (
                  <DetailedBusRouteCard busroute={r} key={i} />
                ))}
              </div>
              <div></div>
            </div>
          ),
      )}
    </section>
  );
};
