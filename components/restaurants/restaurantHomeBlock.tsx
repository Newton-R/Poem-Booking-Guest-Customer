"use client";
import React, { useEffect, useState } from "react";
import { RestaurantsHomeHero } from "./HomeHero";
import { RestaurantHomePageContent } from "./HomePageContent";
import { restaurants } from "@/lib/data";
import { useGetAllRestaurants } from "@/lib/public/useGetRestaurants";

export const RestaurantHomeBlock = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: "",
    rating: "",
    delivery: "",
    openOnly: false,
  });
  const { data, isLoading, refetch, isError } = useGetAllRestaurants();
  console.log({ restaurants: data });
  const cuisines = Array.from(
    new Set(restaurants.flatMap((restaurant) => restaurant.categories)),
  ).sort();
  const normalizedQuery = query.trim().toLowerCase();
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const searchableText = JSON.stringify(restaurant).toLowerCase();
    const deliveryValues = restaurant.deliveryMinutes.match(/\d+/g) ?? [];
    const maxDeliveryMinutes = Number(deliveryValues.at(-1));

    return (
      (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
      (!filters.cuisine || restaurant.categories.includes(filters.cuisine)) &&
      (!filters.rating || restaurant.rating >= Number(filters.rating)) &&
      (!filters.delivery || maxDeliveryMinutes <= Number(filters.delivery)) &&
      (!filters.openOnly || restaurant.isOpen)
    );
  });

  const updateFilter = <Key extends keyof typeof filters>(
    key: Key,
    value: (typeof filters)[Key],
  ) => setFilters((current) => ({ ...current, [key]: value }));

  const clearFilters = () => {
    setQuery("");
    setFilters({
      cuisine: "",
      rating: "",
      delivery: "",
      openOnly: false,
    });
  };

  if (!data) {
    return <>Sorry</>;
  }

  return (
    <div className="flex flex-col gap-20">
      <RestaurantsHomeHero
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        cuisines={cuisines}
      />
      <RestaurantHomePageContent
        restaurants={data.data}
        isLoading={isLoading}
      />
    </div>
  );
};
