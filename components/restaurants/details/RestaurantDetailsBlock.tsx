"use client";
import React, { useEffect, useState } from "react";
import { RestaurantDetailsHero } from "./DetailsBlock";
import { DetailsContent } from "./DetailsContent";
import { Restaurant } from "@/lib/types";
import { useGetRestaurantDetails } from "@/lib/public/useGetRestaurants";
import { EmptyRestaurants } from "@/components/emptystuff";

export const RestaurantDetailsBlock = ({
  restaurant,
}: {
  restaurant: string;
}) => {
  const { data, isLoading, isError, refetch } =
    useGetRestaurantDetails(restaurant);
  console.log({ details: data });
  if (!data) {
    return <EmptyRestaurants />;
  }
  return (
    <div className="flex flex-col gap-6">
      <RestaurantDetailsHero loading={isLoading} restaurant={data.data} />
      <DetailsContent loading={isLoading} restaurant={data.data} />
    </div>
  );
};
