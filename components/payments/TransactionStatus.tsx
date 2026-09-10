"use client";
import {
  CircleAlert,
  CircleCheck,
  CircleStar,
  Download,
  Star,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

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

export const SuccessfullState = () => {
  const [isSuccessfull, setSuccessfull] = useState(true);

  return (
    <div className="p-6 rounded-2xl border bg-white border-border w-full flex flex-col items-center justify-center gap-6">
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
          <span className="text-xl font-bold">398,500 XAF</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Reference Number
          </span>

          <span className="text-xs text-muted-foreground">
            POEM-MTN-8829-192
          </span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Payment Method</span>

          <span className="text-xs text-muted-foreground">MTN MOMO</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Button className={" flex-1 p-6 h-10"}>View my booking</Button>
        <Button className={"p-6 flex-1 w-full h-10"} variant={"outline"}>
          <HugeiconsIcon icon={Download} size={14} />
          Download Reciept
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        A confirmation email has been sent to your registered address.
      </p>
    </div>
  );
};

export const FailedState = () => {
  return (
    <div className="p-6 rounded-2xl border bg-white border-border w-full flex flex-col items-center justify-center gap-6">
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
      <div className="p-5 rounded-full text-xs bg-bg-mute items-center justify-center flex gap-2 px-8 text-muted-foreground">
        MTN MOMO ACCOUNT
      </div>
      <div className="flex flex-col gap-4 w-full">
        <Button className={"h-11 w-full"}>Try Again</Button>
        <Button className={"h-11 w-full"} variant={"outline"}>
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export const TransactionStatusCard = () => {
  return <SuccessfullState />;
};
