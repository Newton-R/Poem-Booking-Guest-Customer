import {
  Bed,
  Building01Icon,
  Building02FreeIcons,
  Bus01FreeIcons,
  Calendar,
  Location,
  Money,
  People,
  Star,
  Wifi,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { MainHomeFilters } from "../filtersblock/MainHomeFilters";

export const HomeHero = () => {
  const amenitites = [
    {
      icon: Money,
      label: "Price Range",
    },
    {
      icon: Star,
      label: "Guest Rating",
    },
    {
      icon: Building02FreeIcons,
      label: "Property Type",
    },
    {
      icon: Wifi,
      label: "Amenities",
    },
  ];
  return (
    <div className="w-full h-fit md:h-[600px] mt-(--nav-height) container-x border-b border-border flex flex-col items-center justify-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-4xl md:text-6xl flex flex-col gap-2 font-bold">
          <span className="text-secondary-foreground">Discover your Next</span>
          <span className="text-primary">Haven in Cameroon</span>
        </h1>
        <p className="text-center">
          Curated comfort across the nation from the mist of Mount Cameroon to
          the vibrant street of Douala. Explore Cameroon in one place.
        </p>
      </div>
      <MainHomeFilters />
      <div className="w-full mt-4 flex flex-wrap gap-2 mx-auto md:max-w-[85%] items-center">
        {amenitites.map((amenity, i) => (
          <div
            key={i}
            className="flex p-2 px-4 flex-wrap rounded-full border gap-2 border-border bg-white text-xs justify-center items-center"
          >
            <HugeiconsIcon icon={amenity.icon} size={12} />
            {amenity.label}
          </div>
        ))}
      </div>
    </div>
  );
};
