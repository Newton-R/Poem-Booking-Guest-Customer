"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DishCard } from "@/components/ui/restaurantdishcard";
import { Textarea } from "@/components/ui/textarea";
import { Dish } from "@/lib/types";
import {
  ArrowRight,
  ChickenThighsIcon,
  Minus,
  Plus,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MealCustomisation } from "./MealCustomisation";
import { useGetRestaurantDetails } from "@/lib/public/useGetRestaurants";
import { MealDetailsBlockSkeleton } from "@/components/loaders/restaurant/mealDetails";
import { formatPrice } from "@/lib/data";

export const MealDetailsBlock = ({
  dishId,
  restaurantId,
}: {
  dishId: string;
  restaurantId: string;
}) => {
  const router = useRouter();
  const ingredients = [
    {
      icon: ChickenThighsIcon,
      label: "Farm Chicken",
    },
  ];
  const { data, isLoading } = useGetRestaurantDetails(restaurantId);

  if (!data || isLoading) {
    return <MealDetailsBlockSkeleton />;
  }

  const dishes = data.data.menu.flatMap((menu) => menu.items);
  const meal = dishes.find((dishes) => dishes.id === dishId);

  if (!meal) {
    return <p>N</p>;
  }
  const others = dishes.filter((dish) => dish.id !== meal.id);
  const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL + meal.imageUrl;
  return (
    <main className="container-x flex flex-col gap-20 mt-(--mobile-nav-height) lg:mt-[calc(var(--nav-height)+10px)]">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
        <div className="md:col-span-3 flex flex-col gap-5">
          <div className=" h-100">
            <img
              src={imgUrl}
              width={400}
              height={400}
              className="w-full rounded-2xl h-full object-cover"
              alt="Meal Picture"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[14px] font-bold">Description</span>
            <p className="text-xs text-muted-foreground">{meal.description}</p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[14px] font-bold">Ingredients</span>
            {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {dish.ingredients.map((ingredient, i) => (
                <div
                  key={i}
                  className="flex p-2 justify-center items-center text-xs gap-2 bg-white text-muted-foreground border border-bo rounded-md"
                >
                  <span>{ingredient}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col gap-1 pb-4 border-b border-border">
            <h1 className="text-3xl font-bold">{meal.name}</h1>
            <span className="text-primary">{formatPrice(meal.priceXaf)}</span>
          </div>
          {/* Meal customisation block */}
          <MealCustomisation restaurantId={restaurantId} dish={meal} />
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <div className="w-full flex flex-col md:flex-row items-start gap-2 md:justify-between md:items-end">
          <div className="flex flex-col gap-2">
            <h2>From the same Kitchen</h2>
            <p className="text-muted-foreground text-[14px]">
              Complete your feast with these favorites
            </p>
          </div>
          <Link href={`/restaurants/${restaurantId}`}>
            <Button variant={"link"}>
              View full menu
              <HugeiconsIcon icon={ArrowRight} size={20} />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {others.map((meal, i) => (
            <DishCard Dish={meal} key={i} />
          ))}
        </div>
      </section>
    </main>
  );
};
