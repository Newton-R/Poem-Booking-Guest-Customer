import {
  BadgeIcon,
  CustomerService01FreeIcons,
  QrCode,
  Target,
  WheelchairIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const PoemStandard = () => {
  const standards = [
    {
      label: "Verified Safety Inspection",
      icon: BadgeIcon,
    },
    {
      label: "Extra leg room guaranteed",
      icon: WheelchairIcon,
    },
    {
      label: "Extra leg room guaranteed",
      icon: WheelchairIcon,
    },
  ];
  return (
    <section className="container-x grid gap-6 grid-cols-1 md:grid-cols-2">
      <div className="bg-bg-mute relative row-span-2 p-6 flex overflow-hidden flex-col gap-6 rounded-2xl">
        <span className="text-[300px] absolute bottom-[-20%] -right-5 -rotate-12 text-muted-foreground opacity-40">
          di
        </span>
        <div className="flex flex-col gap-1.5">
          <h2>The POEM Standard</h2>
          <p className="text-[14px]">
            Every journey is curated to provide maximum comfort. No
            overcrowding, guaranteed air conditioning, and on- board
            entertainment.
          </p>
        </div>
        <div className="flex flex-col text-[14px] gap-2">
          {standards.map((standard, i) => (
            <div className="w-full flex gap-2" key={i}>
              <HugeiconsIcon
                icon={standard.icon}
                size={18}
                className="text-primary"
              />
              <span>{standard.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-primary/50 flex-col-reverse flex md:flex-row justify-between items-center h-80 p-6">
        <div className="flex h-fit flex-col">
          <span className="text-2xl font-bold text-primary">Live Tracking</span>
          <p className="text-[14px] w-[75%]">
            Real time GPS tracking for every trip, Share your location with
            loved once instantly
          </p>
        </div>
        <div className="shrink-0 w-18 h-18 flex items-center bg-white/30 justify-center rounded-full">
          <HugeiconsIcon
            icon={Target}
            size={24}
            className="text-primary font-bold"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-bg-mute gap-1 rounded-2xl h-50 flex items-center justify-center flex-col">
          <HugeiconsIcon icon={QrCode} size={30} />
          <span className="text-[14px]">Contactless Boarding</span>
        </div>
        <div className="p-6 bg-secondary-foreground text-primary gap-1 rounded-2xl h-50 flex items-center justify-center flex-col">
          <HugeiconsIcon icon={CustomerService01FreeIcons} size={30} />
          <span className="text-[14px]">24/7 Coverage</span>
        </div>
      </div>
    </section>
  );
};
