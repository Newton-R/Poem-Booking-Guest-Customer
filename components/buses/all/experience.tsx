import { Shield, WheelchairIcon, Wifi } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const Experience = () => {
  const exp = [
    {
      head: "In Bus Connectivity",
      icon: Wifi,
      description: "Complimentary high-speed WiFi on all inter-city coaches.",
    },
    {
      description:
        "Ergonomic seating with 20% more space than standard coaches.",
      icon: WheelchairIcon,
      head: "Premium Legroom",
    },
    {
      description:
        "GPS-tracked vehicles and 24/7 route monitoring for your peace of mind.",
      head: "Safe Travel Promise",
      icon: Shield,
    },
  ];
  return (
    <section className="w-full bg-bg-mute py-20">
      <section className="container-x flex flex-col">
        <div className="w-full flex flex-col gap-4 text-center">
          <h2>The POEM experience</h2>
          <p className="text-muted-foreground">Standard across all routes</p>
        </div>
        <div className="grid grid-cols-1 mt-6 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exp.map((ex, i) => (
            <div
              key={i}
              className="p-6 bg-background rounded-md flex flex-col gap-4"
            >
              <HugeiconsIcon
                icon={ex.icon}
                className="font-bold text-primary"
              />
              <span className="text-xl font-bold">{ex.head}</span>
              <p className="text-muted-foreground text-[14px]">
                {ex.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
