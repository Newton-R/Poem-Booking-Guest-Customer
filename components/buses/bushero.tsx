"use client";
import {
  ArrowRight,
  ArrowRight01FreeIcons,
  Bed,
  Building01Icon,
  Bus01FreeIcons,
  Calendar,
  Location,
  People,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Button } from "../ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { regions } from "@/lib/data";
import { DatePickerDemo } from "../ui/date-picker";

export const BusesHero = () => {
  return (
    <section className="w-full flex items-center justify-center text-white h-[calc(600px+var(--nav-height))] bg-[url('/default.png')] bg-cover relative">
      <div className="absolute inset-0 bg-black/40">
        <div className="w-full h-[600px] mt-(--nav-height) container-x border-b border-border flex flex-col justify-center">
          <div className="flex flex-col gap-6 text-start w-full max-w-[50%]">
            <h1 className="text-6xl flex flex-col gap-2 font-bold">
              <span className="text-white font-bold">
                Redefining the Road. Luxury Bus Travel.
              </span>
            </h1>
            <p className="text-gray-100">
              Experience the gold standard of travel across Cameroon with
              premium fleets, verified safety, and world-class service.
            </p>
            <Button className="p-6 w-40 flex items-center gap-2 ">
              Explore Hotels <HugeiconsIcon icon={ArrowRight01FreeIcons} />
            </Button>
          </div>

          <div className="w-full md:w-[85%] mt-8 shadow-md gap-4 text-black p-6 bg-white rounded-2xl border border-border flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-bold flex gap-1 items-center">
                  <HugeiconsIcon icon={Location} size={12} />
                  Origin
                </span>
                <Combobox items={regions}>
                  <ComboboxInput
                    className={"h-10"}
                    placeholder="Select an Origin"
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
              <div className="flex flex-col gap-1">
                <span className="font-bold flex gap-1 items-center">
                  <HugeiconsIcon icon={Location} size={12} />
                  Destination
                </span>
                <Combobox items={regions}>
                  <ComboboxInput
                    className={"h-10"}
                    placeholder="Select destination"
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
              <div className="flex flex-col gap-1">
                <span className="font-bold flex gap-1 items-center">
                  <HugeiconsIcon icon={Calendar} size={12} />
                  Departure
                </span>
                <DatePickerDemo />
              </div>
            </div>
            <Button className={" p-5 w-full"}>
              Find Best Routes <HugeiconsIcon icon={ArrowRight} size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
