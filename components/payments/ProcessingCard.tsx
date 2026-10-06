"use client";
import { LoaderCircleIcon, PhoneCall } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTrackPayment } from "@/lib/public/useTrackPayments";
import { FailedState, SuccessfullState } from "./TransactionStatus";
import { formatPrice } from "@/lib/data";

// How long we wait for the user to approve the prompt before offering a retry
const TIMEOUT_SECONDS = 30;
const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const formatCountdown = (total: number) => {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

type PaymentProcessingCardProps = {
  amount?: string;
  method?: string;
  number?: string;
  onCheckAgain?: () => void;
  onTryAnother?: () => void;
};

export const PaymentProcessingCard = ({
  amount,
  method,
  number,
  onCheckAgain,
  onTryAnother,
}: PaymentProcessingCardProps) => {
  const [secondsLeft, setSecondsLeft] = useState(TIMEOUT_SECONDS);
  const timedOut = secondsLeft <= 0;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const handleCheckAgain = () => {
    setSecondsLeft(TIMEOUT_SECONDS);
    onCheckAgain?.();
  };

  const amountNumber = Number(amount);
  const hasAmount =
    !!amount && amount !== "null" && !Number.isNaN(amountNumber);
  const hasMethod = !!method && method !== "null";
  const hasNumber = !!number && number !== "null";

  const progress = secondsLeft / TIMEOUT_SECONDS;

  return (
    <div className="bg-white p-8 max-w-md mx-auto w-full rounded-3xl border border-border shadow-sm flex flex-col items-center gap-8">
      {/* Countdown ring */}
      <div className="relative h-36 w-36 flex items-center justify-center">
        {!timedOut && (
          <span className="absolute inset-3 rounded-full bg-primary/10 animate-ping [animation-duration:2.5s]" />
        )}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          <circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            strokeWidth="6"
            className="stroke-muted"
          />
          <circle
            cx="60"
            cy="60"
            r={RING_RADIUS}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className={`transition-[stroke-dashoffset] duration-1000 ease-linear ${
              timedOut ? "stroke-amber-500" : "stroke-primary"
            }`}
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
          />
        </svg>
        <div className="relative h-20 w-20 rounded-full bg-primary/10 flex flex-col items-center justify-center">
          {timedOut ? (
            <HugeiconsIcon
              icon={PhoneCall}
              size={28}
              className="text-amber-600"
            />
          ) : (
            <>
              <HugeiconsIcon
                icon={PhoneCall}
                size={20}
                className="text-primary"
              />
              <span
                className="text-sm font-bold tabular-nums mt-1"
                aria-live="off"
              >
                {formatCountdown(secondsLeft)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold">
          {timedOut
            ? "Still waiting for confirmation"
            : "Confirm on your phone"}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {timedOut
            ? "We haven't received your approval yet. If you didn't get a prompt, check your balance and try again."
            : "Enter your PIN on the payment prompt to authorize this transaction."}
        </p>
      </div>

      {/* Payment details */}
      {(hasAmount || hasMethod || hasNumber) && (
        <div className="w-full rounded-2xl bg-muted/50 border border-border divide-y divide-border text-sm">
          {hasAmount && (
            <div className="flex justify-between px-4 py-3">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold">{formatPrice(amountNumber)}</span>
            </div>
          )}
          {hasMethod && (
            <div className="flex justify-between px-4 py-3">
              <span className="text-muted-foreground">Method</span>
              <span className="font-semibold capitalize">{method}</span>
            </div>
          )}
          {hasNumber && (
            <div className="flex justify-between px-4 py-3">
              <span className="text-muted-foreground">Phone number</span>
              <span className="font-semibold">{number}</span>
            </div>
          )}
        </div>
      )}

      {/* Status / actions */}
      {timedOut ? (
        <div className="flex flex-col w-full gap-3">
          <Button className="h-11" onClick={handleCheckAgain}>
            Check again
          </Button>
          <Button variant="outline" className="h-11" onClick={onTryAnother}>
            Try another payment
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HugeiconsIcon
            icon={LoaderCircleIcon}
            size={16}
            className="animate-spin text-primary"
          />
          Waiting for confirmation
        </div>
      )}
    </div>
  );
};

export const PaymentProcessingBlock = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const trans_data = {
    amt: String(searchParams.get("amt")),
    method: String(searchParams.get("method")),
    number: String(searchParams.get("num")),
  };
  const bookingRef = String(params.bookingRef);
  const { status, isLoading, refetch } = useTrackPayment(bookingRef);
  console.log({ status: status });

  if (!isLoading && status?.paymentStatus === "successful") {
    return (
      <div className="p-4">
        <SuccessfullState
          ref={bookingRef}
          bookingId={status.bookingId}
          method={trans_data.method}
          amount={trans_data.amt}
          number={trans_data.number}
        />
      </div>
    );
  }

  if (
    !isLoading &&
    (status?.paymentStatus === "failed" || status?.paymentStatus === "reversed")
  ) {
    return (
      <div className="p-4">
        <FailedState method={trans_data.method} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <PaymentProcessingCard
        amount={trans_data.amt}
        method={trans_data.method}
        number={trans_data.number}
        onTryAnother={() => router.back()}
        onCheckAgain={() => refetch()} // pass this if useTrackPayment returns refetch
      />
    </div>
  );
};

export const SuspensePaymentProcessing = () => {
  return (
    <Suspense>
      <PaymentProcessingBlock />
    </Suspense>
  );
};
