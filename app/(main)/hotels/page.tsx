"use client";
import { Message } from "@/components/home/Message";
import { CollectionsSection } from "@/components/hotels/Collections";
import { FeaturedHotels } from "@/components/hotels/FeaturedHotels";
import { HotelsHero } from "@/components/hotels/Hero";
import { HeroMain } from "@/components/hotels/HeroMain";
import { WhyPoem } from "@/components/hotels/WhyPoem";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

type FilterOption = {
  id: string;
  label: string;
  checked: boolean;
};

type FilterGroup = {
  id: string;
  title: string;
  options: FilterOption[];
};

const HotelsPage = () => {
  const filters: FilterGroup[] = [
    {
      id: "departureTime",
      title: "Departure Time",
      options: [
        { id: "morning", label: "Morning (06:00 - 12:00)", checked: false },
        { id: "afternoon", label: "Afternoon (12:00 - 18:00)", checked: false },
        { id: "evening", label: "Evening (18:00 - 00:00)", checked: false },
      ],
    },
    {
      id: "busOperator",
      title: "Bus Operator",
      options: [
        { id: "finexs", label: "Finexs Voyages", checked: true },
        { id: "general", label: "General Express", checked: false },
        { id: "buca", label: "Buca Voyages", checked: true },
      ],
    },
  ];
  return (
    <main className="flex flex-col gap-20">
      <HeroMain />
      <div className="flex  gap-8 relative min-h-screen">
        {/* <div className="w-80 bg-background sticky p-6 flex flex-col gap-2 top-[calc(10px+var(--nav-height))] border border-border rounded-2xl h-100">
          <div className="flex mb-4 pb-4 border-b border-border justify-between items-center">
            <span>Filters</span>
            <HugeiconsIcon icon={Filter} size={18} />
          </div>
          <div className="flex flex-col gap-6">
            {filters.map((group) => (
              <div key={group.id} className="flex flex-col gap-2">
                <span className="font-bold">{group.title}</span>
                <div className="flex flex-col gap-2">
                  {group.options.map((option) => (
                    <label key={option.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() => {}}
                        className="form-checkbox"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex flex-1 flex-col gap-20">
          <CollectionsSection />
          <FeaturedHotels />
          <WhyPoem />
          <Message />
        </div>
      </div>
    </main>
  );
};

export default HotelsPage;
