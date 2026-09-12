"use client";
import { PaymentProcessingCard } from "@/components/payments/ProcessingCard";
import { ReviewStates } from "@/components/payments/ReviewSuccessfull";
import { TransactionStatusCard } from "@/components/payments/TransactionStatus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { PaymentFormLink } from "@/components/ui/paymentformlink";
import { useInitiateHotelPayment } from "@/lib/public/form/useHotelBooking";
import { Lock } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { router } from "next/client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { toast } from "sonner";

interface paymentBlockProp {
  onFormSubit: () => void;
  setNumber: (value: string) => void;
  number: string;
  isLoading: boolean;
}

const MTNBlock = ({
  onFormSubit,
  setNumber,
  number,
  isLoading,
}: paymentBlockProp) => {
  return (
    <div className="flex items-center text-center gap-6 flex-col">
      <div className="w-full border border-border shadow-md bg-white overflow-hidden rounded-2xl">
        <div className="w-full h-60 flex gap-4 flex-col items-center justify-center text-white p-4 bg-secondary-foreground">
          <div className="w-15 h-15 bg-white overflow-hidden rounded-full p-0.5">
            <Image
              src={"/icon/lmomo.png"}
              width={200}
              height={200}
              alt="Momo logo"
            />
          </div>
          <div className="w-[80%] flex flex-col gap-0.5 text-center items-center justify-center">
            <span className="text-2xl font-bold">Pay with MTN MoMo</span>
            <p className="opacity-60">
              Enter your mobile number to receive a payment prompt on your
              phone.
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubit();
          }}
          className="p-6 flex gap-4 flex-col"
        >
          <div className="flex flex-col text-start gap-1">
            <label className="text-[12px]">Phone Number</label>
            <Input
              disabled={isLoading}
              type="number"
              className="p-6"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="237 6XX XXX XXX"
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className={"w-full text-[14px] font-bold p-6"}
          >
            {isLoading ? <Loader /> : " Pay Now"}
          </Button>
          <span className="flex mt-2 mx-auto gap-1 items-center text-muted-foreground text-[10px]">
            <HugeiconsIcon icon={Lock} size={15} />
            Secure payments by POEM
          </span>
        </form>
      </div>
      <p className="text-muted-foreground text-[14px] w-full md:w-[60%]">
        Make sure your phone is nearby and unlocked to authorize the transaction
        via the USSD prompt.
      </p>
    </div>
  );
};

const OrangeBlock = ({
  isLoading,
  number,
  setNumber,
  onFormSubit,
}: paymentBlockProp) => {
  return (
    <div className="flex items-center text-center  flex-col">
      <div className="w-full border border-border shadow-md bg-white overflow-hidden rounded-2xl">
        <div className="w-full h-60 flex gap-4 flex-col items-center justify-center text-white p-4 bg-secondary-foreground">
          <div className="w-15 h-15 bg-white overflow-hidden rounded-full p-0.5">
            <Image
              src={"/icon/lom.png"}
              width={200}
              height={200}
              alt="Momo logo"
            />
          </div>
          <div className="w-[80%] flex flex-col gap-0.5 text-center items-center justify-center">
            <span className="text-2xl font-bold">Pay with Orange Money</span>
            <p className="opacity-60">
              Enter your mobile number to receive a payment prompt on your
              phone.
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubit();
          }}
          className="p-6 flex gap-4 flex-col"
        >
          <div className="flex flex-col text-start gap-1">
            <label className="text-[12px]">Phone Number</label>
            <Input
              disabled={isLoading}
              value={number}
              type="number"
              onChange={(e) => setNumber(e.target.value)}
              className="p-6"
              placeholder="237 6XX XXX XXX"
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className={"w-full text-[14px] font-bold p-6"}
          >
            {isLoading ? <Loader /> : " Pay Now"}
          </Button>
          <span className="flex mt-2 mx-auto gap-1 items-center text-muted-foreground text-[10px]">
            <HugeiconsIcon icon={Lock} size={15} />
            Secure payments by POEM
          </span>
        </form>
      </div>
      <p className="text-muted-foreground text-[14px] mt-6 w-full md:w-[60%]">
        Make sure your phone is nearby and unlocked to authorize the transaction
        via the USSD prompt.
      </p>
    </div>
  );
};

const PoemPayBlock = ({
  isLoading,
  number,
  setNumber,
  onFormSubit,
}: paymentBlockProp) => {
  return (
    <div className="flex items-center text-center flex-col">
      <div className="w-full border border-border shadow-md bg-white overflow-hidden rounded-2xl">
        <div className="w-full h-60 flex gap-4 flex-col items-center justify-center text-white p-4 bg-secondary-foreground">
          <div className="w-15 h-15 bg-white overflow-hidden rounded-full p-0.5">
            <Image
              src={"/icon/poem_lg.png"}
              width={200}
              height={200}
              alt="Poem Pay logo"
            />
          </div>
          <div className="w-[80%] flex flex-col gap-0.5 text-center items-center justify-center">
            <span className="text-2xl font-bold">Pay with Poem Pay</span>
            <p className="opacity-60">
              Enter your mobile number used on your poem pay account to receive
              a payment prompt.
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubit();
          }}
          className="p-6 flex gap-4 flex-col"
        >
          <div className="flex flex-col text-start gap-1">
            <label className="text-[12px]">Phone Number</label>
            <Input
              disabled={isLoading}
              value={number}
              type="number"
              onChange={(e) => setNumber(e.target.value)}
              className="p-6"
              placeholder="237 6XX XXX XXX"
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className={"w-full text-[14px] font-bold p-6"}
          >
            {isLoading ? <Loader /> : "  Pay Now"}
          </Button>
          <span className="flex mt-2 mx-auto gap-1 items-center text-muted-foreground text-[10px]">
            <HugeiconsIcon icon={Lock} size={15} />
            Secure payments by POEM
          </span>
        </form>
      </div>
      <p className="text-muted-foreground text-[14px] mt-6 w-full md:w-[60%]">
        Make sure your phone is nearby and unlocked to authorize the transaction
        via the USSD prompt.
      </p>
    </div>
  );
};

export const PaymentinfoBlock = () => {
  const searchParams = useSearchParams();
  const [number, setNumber] = useState("");
  const router = useRouter();
  const { mutate, isPending } = useInitiateHotelPayment();
  const info = {
    paymentMethod: String(searchParams.get("paymentMethod")),
    bookingId: String(searchParams.get("bookingId")),
  };

  const handleFormSubmit = () => {
    mutate(
      {
        paymentMethod: info.paymentMethod,
        bookingId: info.bookingId,
        phoneNumber: "237" + number,
      },
      {
        onSuccess: (response) => {
          console.log({ payment_response: response });
          toast.success("Payment Intiated Successfully");
          router.push(
            `/payment/waiting/${response.data.paymentReference}?code=${response.data.ussdCode}`,
          );
        },
        onError: (e) => {
          toast.error(e.message);
        },
      },
    );
  };

  return (
    <div className="container-x flex items-center justify-center">
      <div className="w-full mx-auto items-start max-w-md flex flex-col">
        <PaymentFormLink />
        {info.paymentMethod === "momo" ? (
          <MTNBlock
            number={number}
            onFormSubit={handleFormSubmit}
            isLoading={isPending}
            setNumber={(e) => setNumber(e)}
          />
        ) : info.paymentMethod === "orange_money" ? (
          <OrangeBlock
            number={number}
            onFormSubit={handleFormSubmit}
            isLoading={isPending}
            setNumber={(e) => setNumber(e)}
          />
        ) : (
          <PoemPayBlock
            number={number}
            onFormSubit={handleFormSubmit}
            isLoading={isPending}
            setNumber={(e) => setNumber(e)}
          />
        )}
        {/* <MTNBlock /> */}

        {/* <TransactionStatusCard /> */}
        {/* <ReviewStates /> */}
      </div>
    </div>
  );
};

export const PaymentInfoSuspenseBlock = () => {
  return (
    <Suspense>
      <PaymentinfoBlock />
    </Suspense>
  );
};
