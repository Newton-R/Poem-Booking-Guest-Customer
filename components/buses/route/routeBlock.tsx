"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  IceHockeyFreeIcons,
  Pen,
  Wifi,
  Zap,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Voyages {
  index: number;
}

const VoyagesBlock = ({ index }: Voyages) => {
  const ammenities = [
    {
      label: "Wifi",
      icon: Wifi,
    },
    {
      label: "Charging",
      icon: Zap,
    },
    {
      label: "AC",
      icon: IceHockeyFreeIcons,
    },
  ];
  return (
    <div className="p-6 md:p-8 rounded-xl border-2 h-fit md:h-60 border-border grid grid-cols-1 md:grid-cols-4 gap-6 md:flex-row">
      <div className="w-full flex items-center justify-center flex-col gap-4">
        <div className="w-25 h-25 rounded-full overflow-hidden">
          <Image
            src={"/default.png"}
            className="w-full h-full"
            width={300}
            height={300}
            alt="Image"
          />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <span>Finex Voyages</span>
          <span className="text-xs bg-primary/10 text-primary p-1 px-2 rounded-full">
            PREMUIM OPERATOR
          </span>
        </div>
      </div>
      <div className="flex-1 pl-6 border-l-2 border-border flex col-span-3 flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold">06:30</span>
            <span className="text-muted-foreground">Douala (Akwa)</span>
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-1 text-xs">
            <span>3h 45m</span>
            <div className="flex h-0.5 relative bg-gray-400 w-40 items-center">
              <div className="size-2 rounded-full border border-gray-400 bg-background absolute -left-1" />
              <div className="size-2 rounded-full border bg-primary border-gray-400 absolute -right-1" />
            </div>
            <span className="text-xs text-primary">Non stop</span>
          </div>
          <div className="text-end flex flex-col">
            <span className="text-xl font-bold">10:15</span>
            <span className="text-muted-foreground">Yaounde (Ivan)</span>
          </div>
          <div className="text-end flex flex-col">
            <span className="text-muted-foreground">VIP CLASS</span>
            <span className="text-xl font-bold">6,500 XAF</span>
          </div>
        </div>
        <div className="w-full flex justify-between mt-auto items-center flex-col md:flex-row gap-4">
          <div className="flex gap-4 items-center">
            {ammenities.map((ammenity, i) => (
              <span
                key={i}
                className="flex gap-1 items-center text-[14px] text-muted-foreground"
              >
                <HugeiconsIcon
                  icon={ammenity.icon}
                  size={18}
                  className="font-bold"
                  strokeWidth={2}
                />
                <span>{ammenity.label}</span>
              </span>
            ))}
          </div>
          <Link className="w-fit" href={`/buses/route/${index}`}>
            <Button className={"p-6 w-40 text-[16px]"}>Select Seats</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

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

export const RouteBlock = () => {
  const filters: FilterGroup[] = [
    {
      id: "departureTime",
      title: "Departure Time",
      options: [
        { id: "morning", label: "Morning (06:00 - 12:00)", checked: false },
        {
          id: "afternoon",
          label: "Afternoon (12:00 - 18:00)",
          checked: false,
        },
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
    <section className="container-x flex flex-col mt-(--nav-height) gap-20">
      <div className="bg-secondary-foreground flex justify-between items-center p-6 rounded-2xl">
        <div className="flex flex-col gap-2">
          <span className="flex text-white text-2xl items-center gap-3">
            <span className="font-bold">Douala</span>
            <HugeiconsIcon icon={ArrowRight} className="text-primary" />
            <span className="font-bold">Yaounde</span>
          </span>
          <p className="text-muted-foreground">
            Wednesday, 24 May 2024 • 1 Adult • Business Class
          </p>
        </div>
        <Button
          className={
            "bg-white/30 p-6 w-40 rounded-full border border-white text-white"
          }
        >
          <HugeiconsIcon icon={Pen} size={14} /> Change Search
        </Button>
      </div>
      <div className="min-h-screen gap-6 grid grid-cols-4">
        <div className="sticky top-[calc(var(--nav-height)+10px)] flex flex-col gap-6 h-[calc(100vh-13%)]">
          <div className="flex flex-col gap-6 bg-bg-mute/50 border-2 flex-1 border-border rounded-2xl p-6 ">
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
          <div className="p-6 bg-primary/10 flex flex-col rounded-2xl gap-1">
            <HugeiconsIcon
              icon={BadgeCheck}
              className="text-primary font-bold"
              size={20}
            />
            <div>
              <span className="font-bold text-xl">Curated Comfort</span>
              <p className="text-muted-foreground">
                Every operator on POEM is manually vetted for safety and
                punctuality.
              </p>
            </div>
          </div>
        </div>
        <div className="flex col-span-3 flex-col gap-6">
          <div className="bg-bg-mute rounded-xl p-4 flex justify-between">
            <span className="flex items-center gap-2">
              <HugeiconsIcon icon={ArrowLeft} size={16} />
              Previous day
            </span>
            <span className="font-bold text-xl">Today, May 24</span>
            <span className="flex items-center gap-2">
              Next day
              <HugeiconsIcon icon={ArrowRight} size={16} />
            </span>
          </div>
          {/* Array of mapped departure cards */}
          {Array.from({ length: 3 }).map((_, i) => (
            <VoyagesBlock key={i} index={i} />
          ))}
          {/* load departures button */}
          <div className="w-full justify-center flex items-center">
            <Button
              className={"rounded-full text-[16px] p-6 "}
              variant={"outline"}
            >
              Load More Departures
              <HugeiconsIcon icon={ArrowDown} size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
