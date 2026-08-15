import { Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const RestaurantDetailsHero = () => {
  return (
    <div className="hero bg-[url('/default.png')] bg-cover bg-center">
      <div className="w-full h-full bg-linear-180 from-black/20 to-secondary-foreground">
        <div className="container-x flex flex-col gap-6 md:flex-row justify-between items-end">
          <div>
            <div className="flex gap-4 items-center">
              <span className="text-xs text-white bg-primary p-1 px-2 rounded-full">
                PREMIUM CHOICE
              </span>
              <span className="text-xs flex text-white bg-secondary-foreground p-1 px-2 rounded-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};
