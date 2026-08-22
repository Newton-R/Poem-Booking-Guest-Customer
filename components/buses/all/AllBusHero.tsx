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
import { DatePickerDemo } from "@/components/ui/date-picker";
import { cities } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";
import { OurFilter } from "./AllBusRoutesBlock";

export const AllBusHero = ({
  updateFilter,
  filter,
}: {
  updateFilter: (key: keyof OurFilter, value: string) => void;
  filter: OurFilter;
}) => {
  return (
    <section className="container-x mt-(--nav-height) bg-[url('/mapoverlay.png')] bg-cover items-center justify-center flex flex-col text-center h-120">
      <h1 className="text-3xl font-bold mb-4">Explore all Routes</h1>
      <p className="w-full md:w-[70%] text-center">
        Seamless inter-city connections across the heart of Cameroon. Experience
        curated comfort from departure to destination.
      </p>
      <div className="w-full md:w-[80%] shadow-md p-6 grid grid-cols-1 mt-6 md:grid-cols-2 bg-white rounded-2xl items-end lg:grid-cols-4 gap-4">
        {/* origin */}
        <div className="flex flex-col items-start gap-2">
          <span className="text-muted-foreground text-xs">Origin</span>
          <Combobox
            value={filter.origin}
            onValueChange={(value) => updateFilter("origin", value ?? "")}
            items={cities}
          >
            <ComboboxInput
              className={"h-10 text-[14px]"}
              placeholder="Select a city"
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

        {/* Destination */}
        <div className="flex flex-col items-start gap-2">
          <span className="text-muted-foreground text-xs">Destination</span>
          <Combobox
            value={filter.destination}
            onValueChange={(value) => updateFilter("destination", value ?? "")}
            items={cities}
          >
            <ComboboxInput
              className={"h-10 text-[14px]"}
              placeholder="Select a city"
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

        {/* Departure Date */}

        <div className="flex flex-col items-start w-full gap-2">
          <span className="text-muted-foreground text-xs">Departure</span>
          <DatePickerDemo className="min-w-55" />
        </div>

        <Button
          disabled={filter.destination || filter.origin ? false : true}
          variant={"outline"}
          onClick={() => {
            updateFilter("destination", "");
            updateFilter("origin", "");
          }}
          className={"h-10"}
        >
          Clear Filters <HugeiconsIcon icon={ArrowRight} size={16} />
        </Button>
      </div>
    </section>
  );
};
