"use client";
import {
  CircleAlert,
  CircleCheck,
  CircleStar,
  Download,
  QrCodeScanFreeIcons,
  Star,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import Cookies from "js-cookie";
import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { useRouter } from "next/navigation";

const ReviewModal = () => {
  return (
    <div className="h-screen w-screen fixed z-90 backdrop-blur-[2px] bg-black/40 top-0 left-0 flex items-center justify-center">
      <div className="p-6 flex flex-col gap-6 rounded-2xl border justify-center items-center border-border bg-white/90 w-full max-w-md">
        <div className="w-18 h-18 rounded-full bg-primary/40 flex items-center justify-center text-primary">
          <HugeiconsIcon icon={CircleStar} className="w-12 fill-primary h-12" />
        </div>
        <div className="flex flex-col gap-4 text-center">
          <span className="text-xl font-bold">Share Your Experience</span>
          <p className="text-muted-foreground">
            Earn 500 POEM Tokens for your feedback
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <HugeiconsIcon
              icon={Star}
              size={18}
              strokeWidth={2}
              key={i}
              className="text-primary"
            />
          ))}
        </div>
        <Textarea
          className="h-25 bg-white/90 p-2"
          placeholder="Tell us about your booking experience "
        />
        <div className="flex gap-2 items-center">
          <Input type="checkbox" className="w-4 h-4" id="send" />
          <label htmlFor="send">Share as anonymmous</label>
        </div>
        <div className="flex flex-col gap-1 items-center w-full">
          <Button className={"h-10 w-full"}>Submit Review</Button>
          <span className="text-xs text-muted-foreground">Maybe Later</span>
        </div>
      </div>
    </div>
  );
};

interface StatesProp {
  ref: string;
  amount: string;
  method: string;
  bookingId: string;
  number: string;
}

export const SuccessfullState = ({
  ref,
  amount,
  method,
  bookingId,
  number,
}: StatesProp) => {
  const bookingRef = Cookies.get("bookingRef");
  const user = Cookies.get("token");
  return (
    <div className="p-6 rounded-2xl border max-w-md mx-auto bg-white border-border w-[95%] flex flex-col items-center justify-center gap-6">
      {/* <ReviewModal /> */}
      <div className="w-18 h-18 rounded-full bg-primary/20 flex items-center justify-center">
        <HugeiconsIcon
          icon={CircleCheck}
          className="w-13 h-13 fill-primary text-white/40"
        />
      </div>
      <div className="flex flex-col text-center gap-4">
        <h1 className="text-2xl font-bold">Transaction Successful</h1>
        <p>
          Your payment status was processed securely. Your booking is now
          confirmed.
        </p>
      </div>
      <div className="w-full bg-bg-mute rounded-2xl p-4 flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Amount Paid</span>
          <span className="text-xl font-bold">{formatPrice(amount)}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Reference Number
          </span>

          <span className="text-[10px] text-end text-muted-foreground">
            {ref}
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Payment Method</span>

          <span className="text-xs text-muted-foreground">{method}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Phone Number</span>

          <span className="text-xs text-muted-foreground">{number}</span>
        </div>
      </div>

      {user ? (
        <Link href={`/account/booking`} className="w-full">
          <Button variant={"outline"} className={"w-full min-w-40 h-10"}>
            Dashboard
          </Button>
        </Link>
      ) : (
        <Link
          href={`/guest-booking/${bookingRef}?num=${number}`}
          className="w-full"
        >
          <Button variant={"outline"} className={"w-full min-w-40 h-10"}>
            <HugeiconsIcon icon={QrCodeScanFreeIcons} />
            Booking Details
          </Button>
        </Link>
      )}
      <p className="text-center text-xs text-muted-foreground mt-2">
        A confirmation email has been sent to your registered address.
      </p>
    </div>
  );
};

export const FailedState = ({ method }: { method: string }) => {
  const router = useRouter();
  return (
    <div className="p-6 rounded-2xl max-w-md mx-auto border bg-white border-border w-full flex flex-col items-center justify-center gap-6">
      <div className="w-18 h-18 rounded-full flex items-center justify-center bg-destructive/20 text-destructive">
        <HugeiconsIcon icon={CircleAlert} className="w-12 h-12" />
      </div>
      <div className="flex flex-col gap-4 items-center text-center">
        <span className="text-xl font-bold">Payment Failed</span>
        <p className="text-muted-foreground">
          We couldn't process your payment. This could be due to a timeout,
          insufficient funds, or a cancelled prompt.
        </p>
      </div>
      <div className="p-5 rounded-full font-bold text-primary text-xs bg-bg-mute items-center justify-center flex gap-2 px-8">
        {method}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"outline"}
          className={"h-11 w-full"}
        >
          Back
        </Button>
        {/* <Button className={"h-11 w-full"} variant={"outline"}>
          Contact Support
        </Button> */}
      </div>
    </div>
  );
};
