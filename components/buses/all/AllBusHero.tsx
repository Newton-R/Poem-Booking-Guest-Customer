"use client";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";

export const AllBusHero = () => {
  const regions = ["Douala (Littoral)", "Yaounde (Centre)"];
  return (
    <section className="container-x mt-(--nav-height) bg-[url('/mapoverlay.png')] bg-cover items-center justify-center flex flex-col text-center h-120">
      <h1 className="text-3xl font-bold mb-4">Explore all Routes</h1>
      <p className="w-full md:w-[70%] text-center">
        Seamless inter-city connections across the heart of Cameroon. Experience
        curated comfort from departure to destination.
      </p>
      <div className="w-full md:w-[80%] shadow-md p-6 grid grid-cols-1 mt-6 md:grid-cols-2 bg-white rounded-2xl items-end lg:grid-cols-4 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="flex flex-col items-start gap-2" key={i}>
            <span className="text-muted-foreground text-xs">Origin</span>
            <Combobox items={regions}>
              <ComboboxInput
                className={"h-10 text-[14px]"}
                placeholder="Select a framework"
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        ))}

        <Button className={"h-10"}>
          Search Routes <HugeiconsIcon icon={ArrowRight} size={16} />
        </Button>
      </div>
    </section>
  );
};
