"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Calendar,
  CircleCheck,
  Download,
  Money,
  Payment01Icon,
  Printer,
  User,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MealReciept = () => {
  return (
    <div className="border border-border bg-white w-full flex flex-col rounded-xl">
      <div className="p-6 flex justify-between items-start gap-4 flex-col md:flex-row">
        <div className="flex flex-col gap-0.5">
          <span className="text-3xl font-bold">Receipt</span>
          <span className="text-muted-foreground text-[14px]">
            POEM FOOD CAMEROON
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className=" font-bold">#PF-88294-DLA</span>
          <span className="text-muted-foreground text-xs">
            October 24, 2024
          </span>
        </div>
      </div>
      <div className="p-6 w-full grid grid-cols-1 text-[14px] border-t border-b border-border text-muted-foreground md:grid-cols-2 gap-4 bg-blue-50/50">
        <div className="flex flex-col gap-5 border-r border-border">
          <span className="font-bold">Delivery Details</span>
          <div className="flex flex-col gap-0.5">
            <span className=" text-black font-bold">Jean-Marc Tchakounté</span>
            <span>
              Appt 42, Residence Horizon South, Bonamoussadi, Douala, Cameroon
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5 ">
          <span className="font-bold">Restaurant Details</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] text-black font-bold">
              The Saharan Bistro
            </span>
            <span>Merchant ID: TS-992-BISTRO</span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={CircleCheck} size={12} />
              Authentic Cameroonian Cuisine
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 text-[16px] p-6">
        <span className="text-xs text-muted-foreground font-bold">
          Order Details
        </span>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full text-[16px] items-start flex justify-between"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-bold">Bissap Juice</span>
                <span className="text-xs text-muted-foreground">
                  Large Portion
                </span>
              </div>
              <span className="font-bold">12,000 XAF</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="p-6 bg-blue-50 flex flex-col rounded-xl gap-4">
          <div className="w-full justify-between items-center flex text-xs text-muted-foreground">
            <span>Sub Total</span>
            <span>6,500 XAF</span>
          </div>
          <div className="w-full justify-between items-center flex text-xs text-muted-foreground">
            <span>Sub Total</span>
            <span>6,500 XAF</span>
          </div>
          <div className="w-full pt-3 border-t border-border text-2xl justify-between items-center flex text-muted-foreground">
            <span>Total</span>
            <span className="font-bold text-primary">6,500 XAF</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex items-center justify-between flex-col md:flex-row">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 rounded-full bg-primary/50 flex items-center justify-center text-secondary-foreground">
            <HugeiconsIcon icon={Payment01Icon} size={18} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              Payment Method
            </span>
            <span className="font-bold">Orange Money</span>
          </div>
        </div>
        <div className="flex gap-2 items-center flex-col md:flex-row">
          <Button variant={"outline"} className={"p-4"}>
            <HugeiconsIcon icon={Printer} size={16} />
            Print Receipt
          </Button>
          <Button className={"p-4"}>
            <HugeiconsIcon icon={Download} size={16} />
            Download Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

const BusReciept = () => {
  return (
    <div className="flex items-center w-full justify-center flex-col gap-6">
      <div className="border shadow-md border-border bg-white text-[14px] gap-6 w-full flex flex-col p-8 rounded-xl">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">
              Electronic Booking Receipt
            </span>
            <p className="text-muted-foreground">
              Thank you for travelling with POEM
            </p>
          </div>
          <span className="text-xs flex gap-1 items-center p-1 px-2 rounded-full bg-green-500 text-white">
            <HugeiconsIcon
              icon={CircleCheck}
              size={12}
              className="text-green-500 fill-white"
            />
            PAID
          </span>
        </div>
        <div className="gap-6 grid grid-cols-1 pb-6 border-b border-border md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="small-mute">RECEIPT NUMBER</span>
            <span className="text-xl font-bold">REC-BUS-5521</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="small-mute">CUSTOMER NAME</span>
            <span className="">Marc-Aurèle Tchangue</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="small-mute">DATE OF ISSUE</span>
            <span className="">Sep 28, 2024</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="small-mute">EMAIL ADDRESS</span>
            <span className="">newton4raul@gmail.com</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="small-mute">PAYMENT METHOD</span>
            <span className="">MTN MoMo</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex gap-1 items-center">
            <HugeiconsIcon icon={Bus} size={18} className="text-primary" />
            Trip Summary
          </span>
          <div className="flex justify-between p-6 rounded-2xl bg-primary/30">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">ROUTE</span>
              <span className="font-bold flex items-center gap-2">
                Douala <HugeiconsIcon icon={ArrowRight} size={10} /> Yaounde
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">
                DEPARTURE DATE
              </span>
              <span className="font-bold">Sep 28, 2024</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">
                SEAT ALLOCATION
              </span>
              <span className="p-1 px-2 w-fit bg-black rounded-sm text-white">
                12 - VIP
              </span>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t flex flex-col gap-4 border-border">
          <div className="flex items-center text-muted-foreground justify-between w-full">
            <span>Ticket Base Fare</span>
            <span>15,000 XAF</span>
          </div>
          <div className="flex items-center text-muted-foreground justify-between w-full">
            <span>Booking & Service Fee</span>
            <span>1,500 XAF</span>
          </div>

          <div className="p-6 mt-2 bg-secondary-foreground rounded-2xl text-white flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="opacity-80">TOTAL AMOUNT PAID</span>
              <span className="text-3xl">16,500 XAF</span>
            </div>
            <div className="rounded-full w-10 h-10 bg-white/20 flex items-center justify-center">
              <HugeiconsIcon
                icon={Money}
                size={27}
                className="text-secondary-foreground fill-primary"
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col md:flex-row gap-4">
          <Button className={" p-6 rounded-md flex-1"}>
            <HugeiconsIcon icon={Download} size={16} />
            Download PDF
          </Button>
          <Button variant={"outline"} className={" p-6 rounded-md flex-1"}>
            <HugeiconsIcon icon={Printer} size={16} />
            Print Receipt
          </Button>
        </div>
      </div>
      <p className="text-[12px] text-center text-muted-foreground w-[90%] md:w-[75%]">
        Please present this electronic receipt or a printed copy at the terminal
        30 minutes before departure.
      </p>
    </div>
  );
};

const HotelReciept = () => {
  return (
    <div className="flex items-center overflow-hidden w-full text-[14px] justify-center bg-white shadow-md rounded-2xl flex-col ">
      <div className="flex justify-between items-center gap-6 w-full p-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-xl font-bold">Payment Receipt</span>
          <p className="text-muted-foreground text-xs">
            Thank you for choosing POEM Booking for your stay at Kribi.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2.5">
          <span className="text-[10px] bg-primary p-1 px-2 rounded-full">
            PAID IN FULL
          </span>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">RECEIPT NO</span>
            <span className="font-bold">REC-8821-4490</span>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 bg-bg-mute/30 border-y border-border w-full gap-6 grid-cols-1">
        <div className="flex flex-col gap-2 p-4 md:p-6 border-r border-border">
          <span className="text-xs text-muted-foreground">DATE OF ISSUE</span>
          <span className="font-bold">October 12, 2024</span>
        </div>
        <div className="flex flex-col gap-2 p-4 md:p-4">
          <span className="text-xs text-muted-foreground">CUSTOMER</span>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold">AMADOU MUSA</span>
            <span className="text-muted-foreground">adamoumusa@gmail.com</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 p-4 md:p-6 border-l border-border">
          <span className="text-muted-foreground text-xs">PAYMENT METHOD</span>
          <div className="flex gap-2 items-center">
            {/* <Image/> */}
            <div className="flex text-xs flex-col gap-0.5">
              <span className="font-bold">MTN Mobile Money</span>
              <span className="text-muted-foreground">******455</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full p-6">
        <div className="flex flex-col w-full gap-3">
          <span className="text-xs text-muted-foreground">
            RESERVATION DETAILS
          </span>
          <div className="flex p-6 w-full bg-primary/30 rounded-2xl flex-col gap-4 md:flex-row">
            <Image
              className="rounded-2xl"
              src={"/default.png"}
              alt="img"
              width={100}
              height={100}
            />
            <div className=" flex flex-col  gap-1">
              <span className="text-xl font-bold">
                Kribi Sands Resort & Spa
              </span>
              <span className="text-primary">Ocean View Suite</span>
              <div className="flex gap-4 items-center">
                <span className="flex items-center text-muted-foreground gap-1">
                  <HugeiconsIcon icon={Calendar} size={18} />
                  <span>Oct 15 - Oct 18</span>
                </span>
                <span className="flex items-center text-muted-foreground gap-1">
                  <HugeiconsIcon icon={User} size={18} />
                  <span>2 Guest</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 w-full">
        <div className="flex flex-col w-full gap-4">
          <span className="small-mute">RESERVATION DETAILS</span>
          <div className="rounded-2xl p-6 flex flex-col gap-4 bg-bg-mute text-xs">
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-muted-foreground">
                Accommodation Subtotal (3 Nights)
              </span>
              <span className="font-bold">213,043 XAF</span>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              <span className="text-muted-foreground">
                Service & Booking Fee
              </span>
              <span className="font-bold">12,000 XAF</span>
            </div>
            <div className="w-full flex items-center justify-between pb-4 border-b border-border gap-4">
              <span className="text-muted-foreground">
                Local Hospitality Tax (10%)
              </span>
              <span className="font-bold">19,957 XAF</span>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-primary">TOTAL AMOUNT PAID</span>
                <span className="text-xl font-bold">245,000 XAF</span>
              </div>
              <p>Payment processed via Secured Gateway</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-white bg-secondary-foreground p-6 flex justify-between">
        <div className="text-[10px] flex flex-col gap-0.5">
          <span>Need assistance with this booking?</span>
          <span className="opacity-60">Contact POEM Support 24/7</span>
        </div>
        <div className="flex gap-4">
          <Button className={"p-4"}>
            <HugeiconsIcon icon={Download} size={18} />
            Download PDF
          </Button>
          <Button size={"icon-lg"} variant={"outline"}>
            <HugeiconsIcon icon={Printer} size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ReceiptBlock = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6 w-full items-start max-w-xl mx-auto">
      <Button
        onClick={() => router.back()}
        variant={"link"}
        className={"text-muted-foreground"}
      >
        <HugeiconsIcon icon={ArrowLeft} size={16} />
        Back to bookings
      </Button>
      {/* <MealReciept /> */}
      <HotelReciept />
      {/* <BusReciept /> */}
    </div>
  );
};
