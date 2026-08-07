import { Footer } from "@/components/home/Footer";
import { DiscoverMore } from "@/components/regions/discover";
import { HeaderContent } from "@/components/regions/header";
import React from "react";

const RegionsPage = () => {
  return (
    <main className="flex flex-col gap-20">
      <HeaderContent />
      <DiscoverMore />
    </main>
  );
};

export default RegionsPage;
