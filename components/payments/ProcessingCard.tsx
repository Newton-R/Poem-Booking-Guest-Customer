"use client";
import { AlertTriangle, LoaderCircle, X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { useGetLivePaymentStatus } from "@/lib/public/usePaymentStatus";
import { useTrackPayment } from "@/lib/public/useTrackPayments";
import { FailedState, SuccessfullState } from "./TransactionStatus";

export const PaymentProcessingCard = () => {
  return (
    <div className="bg-white p-6 w-full gap-6 items-center justify-center rounded-2xl border border-border flex flex-col">
      {/* <div className="w-15 h-15 bg-white overflow-hidden rounded-full p-0.5">
        <Image src={"/icon/lom.png"} width={200} height={200} alt="Momo logo" />
      </div> */}
      <div className="w-15 h-15 rounded-full flex items-center justify-center">
        <HugeiconsIcon
          icon={LoaderCircle}
          className="text-primary h-15 w-15 animate-spin"
          size={30}
          strokeWidth={2}
        />
      </div>
      <div className="flex flex-col gap-4 text-center">
        <span className="text-2xl font-bold">Awaiting Confirmation</span>
        <p>
          Please check your phone for the payment prompt and enter your PIN to
          authorize the transaction.
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="p-2 rounded-md bg-bg-mute items-center flex justify-center h-10 w-full">
          <span className="text-destructive text-xs flex gap-1 items-center">
            <HugeiconsIcon icon={AlertTriangle} size={12} />
            Do not refresh this page.
          </span>
        </div>
        <Button
          variant={"outline"}
          className={"text-muted-foreground p-4 h-10"}
        >
          <HugeiconsIcon icon={X} size={12} />
          Cancel Transaction
        </Button>
      </div>
      <div className="flex items-center mt-2 w-full text-muted-foreground text-xs gap-2">
        <div className="border-b border-border flex flex-1" />
        <span>XAF CURRENCY</span>
        <div className="border-b border-border flex flex-1" />
      </div>
    </div>
  );
};

export const PaymentProcessingBlock = () => {
  const params = useParams();
  const paymentId = String(params.paymentId);
  const { status, isLoading } = useTrackPayment(paymentId);

  if (isLoading || !status) {
    return (
      <div className="p-4">
        <PaymentProcessingCard />
      </div>
    );
  }

  if (status.paymentStatus === "successful") {
    return (
      <div>
        <SuccessfullState />
      </div>
    );
  }

  if (
    status.paymentStatus === "failed" ||
    status.paymentStatus === "reversed"
  ) {
    return (
      <div>
        <FailedState />
      </div>
    );
  }

  return (
    <div className="p-4">
      <PaymentProcessingCard />
    </div>
  );
};
