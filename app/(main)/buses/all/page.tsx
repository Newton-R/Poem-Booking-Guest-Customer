import { AllBusHero } from "@/components/buses/all/AllBusHero";
import { Hubs } from "@/components/buses/all/Hubs";
import React from "react";

const AllBusesPage = () => {
  return (
    <main className="flex flex-col gap-20">
      <AllBusHero />
      <Hubs />
    </main>
  );
};

export default AllBusesPage;
