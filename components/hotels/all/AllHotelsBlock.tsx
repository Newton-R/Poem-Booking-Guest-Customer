import React from "react";
import { AllHotelsHero } from "./Hero";
import { HotelsGrid } from "./HotelsGrid";

export const AllHotelsBlock = () => {
  return (
    <div className="container-x flex flex-col gap-6">
      <AllHotelsHero />
      <HotelsGrid />
    </div>
  );
};
