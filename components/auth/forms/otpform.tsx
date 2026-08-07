"use client";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otpinput";
import { Lock, LockKeyIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";

export const OTPForm = () => {
  return (
    <div className="py-[calc(var(--nav-height)+24px)]">
      <div className="form-block flex flex-col items-center justify-center">
        <div className="size-20 flex items-center justify-center rounded-full bg-primary/10">
          <HugeiconsIcon icon={Lock} className="text-primary" size={34} />
        </div>
        <div className="flex flex-col gap-1.5 text-center">
          <span className="text-2xl font-bold">Confirm Your Identity</span>
          <p className="text-muted-foreground">
            We've sent a 6-digit verification code to your registered phone
            number.
          </p>
        </div>
        <OtpInput onComplete={() => {}} />
        <Button className={"rounded-md p-6 w-full text-[14px]"}>
          Verify Account
        </Button>
        <div className="flex text-xs flex-col items-center justify-center">
          <span className=" text-muted-foreground">
            Didn't receive the code ?
          </span>
          <Link href={"/"} className="cursor-pointer">
            <Button variant={"link"}>Resend Code</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
