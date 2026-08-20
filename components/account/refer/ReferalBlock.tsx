import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Copy,
  Filter,
  Gift,
  Share,
  UserCheck,
} from "@hugeicons/core-free-icons";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

interface StepsCard {
  icon: IconSvgObject;
  number: number;
  description: string;
  heading: string;
}

const StepsCard = ({ icon, number, description, heading }: StepsCard) => {
  return (
    <div
      className={cn(
        "bg-bg-mute/50 text-[14px] p-6 items-center justify-center rounded-2xl flex flex-col gap-2",
        number === 2 && "border-t-2 border-primary",
      )}
    >
      <div className="w-10 h-10 mb-4 flex items-center justify-center bg-primary/30 rounded-full">
        {number}
      </div>
      <HugeiconsIcon
        icon={icon}
        size={40}
        className="text-primary"
        strokeWidth={2}
      />
      <span>{heading}</span>
      <p className="text-xs text-muted-foreground text-center">{description}</p>
    </div>
  );
};

export const ReferalBlock = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 bg-secondary-foreground text-white flex flex-col gap-6 md:flex-row rounded-2xl">
        <div className="flex flex-col gap-2">
          <span className="text-primary font-bold">SHARE THE JOURNEY</span>
          <h1 className="mt-2 text-3xl font-bold">
            Earn Rewards for Every Referral
          </h1>
          <p className="text-xs text-muted-foreground">
            Spread the word about POEM Booking and unlock exclusive travel
            benefits for you and your friends.
          </p>
        </div>
        <div className="border border-white/35 w-full md:w-[45%] flex rounded-2xl text-white flex-col items-center justify-center gap-5 p-6 bg-white/10">
          <span className="opacity-70">YOUR UNIQUE PROMO CODE</span>
          <div className="border border-primary/15 bg-white/20 text-2xl flex items-center gap-2 rounded-md p-2">
            <span className="shrink-0 font-bold">POEM-GOLD-2024</span>
            <Button size={"icon-lg"}>
              <HugeiconsIcon icon={Copy} size={20} />
            </Button>
          </div>
          <span className="text-xs opacity-70">SHARE VIA</span>
          <div className="flex gap-3 items-center">social media links here</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 justify-center">
        <span className="pb-2 border-b-2 border-primary mb-4">
          How it works
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepsCard
            icon={Share}
            number={1}
            heading="Share your code"
            description="Send your unique code to
friends via social media or
email."
          />
          <StepsCard
            icon={UserCheck}
            number={2}
            heading="Friend signs up"
            description="Your friend creates an account
and completes their first
booking."
          />
          <StepsCard
            icon={Gift}
            number={3}
            heading="Both earn 500 XP"
            description="Instant reward points added to
both your accounts upon
confirmation."
          />
        </div>
      </div>
      <div className="border border-border rounded-2xl bg-white overflow-hidden flex flex-col">
        <div className="w-full flex items-center p-6 justify-between gap-6">
          <span>Referral History</span>
          <Button variant={"outline"} className={"p-4"}>
            <HugeiconsIcon icon={Filter} size={18} />
            Filter by Status
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-xl w-full">
            <thead>
              <tr className="bg-primary/40 text-xs ">
                <td className="p-6">DATE</td>
                <td>FRIEND NAME</td>
                <td>STATUS</td>
                <td>REWARDS EARNED</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-6">Oct 25, 2023</td>
                <td className="p-6">M*** B***</td>
                <td>
                  <div className="flex gap-2 w-fit items-center p-1 text-xs font-bold rounded-full text-green-500 bg-green-500/40 px-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Completed Booking</span>
                  </div>
                </td>
                <td>
                  <span className="text-muted-foreground font-bold">
                    500 XP
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
