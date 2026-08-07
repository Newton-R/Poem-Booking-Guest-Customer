import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01FreeIcons, Star } from "@hugeicons/core-free-icons";
import Image from "next/image";

const RestaurantCard = () => {
  return (
    <div className="flex flex-col h-110 overflow-hidden rounded-2xl border border-border">
      <div className="flex overflow-hidden flex-1">
        <Image
          src={"/default.png"}
          alt=""
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <span>El Palicio</span>
          <span className="text-primary flex items-center gap-1">
            <HugeiconsIcon icon={Star} size={12} className="fill-primary" /> 4.9
          </span>
        </div>
        <p>Authentic French Cameroonian fusion in the heart of Douala.</p>
        <Button
          className={"w-full p-6 rounded-md border-primary text-primary"}
          variant={"outline"}
        >
          View Menu
        </Button>
      </div>
    </div>
  );
};

export const Restaurants = () => {
  return (
    <section className=" flex flex-col container-x gap-4">
      <div className="flex  justify-between items-center">
        <h2>Popular Restaurants</h2>
        <div className="flex items-center gap-2">
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
        </div>
      </div>
      <div className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {Array.from({ length: 3 }).map((_, i) => (
          <RestaurantCard key={i} />
        ))}
      </div>
    </section>
  );
};
