import { ArrowRight, Bus, Heart, Ticket } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { HotelCard } from "../ui/hotelcard";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const TopRated = () => {
  const routes = [
    {
      route: "Douala to Yaounde",
      description: "Daily frequent departures",
      price: "6000",
    },
    {
      route: "Douala to Yaounde",
      description: "Daily frequent departures",
      price: "6000",
    },
    {
      route: "Douala to Yaounde",
      description: "Daily frequent departures",
      price: "6000",
    },
  ];
  return (
    <section className="flex flex-col container-x gap-6">
      <div className="w-full flex justify-between items-end">
        <span>
          <h2 className="text-[12px] font-bold">TOP RATED</h2>
          <p>Trending Hotels in Cameroon</p>
        </span>
        <Link href={"/regions"} className="flex text-[14px] items-center gap-2">
          <Button variant={"link"}>
            View All <HugeiconsIcon icon={ArrowRight} size={20} />
          </Button>
        </Link>
      </div>

      {/* // card grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <HotelCard key={i} />
        ))}
      </div>

      {/* small photo grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-secondary-foreground p-6 rounded-2xl text-white flex flex-col">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-xs h-fit bg-white/20 border border-white rounded-full p-1 px-2 text-white w-fit">
                APPARTMENTS
              </span>
              <span className="text-xs h-fit items-center text-center border border-white rounded-full p-1 px-2 text-white">
                <HugeiconsIcon icon={ArrowRight} />
              </span>
            </div>
            <HugeiconsIcon icon={Ticket} size={100} className="opacity-40" />
          </div>
          <div className="flex flex-1 flex-col">
            <p className="text-3xl">
              EXCLUSIVE APPARTMENTS JUST FOR YOUR COMFORT
            </p>
          </div>
          <p className="text-xs">
            Get just the best with top quality standard accommodation from Poem
            Booking
          </p>
        </div>
        <div className=" rounded-2xl overflow-hidden">
          <Image
            src={"/default.png"}
            alt="demo"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" flex flex-col  gap-6">
          <div className=" rounded-2xl h-44 overflow-hidden">
            <Image
              src={"/default.png"}
              alt="demo"
              width={400}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" h-44 rounded-2xl overflow-hidden">
            <Image
              src={"/default.png"}
              alt="demo"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* bus routes */}
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold">Popular Bus Routes</span>
        <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {routes.map((route, i) => (
            <div
              className="border rounded-2xl p-6 flex gap-4 flex-col shadow-md"
              key={i}
            >
              <div className="w-full flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <HugeiconsIcon icon={Bus} size={20} />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold">{route.route}</span>
                    <span className="text-[14px]">{route.description}</span>
                  </div>
                </div>
                <HugeiconsIcon icon={Heart} size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">From</span>
                <div className="w-full flex justify-between">
                  <span>{route.price} XAF</span>
                  <span className="text-[14px]">Book Now</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
