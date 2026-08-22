"use client";
import { Button } from "@/components/ui/button";
import { AmenityIcon } from "@/lib/icons";
import { RoomType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bell, Check, CircleCheck, Ruler, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const RoomContent = ({ room }: { room: RoomType }) => {
  const pathname = usePathname();
  return (
    <section className="container-x grid gap-6 grid-cols-4">
      <div className="col-span-3 flex flex-col gap-6">
        <div className="flex flex-col gap-1 pb-6 border-b border-b-border">
          <div className="flex gap-2">
            <span className="p-1 px-3 text-xs rounded-full bg-primary text-white">
              Verified Luxury
            </span>
            <div className="flex gap-1 items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon
                  icon={Star}
                  size={16}
                  className={cn("fill-yellow-500 text-yellow-500")}
                  key={i}
                />
              ))}
            </div>
          </div>
          <span className="text-3xl font-bold">{room.name}</span>
          <div className="flex gap-6 items-center">
            {[0, 1, 2].map(() => (
              <div className="flex gap-2 items-end">
                <HugeiconsIcon
                  icon={Ruler}
                  className="text-primary font-bold"
                />
                <div className="flex flex-col text-end">
                  <span className="text-muted-foreground text-[10px]">
                    TOTAL AREA
                  </span>
                  <span className="font-bold text-xl">
                    120m<sup>2</sup>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Room Overview</span>
          <div className="flex flex-col text-[14px] text-muted-foreground gap-4">
            <p>
              {room.description}
            </p>

          </div>
        </div>
        <div className="p-6 bg-bg-mute/50 rounded-2xl flex flex-col">
          <span className="text-2xl font-bold">Exclusive Amenities</span>
          <div className="w-full grid gap-4 grid-cols-2 mt-2 md:grid-cols-3">
            {room.amenities.map((amenity, i) => (
              <div className="flex items-center gap-2" key={i}>
                <div className="size-10 bg-bg-mute rounded-full flex items-center justify-center">
                  <HugeiconsIcon icon={CircleCheck} className="text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-[calc(var(--nav-height)+10px)] flex flex-col gap-6 h-[calc(100vh+9%)]">
        <div className="p-6 border border-border rounded-2xl bg-white flex flex-col ">
          <span className="text-xl font-bold">Reservation Details</span>
          <div className="mt-3 flex flex-col gap-4 text-[14px]">
            <div className="w-full justify-between items-center flex pb-3 border-b border-border">
              <span className="text-muted-foreground">Selected Room</span>
              <span className="font-bold">{room.name}</span>
            </div>
            <div className="w-full justify-between items-center flex pb-3 border-b border-border">
              <span className="text-muted-foreground">Stay Dates</span>
              <div className="flex flex-col text-end">
                <span className="font-bold">24 May - 26 May 2024</span>
                <span className="text-muted-foreground text-[9px]">
                  ( 2 nights )
                </span>
              </div>
            </div>
            <div className="w-full justify-between items-center flex pb-3 border-b border-border">
              <span className="text-muted-foreground">Buests</span>
              <span className="font-bold">2 Adults</span>
            </div>
            <div className="text-muted-foreground text-[14px]">
              <div className="flex justify-between">
                <span>Base rate ( 2 nights )</span>
                <span>1,100,000 XAF</span>
              </div>
              <div className="flex justify-between pb-4 border-b-2 border-border">
                <span>Service & Taxes</span>
                <span>100,000 XAF</span>
              </div>
              <div className="flex justify-between text-black mt-2">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-primary">
                  1,100,000 XAF
                </span>
              </div>
            </div>
            <Link href={`${pathname}/checkout`} className="w-full">
              {" "}
              <Button className={"p-6 w-full font-bold"}>
                Proceed to checkout
              </Button>
            </Link>
          </div>
        </div>
        <div className="p-6 flex text-center rounded-2xl flex-col gap-2 border items-center justify-center border-primary bg-primary/10">
          <p className="text-xs">
            Register and earn free tokens on each transaction
          </p>
          <Button className={"w-full p-4"}>Register Now</Button>
        </div>
      </div>
    </section>
  );
};
