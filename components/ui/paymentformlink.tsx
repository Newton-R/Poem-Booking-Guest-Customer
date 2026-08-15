"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft } from "@hugeicons/core-free-icons";

export const PaymentFormLink = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className={"text-muted-foreground cursor-pointer mb-4"}
      variant={"link"}
    >
      <HugeiconsIcon icon={ArrowLeft} size={20} />
      Back to payment method
    </Button>
  );
};
