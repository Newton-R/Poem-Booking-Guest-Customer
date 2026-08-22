import { RouteBlock } from "@/components/buses/route/routeBlock";
import { EmptyBusRoutes } from "@/components/emptystuff";
import { busRoutes } from "@/lib/data";
import React from "react";

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ route: string }>;
}) {
  const { route } = await params;
  const BusRoute = busRoutes.find((r) => r.id === route);

  if (!BusRoute) {
    return <EmptyBusRoutes />;
  }

  return (
    <main className="flex flex-col gap-20">
      <RouteBlock busRoute={BusRoute} />
    </main>
  );
}
