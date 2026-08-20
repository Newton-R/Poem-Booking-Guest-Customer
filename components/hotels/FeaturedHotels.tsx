import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight } from "@hugeicons/core-free-icons";
import { HotelCard, HotelInfoPlus } from "../ui/hotelcard";
import { hotels } from "@/lib/data";

export const FeaturedHotels = () => {
  return (
    <section className="flex flex-col gap-6 container-x">
      <div className="w-full flex flex-col md:flex-row items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-primary text-xs">TOP RATED</span>
          <h2>Featured Hotels</h2>
          <p className="text-muted-foreground">
            Experience the finest living spaces across Cameroon's and most
            prestigious neighbourhood.
          </p>
        </div>
        <Link href={"/hotels/all"} className="cursor-pointer">
          <Button variant={"link"}>
            View all <HugeiconsIcon icon={ArrowRight} size={20} />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map(
          (hotel, i) =>
            hotel.featured && <HotelInfoPlus hotel={hotel} key={i} />,
        )}
      </div>
    </section>
  );
};
