import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentFormLink } from "@/components/ui/paymentformlink";
import { Lock } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import Image from "next/image";
import React from "react";

const MTNBlock = () => {
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
        <form className="p-6 flex gap-4 flex-col">
          <div className="flex flex-col text-start gap-1">
            <label className="text-[12px]">Phone Number</label>
            <Input className="p-6" placeholder="237 6XX XXX XXX" />
          </div>
          <Button className={"w-full text-[14px] font-bold p-6"}>
            Pay Now
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

const OrangeBlock = () => {
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
        <form className="p-6 flex gap-4 flex-col">
          <div className="flex flex-col text-start gap-1">
            <label className="text-[12px]">Phone Number</label>
            <Input className="p-6" placeholder="237 6XX XXX XXX" />
          </div>
          <Button className={"w-full text-[14px] font-bold p-6"}>
            Pay Now
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
  return (
    <div className="container-x flex items-center justify-center">
      <div className="w-full mx-auto items-start max-w-md flex flex-col">
        <PaymentFormLink />
        {/* <MTNBlock /> */}
        <OrangeBlock />
      </div>
    </div>
  );
};
