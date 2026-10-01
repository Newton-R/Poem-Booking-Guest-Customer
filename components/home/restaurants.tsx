"use client";
import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01FreeIcons, Star } from "@hugeicons/core-free-icons";
import SafeImage from "@/components/ui/safe-image";
import Link from "next/link";
import { useGetAllRestaurants } from "@/lib/public/useGetRestaurants";
import { PopularRestaurantsSkeleton } from "../loaders/restaurant/PopularDishLoading";
import { Restaurant } from "@/lib/types/restaurant";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const coverUrl = process.env.NEXT_PUBLIC_IMAGE_URL + restaurant.logoUrl;
  return (
    <div className="flex flex-col h-110 overflow-hidden rounded-2xl border border-border">
      <div className="flex overflow-hidden flex-1">
        <SafeImage
          src={coverUrl}
          alt=""
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <span>{restaurant.name}</span>
          <span className="text-primary flex items-center gap-1">
            <HugeiconsIcon icon={Star} size={12} className="fill-primary" />{" "}
            {restaurant.rating.toFixed(1)}
          </span>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {restaurant.description}
        </p>
        <Link href={`/restaurants/${restaurant.id}`} className="w-full">
          <Button
            className={"w-full p-6 rounded-md border-primary text-primary"}
            variant={"outline"}
          >
            View Menu
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const Restaurants = () => {
  const { data: restaurants, isLoading } = useGetAllRestaurants();
  if (isLoading || !restaurants) {
    return <PopularRestaurantsSkeleton />;
  }
  return (
    <section className=" flex flex-col container-x gap-4">
      <div className="flex  justify-between items-center">
        <h2>Popular Restaurants</h2>
        <div className="flex items-center gap-2">
          <Link className="flex items-center gap-2" href={`/restaurants`}>
            <Button className={"rounded-full"} variant={"outline"}>
              View More
            </Button>
            <Button
              variant={"outline"}
              size={"icon-lg"}
              className={"rounded-full"}
            >
              <HugeiconsIcon icon={ArrowRight01FreeIcons} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {restaurants.data.slice(0, 3).map((restaurant, i) => (
          <RestaurantCard restaurant={restaurant} key={i} />
        ))}
      </div>
    </section>
  );
};
