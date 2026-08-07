import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="small-block">
      <div className="form-block text-center justify-center">
        <div className="flex gap-1 flex-col">
          <span className="text-2xl font-bold">Reset Password</span>
          <p className="text-[14px] text-muted-foreground">
            Enter your Phone number and we'll send you a link to reset your
            password.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Input placeholder="Phone Number" className="p-5 px-4" />
          <Button className={"p-5 rounded-md"}>
            Send Reset Code <HugeiconsIcon icon={ArrowRight} size={20} />
          </Button>
        </div>
        <Link href={"/auth"}>
          <Button variant={"link"} className={"cursor-pointer"}>
            <HugeiconsIcon icon={ArrowLeft} size={20} /> Back to login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
