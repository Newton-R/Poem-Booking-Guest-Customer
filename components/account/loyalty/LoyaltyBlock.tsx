import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Money, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AllHistory } from "./HistoryBlock";
const PointsRedeemCard = () => {
  return (
    <div className="flex flex-col h-70 bg-white rounded-2xl overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Image
          src={"/default.png"}
          alt="i"
          className="w-full h-full object-cover "
          width={300}
          height={300}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <span className="font-bold">Airport Lounge Pass</span>
          <span className="text-primary">300px</span>
        </div>
        <p className="text-muted-foreground">
          International departure lounge entry.
        </p>
        <Button
          className={"w-full text-primary border-primary p-4"}
          variant={"outline"}
        >
          REDEEM
        </Button>
      </div>
    </div>
  );
};
export const LoyaltyBlock = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="p-6 rounded-2xl bg-secondary-foreground text-white flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex text-xs flex-col gap-1">
            <span className="p-1 px-2 rounded-full text-white bg-white/20">
              POEM POINTS SYSTEM
            </span>
            <span className="opacity-60">Current Balance</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/30 flex items-center justify-center">
            <HugeiconsIcon
              icon={Star}
              className="fill-secondary-foreground text-secondary-foreground"
              size={20}
            />
          </div>
        </div>
        <span className="flex gap-1 text-xs items-end text-primary">
          <span className="text-2xl md:text-4xl font-bold">245</span>
          FCFA
        </span>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span className="text-primary flex gap-0.5 items-end">
            <span className="text-2xl md:text-4xl font-bold">2,450</span>
            <span>XP POINTS</span>
          </span>
          <div className="flex gap-2 flex-col items-center md:flex-row">
            <Button className={"p-5"}>Redeem Points</Button>
            <Button
              className={"p-5 hover:text-white bg-white/45 border border-white"}
              variant={"outline"}
            >
              How it works
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-6">
        <Tabs className="flex flex-col gap-4 col-span-3">
          <div className="flex justify-between items-center gap-2">
            <span className="font-bold text-xl">Points History</span>
            <Link href={"/account/loyalty/history"}>
              <Button variant={"link"}>View full Details</Button>
            </Link>
          </div>
          <AllHistory />
        </Tabs>
        <div className="flex flex-col gap-6 col-span-1 md:col-span-2">
          <span className="text-xl font-bold">Redeem Points</span>
          {/* <HotelPointsCard /> */}
          <PointsRedeemCard />
          <PointsRedeemCard />

          <div className="border-2 rounded-xl bg-primary/20 items-center justify-center border-dashed border-primary p-6 flex flex-col gap-4">
            <HugeiconsIcon
              icon={Money}
              size={30}
              className="font-bold text-primary"
              strokeWidth={2}
            />
            <span>2,000 XAF Credit</span>
            <p className="text-xs text-muted-foreground">
              Convert XP to your booking wallet.
            </p>
            <span className="text-primary my-2">500 XP</span>
            <Button className={"p-4 w-full"}>Convert Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
