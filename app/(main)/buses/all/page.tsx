import { AllBusHero } from "@/components/buses/all/AllBusHero";
import { Experience } from "@/components/buses/all/experience";
import { Hubs } from "@/components/buses/all/Hubs";
import React from "react";

const AllBusesPage = () => {
  return (
    <main className="flex flex-col gap-20">
      <AllBusHero />
      <Hubs />
      <Experience />
    </main>
  );
};

export default AllBusesPage;
