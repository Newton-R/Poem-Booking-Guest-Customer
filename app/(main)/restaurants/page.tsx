import { RestaurantsHomeHero } from "@/components/restaurants/HomeHero";
import { RestaurantHomePageContent } from "@/components/restaurants/HomePageContent";
import React from "react";

const RestaurantsPage = () => {
  return (
    <div className="flex flex-col gap-20">
      <RestaurantsHomeHero />
      <RestaurantHomePageContent />
    </div>
  );
};

export default RestaurantsPage;
