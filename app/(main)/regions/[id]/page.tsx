import { HotelSamples } from "@/components/hotels/details/HotelSamples";
import { HotelsHero } from "@/components/hotels/Hero";
import React from "react";

const HotelsPage = () => {
  return (
    <main className="flex flex-col gap-20">
      <HotelsHero />
      <HotelSamples />
    </main>
  );
};

export default HotelsPage;
