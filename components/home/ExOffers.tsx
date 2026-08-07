import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01FreeIcons,
  ArrowRight01FreeIcons,
  Ticket,
  Umbrella,
} from "@hugeicons/core-free-icons";

export const ExclusiveOffers = () => {
  return (
    <section className="flex flex-col container-x gap-6">
      <div className="flex flex-col gap-6 md:flex-row justify-between items-center">
        <div>
          <h2>Curated Exclusive Offers</h2>
          <p>Hand pick deals from our premium partner.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className={"rounded-full"}
            size={"icon-lg"}
            variant={"outline"}
          >
            <HugeiconsIcon icon={ArrowLeft01FreeIcons} />
          </Button>
          <Button
            variant={"outline"}
            size={"icon-lg"}
            className={"rounded-full"}
          >
            <HugeiconsIcon icon={ArrowRight01FreeIcons} />
          </Button>
        </div>
      </div>
      <div className="w-full gap-6 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col text-white gap-10 p-6 bg-primary rounded-2xl">
          <div className="flex w-full justify-between">
            <span className="text-xs h-fit bg-white/20 border border-white rounded-full p-1 px-2 text-white w-fit">
              MEMBER EXCLUSIVE
            </span>
            <HugeiconsIcon
              icon={Umbrella}
              size={100}
              className="-rotate-40 opacity-20"
            />
          </div>
          <span className="w-[60%] text-3xl font-bold text-white">
            25% OFF Weekend Gateways in Limbe
          </span>
          <div className="w-full flex items-center justify-between">
            <p className="text-[14px] w-1/2">
              Enjoy the Atlantic breeze with POEM's premuim beach partners
            </p>
            <Button
              className={
                "text-primary p-6 px-8 hover:bg-gray-100 rounded-full bg-white"
              }
            >
              {" "}
              Claim Offer
            </Button>
          </div>
        </div>
        {/* second card */}
        <div className="flex flex-col text-white gap-10 p-6 bg-secondary-foreground rounded-2xl">
          <div className="flex w-full justify-between">
            <span className="text-xs h-fit bg-white/20 border border-white rounded-full p-1 px-2 text-white w-fit">
              TRAVEL ALERT
            </span>
            <HugeiconsIcon icon={Ticket} size={100} className=" opacity-20" />
          </div>
          <span className="w-[60%] text-3xl font-bold text-white">
            VIP Bus Loyalty rewards are Here.
          </span>
          <div className="w-full flex items-center justify-between">
            <p className="text-[14px] w-1/2">
              Earn points on every trip between Yaounde & Douala
            </p>
            <Button className={"text-white p-6 px-8 rounded-full"}>
              {" "}
              Claim Offer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
