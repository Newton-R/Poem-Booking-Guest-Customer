import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentFormLink } from "@/components/ui/paymentformlink";
import { Lock, Shield, ShieldCheck } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const VisaBlock = () => {
  return (
    <div className="container-x p-4 flex items-center flex-col gap-3 justify-center">
      <div className="w-full max-w-md mx-auto flex-col gap-4 items-start">
        <PaymentFormLink />
        <form className="border border-border shrink-0 flex flex-col gap-6 p-6">
          <div className="flex flex-col">
            <span>Payment Details</span>
            <p className="text-[14px] text-muted-foreground">
              Complete your booking for POEM Booking
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              className="p-6 rounded-none px-4 border border-border"
              placeholder="Card Holder Name"
            />
            <div className="flex flex-col gap-0.5">
              <Input
                className="p-6 rounded-none px-4 border border-border"
                placeholder="Card Holder Number"
              />
              <div></div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <Input
                type="date"
                placeholder="Expiry Date"
                className="p-6 rounded-none flex-1 px-4 border border-border"
              />
              <Input
                className="p-6 rounded-none flex-1 px-4 border border-border"
                placeholder="CVV"
                type="number"
              />
            </div>
          </div>
          <div className="mt-4 flex-col flex gap-6">
            <div className="flex items-center justify-between w-full">
              <span className="text-muted-foreground text-[14px]">
                Total to pay
              </span>
              <span className="text-primary">398,000 XAF</span>
            </div>
            <Button className={"text-[14px] p-6 w-full"}>
              <HugeiconsIcon icon={Shield} size={30} />
              Pay Now
            </Button>
            <div className="flex gap-4 mt-2 items-center justify-center">
              <span className="flex mt-2 mx-auto gap-1 items-center text-muted-foreground text-[10px]">
                <HugeiconsIcon icon={ShieldCheck} size={15} />
                SSL ENCRYPTED
              </span>
              <span className="flex mt-2 mx-auto gap-1 items-center text-muted-foreground text-[10px]">
                <HugeiconsIcon icon={ShieldCheck} size={15} />
                PCI COMPLAINT
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
