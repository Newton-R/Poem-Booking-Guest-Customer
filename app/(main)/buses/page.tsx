import { BusesHero } from "@/components/buses/bushero";
import { PopularRoutesSection } from "@/components/buses/popularRoutes";
import { PoemStandard } from "@/components/buses/Standard";
import { VIPBlock } from "@/components/buses/vipblock";
import { Message } from "@/components/home/Message";
import React from "react";

const BusesPage = () => {
  return (
    <main className="flex flex-col gap-20">
      <BusesHero />
      <VIPBlock />
      <PopularRoutesSection />
      <PoemStandard />
      <Message />
    </main>
  );
};

export default BusesPage;
