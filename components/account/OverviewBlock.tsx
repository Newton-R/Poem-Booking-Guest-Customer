import { Location, Pen, PlusSignCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";

const HotelBookingsCard = () => {
  return (
    <div className="h-95 flex flex-col bg-white rounded-2xl overflow-hidden">
      <div className="flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 p-6">
          <div className="flex justify-between items-center text-xs">
            <span className="bg-secondary-foreground text-white p-1 px-2 rounded-full">
              Hotal
            </span>
            <span className="bg-white/70 p-1 px-2 rounded-full">
              UPCOMING · MAY 12
            </span>
          </div>
        </div>
        <Image
          src={"/default.png"}
          width={500}
          height={500}
          className="w-full h-full object-cover"
          alt="Image"
        />
      </div>
      <div className="flex flex-col p-6 py-4">
        <div className="flex justify-between mb-4 pb-4 border-b border-border items-center">
          <div className="flex flex-col gap-0.5">
            <span className="text-2xl font-bold">Atlantic Bay Resort</span>
            <span className="text-xs text-muted-foreground flex items-center gap-2">
              <HugeiconsIcon icon={Location} size={12} />
              <span>Limbe, Cameroon</span>
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-bold">XAF 125,000</span>
            <span className="text-xs text-muted-foreground flex items-center gap-2">
              TOTAL PRICE
            </span>
          </div>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-4 text-[16px]">
          <Button className={"p-6 flex-1"}>VIEW DETAILS</Button>
          <Button className={"p-6"} variant={"outline"}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AccountOverviewBlock = () => {
  return (
    <section className="w-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
        <div className="flex flex-col gap-1">
          <h1 className="md:text-4xl text-2xl font-bold">Hello, Amadou.</h1>
          <p className="text-muted-foreground text-[14px]">
            Welcome back to your Poem Booking portal.
          </p>
        </div>
        <div className="bg-bg-mute p-1 px-2 text-xs rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Account Active</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl col-span-2 flex flex-col gap-6">
          <div className="flex justify-between items-center gap-4">
            <span className="text-xl font-bold">Personal Details</span>
            <span className="flex gap-1 items-center text-xs text-primary">
              <HugeiconsIcon icon={Pen} size={18} />
              EDIT INFO
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-light">FULL NAME</span>
              <span className="font-bold">Amadou Aboubakar</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-light">EMAIL ADDRESS</span>
              <span className="font-bold">amadou.travels@domain.cm</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-light">NATIONALITY</span>
              <span className="font-bold">Cameroonian</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-light">PHONE NUMBER</span>
              <span className="font-bold">677 889 001</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-light">PREF. LANGUAGE</span>
              <span className="font-bold">French (FR)</span>
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4 bg-bg-mute rounded-2xl ">
          <span className="text-xl font-bold">Support Hub</span>
          <div className="bg-white p-4 border-l-3 border-primary flex flex-col gap-4 rounded-md">
            <div className="flex justify-between text-[14px] items-center">
              <span className="text-primary">Active Ticket</span>
              <span className="text-muted-foreground">#ST-8821</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold">Buses to Kribi Delay</span>
              <p className="text-xs text-muted-foreground">
                Agent 'Jean' is reviewing your refund request for ticket
                #8821...
              </p>
            </div>
          </div>
          <Button variant={"outline"} className={"p-6 w-full text-[16px]"}>
            New Support Ticket{" "}
            <HugeiconsIcon icon={PlusSignCircleIcon} size={18} />
          </Button>
        </div>
      </div>
      <Tabs defaultValue={"upcoming"}>
        <section className="flex flex-col gap-4">
          <div className="w-full flex justify-between items-center    ">
            <h2>My Journeys</h2>
            <TabsList>
              <TabsTrigger value={"upcoming"}>Upcoming</TabsTrigger>
              <TabsTrigger value={"past"}>Past</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={"upcoming"} className={"grid grid-cols-2 gap-6"}>
            <HotelBookingsCard />
            <HotelBookingsCard />
          </TabsContent>
          <TabsContent value={"past"} className={"grid grid-cols-2 gap-6"}>
            <HotelBookingsCard />
            <HotelBookingsCard />
            <HotelBookingsCard />
            <HotelBookingsCard />
          </TabsContent>
        </section>
      </Tabs>
    </section>
  );
};
