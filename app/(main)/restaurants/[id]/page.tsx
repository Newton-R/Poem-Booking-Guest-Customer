import { EmptyRestaurants } from "@/components/emptystuff";
import { RestaurantDetailsBlock } from "@/components/restaurants/details/RestaurantDetailsBlock";
import { restaurants } from "@/lib/data";
import React from "react";

export default async function RestaurantDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // if (!restaurant) {
  //   return <EmptyRestaurants />;
  // }

  return (
    <div>
      <RestaurantDetailsBlock restaurant={id} />
    </div>
  );
}
