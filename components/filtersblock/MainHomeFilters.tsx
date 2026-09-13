"use client";
import {
  Bed,
  Building01Icon,
  Bus01FreeIcons,
  Calendar,
  Location,
  People,
  PlateFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ApartmentFilters } from "./ApartmentFilters";
import { BusFilter } from "./BusFilter";
import Link from "next/link";
import { HotelsFilters } from "./HotelsFilters";

export const MainHomeFilters = () => {
  return (
    <Tabs className="w-full md:w-[85%] mt-8 p-4 shadow-md mx-auto bg-white rounded-2xl border border-border flex flex-col">
      <TabsList variant={"line"} className={""}>
        <TabsTrigger value={"hotels"} className={"cursor-pointer"}>
          <span className="flex items-center gap-2 px-2">
            <HugeiconsIcon icon={Bed} size={18} />
            <span className="tri-label">Hotels</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value={"apartments"} className={"cursor-pointer"}>
          <span className="flex items-center px-2 gap-2">
            <HugeiconsIcon icon={Building01Icon} size={18} />
            <span className="tri-label">Appartments</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value={"bus"} className={"cursor-pointer"}>
          <span className="flex items-center px-2 gap-2">
            <HugeiconsIcon icon={Bus01FreeIcons} size={18} />
            <span className="tri-label">Buses</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value={"restaurants"}>
          <Link href={"/restaurants"}>
            <span className="flex items-center px-2 gap-2">
              <HugeiconsIcon icon={PlateFreeIcons} size={18} />
              <span className="tri-label">Restaurant</span>
            </span>
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={"hotels"}>
        <HotelsFilters />
      </TabsContent>
      <TabsContent value={"bus"}>
        <BusFilter />
      </TabsContent>
      <TabsContent value={"apartments"}>
        <ApartmentFilters />
      </TabsContent>
      {/* <div className="w-full text-[14px] p-4 justify-between flex items-center">
        <div className="flex flex-col gap-1">
          <span className="font-bold flex gap-1 items-center">
            <HugeiconsIcon icon={Location} size={12} />
            Location
          </span>
          <p className="text-muted-foreground">Where are you heading to?</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold flex gap-1 items-center">
            <HugeiconsIcon icon={Calendar} size={12} />
            Dates
          </span>
          <p className="text-muted-foreground">Check in - Check out</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold flex gap-1 items-center">
            <HugeiconsIcon icon={People} size={12} />
            Guests
          </span>
          <p className="text-muted-foreground">2 Adults, 1 room</p>
        </div>
        <div className=""></div>
      </div> */}
    </Tabs>
  );
};
