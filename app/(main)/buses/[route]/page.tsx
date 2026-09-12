import { RouteBlock } from "@/components/buses/route/routeBlock";
import { EmptyBusRoutes } from "@/components/emptystuff";

import React from "react";

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ route: string }>;
}) {
  const { route } = await params;

  // if (!BusRoute) {
  //   return <EmptyBusRoutes />;
  // }

  return (
    <main className="flex flex-col gap-20">
      <RouteBlock routeId={route}  />
    </main>
  );
}
