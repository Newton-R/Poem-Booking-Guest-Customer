"use client";
import { EmptyBlock } from "@/components/emptystuff";
import { ReferalBlockSkeleton } from "@/components/loaders/account/referalBlock";
import { Button } from "@/components/ui/button";
import { useGetReferalCode } from "@/lib/bearer/useGetReferalCode";
import { cn } from "@/lib/utils";
import {
  Copy,
  Filter,
  Gift,
  HandshakeFreeIcons,
  Share,
  Tick,
  UserCheck,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { format } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";

interface StepsCard {
  icon: IconSvgElement;
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
  const { data, isLoading, isError, refetch } = useGetReferalCode();
  const [copied, setCopy] = useState<boolean>(false);

  if (isLoading) {
    return <ReferalBlockSkeleton />;
  }

  if (!data || isError) {
    return (
      <EmptyBlock
        refetch={() => refetch()}
        icon={HandshakeFreeIcons}
        title="Error"
        description="Something went wrong getting referral data."
      />
    );
  }

  const promoData = data.data;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoData.referralLink);
      setCopy(true);
      toast.success("Promo code link copied");
      setTimeout(() => setCopy(false), 2000);
    } catch {
      toast.error("Couldn't copy the code");
    }
  };
  console.log({ data });
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
        <div className="border border-white/35 w-full md:w-[45%] flex rounded-2xl text-white flex-col items-center justify-center gap-2 p-4 bg-white/10">
          <span className="opacity-70">YOUR UNIQUE PROMO CODE</span>
          <div className="border border-primary/15 bg-white/20 text-xl md:text-2xl flex items-center gap-1 rounded-md p-2">
            <span className="shrink-0 font-bold">{promoData.code}</span>
            <Button onClick={() => handleCopy()} size={"icon-lg"}>
              {copied ? (
                <HugeiconsIcon icon={Tick} size={20} />
              ) : (
                <HugeiconsIcon icon={Copy} size={20} />
              )}
            </Button>
          </div>
          {/* <span className="text-xs opacity-70">SHARE VIA</span> */}
          <div className="flex gap-3 items-center">
            <span>1 Referral =</span>
            <span className="text-primary">
              {promoData.rules.pointsPerReferral}xp
            </span>
          </div>
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
      {promoData.referrals.length === 0 ? (
        <EmptyBlock
          variant="ghost"
          icon={HandshakeFreeIcons}
          title="No Referrals"
          description="Sorry. You currently don't seem to have any refferals. Try sharing your referral link."
        />
      ) : (
        <div className="border border-border rounded-2xl bg-white overflow-hidden flex flex-col">
          <div className="w-full flex items-center p-6 justify-between gap-6">
            <span className="shrink-0">Referral History</span>
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
                {promoData.referrals.map((referral, i) => (
                  <tr key={i}>
                    <td className="p-6">
                      {format(referral.qualifiedAt, "MMM d, YYYY")}
                    </td>
                    <td className="p-6">{referral.refereeName}</td>
                    <td>
                      <div
                        className={cn(
                          "flex gap-2 w-fit items-center p-1 text-xs font-bold rounded-full px-2",
                          referral.status === "qualified"
                            ? " text-green-500 bg-green-500/40"
                            : " text-yellow-500 bg-yellow-500/40",
                        )}
                      >
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full ",
                            referral.status === "qualified"
                              ? "bg-green-500"
                              : "bg-yellow-500",
                          )}
                        />
                        <span className="first-letter:uppercase">
                          {referral.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-muted-foreground font-bold">
                        {referral.pointsAwarded} XP
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
