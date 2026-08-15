import React from "react";
import { RestaurantDetailsHero } from "./DetailsBlock";
import { DetailsContent } from "./DetailsContent";

export const RestaurantDetailsBlock = () => {
  return (
    <div className="flex flex-col gap-6">
      <RestaurantDetailsHero />
      <DetailsContent />
    </div>
  );
};
