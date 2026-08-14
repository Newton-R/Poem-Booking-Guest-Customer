import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Controller,
  Lock,
  Payment01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export const CheckoutFormBlock = () => {
  const paymentMethods = [
    {
      icon: "",
      name: "Poempay",
      label: "Get 3% discount",
    },
    {
      icon: "",
      name: "Poempay",
      label: "Get 3% discount",
    },
    {
      icon: "",
      name: "Poempay",
      label: "Get 3% discount",
    },
    {
      icon: "",
      name: "Poempay",
      label: "Get 3% discount",
    },
  ];
  return (
    <section className="mt-[calc(var(--nav-height)+10px)] container-x flex flex-col gap-2">
      <h2>Complete your reservation</h2>
      <div className="grid grid-cols-5 mt-4 gap-6">
        <div className="col-span-3 flex flex-col gap-6">
          <div className="p-6 bg-bg-mute rounded-2xl">
            <span className="flex gap-2 items-center mb-4">
              <div className="size-8 bg-secondary-foreground flex items-center justify-center rounded-md text-white">
                <HugeiconsIcon icon={Controller} size={16} />
              </div>
              Guest Details
            </span>
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Input placeholder="FullName" className="p-6 bg-white" />
              </div>
              <div className="flex justify-between gap-4">
                <Input placeholder="FullName" className="p-6 bg-white flex-1" />
                <Input placeholder="FullName" className="p-6 bg-white flex-1" />
              </div>
              <div className="flex pb-3 border-b border-border flex-col gap-1">
                <Input
                  placeholder="Promotional Code"
                  className="p-6 bg-white"
                />
              </div>
              <div className="flex gap-3 flex-col">
                <p className="text-xs text-muted-foreground">
                  How should we send your booking reminders and checkups?
                </p>
                <div className="flex  text-[14px] items-center gap-2">
                  {["Email", "SMS", "Whatsapp"].map((service, i) => (
                    <span
                      className={cn(
                        "p-2 px-4 rounded-full",
                        i === 0 ? "bg-primary" : "",
                      )}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Input placeholder="Whatsapp Number" className="p-6 bg-white" />
                <div className="flex items-center gap-2 mt-2">
                  <Input type="checkbox" className="w-4 h-4" value={""} />
                  <span className="text-xs text-muted-foreground">
                    Same as phone number
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="p-6 bg-bg-mute rounded-2xl flex flex-col gap-6">
            <span className="flex gap-2 items-center mb-4">
              <div className="size-8 bg-secondary-foreground flex items-center justify-center rounded-md text-white">
                <HugeiconsIcon
                  icon={Payment01FreeIcons}
                  className="opacity-55"
                  size={16}
                />
              </div>
              Payment Method
            </span>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">
                Select your preferred secure payment provider. All transactions
                are encrypted.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                {paymentMethods.map((method, i) => (
                  <div
                    key={i}
                    className="flex items-center flex-1 w-full justify-between bg-white/60 rounded-md p-4 gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md overflow-hidden"></div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold">{method.name}</span>
                        <p className="text-xs text-muted-foreground">
                          {method.label}
                        </p>
                      </div>
                    </div>
                    <Input type="checkbox" className="w-4 h-4 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex flex-col rounded-2xl border border-border shadow-md gap-4">
            <div></div>
            <div className="flex flex-col gap-2 p-6">
              <div className="grid-cols-2 grid gap-3 pb-4 border-b border-border">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px]">
                    CHECK IN
                  </span>
                  <span className="font-bold">Thu, Dec 12, 2024</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px]">
                    CHECK OUT
                  </span>
                  <span className="font-bold">Sun, Dec 15, 2024</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px]">
                    TRAVELERS
                  </span>
                  <span className="font-bold">2 Adults, 1 Junior Suite</span>
                </div>
              </div>
              <div className="flex mt-3 flex-col gap-2 text-[14px]">
                <span className="text-xs font-semibold mb-4">
                  PRICE BREAKDOWN
                </span>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>3 Nights x 125,000 XAF</span>
                    <span>375,000 XAF</span>
                  </div>
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>Local Tourism Tax</span>
                    <span>375,000 XAF</span>
                  </div>
                  <div className="flex border-b-2 border-primary pb-3 justify-between w-full text-muted-foreground items-center">
                    <span>Service Fee</span>
                    <span>375,000 XAF</span>
                  </div>
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>Total payable</span>
                    <div className="flex flex-col text-end">
                      <span className="text-xl font-bold text-primary">
                        375,000 XAF
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        All taxes included
                      </span>
                    </div>
                  </div>
                  {/* continue button */}
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <Button className={"p-6 w-full text-[14px]"}>
                      Complete Booking{" "}
                      <HugeiconsIcon icon={ArrowRight} size={20} />
                    </Button>
                    <span className="flex mt-2 gap-1 items-center text-muted-foreground text-[10px]">
                      <HugeiconsIcon icon={Lock} size={10} />
                      Secure 256-bit SSL Encrypted Connection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 flex text-center rounded-2xl flex-col gap-2 border items-center justify-center border-primary bg-primary/10">
            <p className="text-xs">
              Register and earn free tokens on each transaction
            </p>
            <Button className={"w-full p-6"}>Register Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
