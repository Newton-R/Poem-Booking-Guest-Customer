import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const RestaurantsHomeHero = () => {
  const feats = ["Cuisines", "Price", "Ratings", "Delivery Time"];
  return (
    <div className="bg-bg-mute/40 mt-[calc(var(--nav-height))] py-30">
      <div className="container-x flex flex-col items-center justify-center gap-4">
        <span className="font-bold text-xs">
          The flavors of Cameroon, delivered.
        </span>
        <span className="text-xl">
          Discover culinary excellence across the nation, curated for your
          palate.
        </span>
        <div className="w-full max-w-xl gap-4 rounded-full shadow-md flex items-center bg-blue-50 p-4">
          <HugeiconsIcon
            icon={Search}
            size={20}
            className="text-muted-foreground"
          />
          <input
            className="bg-none border-none outline-0 flex-1 ring-0"
            placeholder="Search for restaurants, cuisines or dishes..."
          />
          <Button
            className={
              "rounded-full bg-secondary-foreground hover:bg-secondary-foreground/90 p-2 px-4 "
            }
          >
            Find Food
          </Button>
        </div>
        <div className="flex gap-4 mt-2 items-center justify-center">
          {feats.map((feat, i) => (
            <span
              key={i}
              className={cn(
                "p-2 px-6 text-[14px] rounded-full bg-white border border-border text-black",
                i === 1 ? "bg-primary text-white" : "",
              )}
            >
              {feat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
