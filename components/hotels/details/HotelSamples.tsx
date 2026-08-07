import { Button } from "@/components/ui/button";
import { HotelCard } from "@/components/ui/hotelcard";
import { ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";

export const HotelSamples = () => {
  return (
    <section className="flex flex-col gap-8 container-x">
      <div className="w-full flex md:justify-between items-end gap-2 flex-col md:flex-row ">
        <div className="flex flex-col gap-2">
          <h2>Unique Architechture</h2>
          <p>Stay in luxury interpretations of Cameroon luxury</p>
        </div>
        <Link href="/hotels">
          <Button
            variant={"link"}
            className="text-primary flex items-center gap-2"
          >
            View all Hotels
            <HugeiconsIcon icon={ArrowRight} />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <HotelCard key={i} />
        ))}
      </div>
    </section>
  );
};
