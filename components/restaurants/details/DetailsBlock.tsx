import { Bike, Clock, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const RestaurantDetailsHero = () => {
  return (
    <div className="hero text-white bg-[url('/default.png')] bg-cover bg-center">
      <div className="w-full h-full bg-linear-180 from-black/20 to-secondary-foreground">
        <div className="container-x flex flex-col pb-6 gap-6 md:flex-row justify-between h-full items-end">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <span className="text-xs text-white bg-primary p-1 px-2 rounded-full">
                PREMIUM CHOICE
              </span>
              <span className="text-xs flex border border-border text-white bg-secondary-foreground p-1 px-2 rounded-full">
                <span className="flex gap-0.5">
                  <HugeiconsIcon
                    icon={Star}
                    className="text-primary fill-primary"
                    size={12}
                  />
                  <span>4.9</span>
                </span>
                <span className="opacity-70 px-1">(1.2k+ reviews)</span>
              </span>
            </div>
            <h1 className="text-5xl font-bold">
              Terango Bistro
            </h1>
            <p className="text-muted-foreground text-xs">Modern Senegalese-Cameroonian Fusion
              XAF XAF XAF</p>
          </div>
          <div className="flex gap-4">
            <div className="size-30 rounded-md flex-col backdrop-blur-2xl border border-border/15 flex items-center justify-center">
              <HugeiconsIcon icon={Clock} className="text-primary" size={20} />
              <span className="font-bold">20 - 35</span>
              <span className="text-xs text-muted-foreground">Minutes</span>
            </div>
            <div className="size-30 rounded-md flex-col backdrop-blur-2xl border border-border/15 flex items-center justify-center">
              <HugeiconsIcon icon={Bike} className="text-primary" size={20} />
              <span className="font-bold">Free</span>
              <span className="text-xs text-muted-foreground">Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
