"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SeatPicker from "@/components/ui/SeatPicker";
import { cn } from "@/lib/utils";
import {
  Alert01FreeIcons,
  ArrowLeft,
  ArrowRight,
  Bus,
  CircleAlert,
  DotIcon,
  Shield,
  WheelchairFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React, { useState } from "react";

export const RouteDetailsBlock = () => {
  const Ranges = ["All", "VIP", "Classic"];
  const Filters = [
    {
      value: "selected",
      label: "Selected",
    },
    {
      value: "available",
      label: "Available",
    },
    {
      value: "occupied",
      label: "Occupied",
    },
  ];
  const [selected, setSelected] = useState(true);
  const paymenticons = [
    {
      label: "",
      icon: "/icon/om.png",
    },
    {
      label: "",
      icon: "/icon/mtn.png",
    },
    {
      label: "",
      icon: "/icon/poempay.png",
    },
    {
      label: "",
      icon: "/icon/visa.png",
    },
  ];

  const policies = [
    "VIP tickets include refreshment and priority boarding.",
    "Classic seats offer full air-conditioning and movies.",
    "Arrive 45 mins early for luggage tagging.",
  ];
  return (
    <main className="container-x flex flex-col mt-(--nav-height) gap-20">
      <div className="p-6 w-full rounded-2xl bg-bg-mute/50 flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-primary flex gap-1.5 text-[14px]">
            <HugeiconsIcon icon={Bus} size={20} className="text-primary" />
            Trip Selection
          </span>
          <span className="text-2xl font-bold mt-4">Douala to Yaounde</span>
          <p className="text-xs text-muted-foreground">
            Oct 24, 2024 • 08:30 AM • Finexs Voyages
          </p>
        </div>
        <div className="bg-white flex gap-2 p-2 rounded-xl">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary-foreground text-white">
            <HugeiconsIcon
              icon={Shield}
              className="font-bold"
              strokeWidth={1}
            />
          </div>
          <div className="flex flex-col ">
            <span className="text-xs text-muted-foreground">Operator</span>
            <span className="font-bold">Finexs VIP Class (70 Seater)</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="flex flex-col col-span-3 gap-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Select your seat</span>
              <span className="text-muted-foreground text-xs">
                70-Seater Executive Coach
              </span>
            </div>
            <div className="flex bg-bg-mute rounded-md overflow-hidden text-xs">
              {Ranges.map((range, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-2 px-4",
                    i === 0 ? "text-white bg-secondary-foreground" : "",
                  )}
                >
                  {range}
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {Filters.map((filte, i) => (
                <div
                  key={i}
                  className="flex text-muted-foreground gap-1 items-center text-xs"
                >
                  <Input type="checkbox" value={filte.value} />
                  <span>{filte.label}</span>
                </div>
              ))}
            </div>
          </div>
          <SeatPicker
            layout={{
              totalRows: 14,
              leftCount: 2,
              rightCount: 3,
              backDoorAfterSeat: 60,
              price: 15,
            }}
            bookedSeats={[1, 2, 60]}
            maxSelectable={3}
            onConfirm={(seats) => console.log(seats)}
          />
          <div className="p-6 bg-bg-mute/50 flex rounded-2xl gap-2">
            <div className=" h-fit w-fit p-2 bg-destructive/5 flex items-center justify-center rounded-full text-destructive">
              <HugeiconsIcon icon={Alert01FreeIcons} size={25} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Cancellation Policy</span>
              <p className="text-xs text-muted-foreground">
                Life happens. If you need to cancel your trip, please note that{" "}
                <span className="text-destructive">
                  10% of the fare will be deducted
                </span>{" "}
                as a processing fee. Cancellations are valid until 2 hours
                before scheduled departure.
              </p>
            </div>
          </div>
        </div>
        <div className="sticky top-[calc(var(--nav-height)+10px)] flex flex-col gap-6 h-[calc(100vh+9%)]">
          <div className="flex h-fit flex-col gap-6 p-6 bg-white border-border border rounded-2xl">
            <span className="font-bold">Booking Details</span>
            <div className="flex flex-1 flex-col justify-center gap-1.5">
              {selected ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col pb-2 border-b border-border">
                    <span className="text-xs text-primary font-black">
                      Route
                    </span>
                    <span className="text-xs font-bold">Douala to Yaounde</span>
                  </div>
                  <div className="flex flex-col pb-2 border-b border-border">
                    <span className="text-xs">Selected Seats</span>
                    <span className="text-xs font-bold p-2 border-border flex items-center justify-center border rounded-md w-10 mt-2 text-primary bg-primary/10">
                      1
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-border">
                    <span className="text-xs ">Price / seat</span>
                    <span className="text-xs font-bold">6,500 XAF</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-muted-foreground">
                        Total Amount
                      </span>
                      <div className="text-end flex-col flex">
                        <span className="text-[10px] text-primary">
                          ESTIMATED
                        </span>
                        <span className="font-bold">12,000 XAF</span>
                      </div>
                    </div>
                    <Button className={"p-6 my-4 w-full"}>
                      Confirm & Proceed <HugeiconsIcon icon={ArrowRight} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center flex-1 justify-center gap-3">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/5 text-primary">
                    <HugeiconsIcon icon={WheelchairFreeIcons} size={24} />
                  </div>
                  <p className="text-muted-foreground text-xs text-center">
                    No seats selected. Choose from VIP or Classic zones on the
                    70- seater map.
                  </p>
                </div>
              )}
              <div className="flex w-full justify-between mt-auto">
                {paymenticons.map((icon, i) => (
                  <div className=" opacity-75" key={i}>
                    <Image
                      src={icon.icon}
                      width={30}
                      height={30}
                      alt={icon.label}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col p-6 text-white rounded-2xl bg-secondary-foreground">
            <span className="font-bold flex items-center gap-2">
              <HugeiconsIcon
                icon={CircleAlert}
                className="text-primary"
                size={15}
              />
              Trip Policies
            </span>
            <div className="mt-2 text-xs flex flex-col gap-2">
              {policies.map((policy, i) => (
                <span className="flex opacity-75" key={i}>
                  <HugeiconsIcon icon={DotIcon} size={30} />
                  <span className="text-[12px]">{policy}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="p-6 flex text-center rounded-2xl flex-col gap-2 border items-center justify-center border-primary bg-primary/10">
            <p className="text-xs">
              Register and earn free tokens on each transaction
            </p>
            <Button className={"w-full p-4"}>Register Now</Button>
          </div>
        </div>
      </div>
    </main>
  );
};
