import React from "react";
import { Button } from "../ui/button";

export const VIPBlock = () => {
  return (
    <section className="container-x rounded-2xl flex justify-between items-center">
      <div className="w-full p-6 px-8 py-12 bg-secondary-foreground text-white rounded-2xl flex justify-between items-center">
        <div className="flex flex-1 w-full max-w-[400px] flex-col gap-2">
          <div className="p-1 px-4 w-fit bg-primary text-xs rounded-full">
            MEMBER EXCLUSIVE
          </div>
          <span className="text-2xl font-bold opacity-35">
            VIP Loyalty Rewards
          </span>
          <p className="text-muted-foreground text-[14px]">
            Earn 2x points on all bus bookings between Douala and Yaoundé.
            Redeem points for free snacks, extra legroom, and priority boarding.
          </p>
          <Button className={"p-6 rounded-full w-fit"}>Join VIP Club</Button>
        </div>
        <div className="flex gap-6 items-center">
          <div className="bg-white/10 p-4 rounded-md flex flex-col text-center">
            <span className="text-xl text-primary">10%</span>
            <span>Off first trip</span>
          </div>
          <div className="bg-white/10 p-4 rounded-md flex flex-col text-center">
            <span className="text-xl text-primary">500+</span>
            <span>Daily routes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
