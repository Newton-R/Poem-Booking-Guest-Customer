import React from "react";
import { DashIntro } from "../DashIntro";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar, CircleCheck } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BookingHistoryCard = () => {
  return (
    <div className="p-6 rounded-xl border bg-white border-border grid grid-cols-3 gap-5">
      <div className="rounded-xl overflow-hidden h-40">
        <Image
          src={"/restau.jpg"}
          width={400}
          height={400}
          alt="Img"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <div className="flex justify-between flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-3">
            <span className="text-xs w-fit bg-bg-mute p-1 px-2 rounded-md">
              RESTAURANT
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold">FUFU AND ERU</span>
              <span className="text-xs flex items-center gap-2 text-muted-foreground">
                <HugeiconsIcon icon={Calendar} size={16} />
                Nov 12, 2024
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <span className="text-xs flex gap-1 items-center p-1 px-2 rounded-full bg-green-500/30 h-fit text-green-500">
              <HugeiconsIcon
                icon={CircleCheck}
                className="fill-green-500 text-white"
                size={12}
              />
              Confirmed
            </span>
            <div className="flex flex-col gap-0.5 text-end">
              <span className="text-xs text-muted-foreground">TOTAL PRICE</span>
              <span className="text-xl font-bold">12,000 XAF</span>
            </div>
          </div>
        </div>
        <div className="flex mt-4 justify-between items-center gap-4">
          <Link href={"/account/booking/2"}>
            <Button className={"p-4 w-40 rounded-md"}>VIEW RECIEPT</Button>
          </Link>

          <Link href={"/account/booking/2"}>
            <Button variant={"link"} className={"text-[14px]"}>
              Download Receipt
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AllBookingBlock = () => {
  return (
    <main className="flex flex-col gap-6">
      <DashIntro
        heading={"My Bookings"}
        description={"Manage your curated travel experiences across Cameroon."}
      />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <BookingHistoryCard key={i} />
        ))}
      </div>
    </main>
  );
};
