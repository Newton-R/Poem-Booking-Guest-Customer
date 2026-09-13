"use client";
import React from "react";
import { Button } from "./button";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/lib/useUserStore";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

export const RegistrationReminderBlock = () => {
  const { user } = useUserStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const token = Cookies.get("token");

  if (token) {
    return <></>;
  }
  return (
    <div
      className={cn(
        "p-6 flex text-center rounded-2xl flex-col gap-2 border items-center justify-center border-primary bg-primary/10",
      )}
    >
      <p className="text-xs">
        Register and earn free tokens on each transaction. Register or Login to
        your account now.
      </p>
      <Link
        onClick={() => {
          Cookies.set("callbackUrl", encodeURIComponent(fullPath), {
            expires: 1 / 24,
            sameSite: "Lax",
          });
        }}
        href={`/auth?callbackUrl=${encodeURIComponent(fullPath)}`}
        className="w-full"
      >
        <Button className={"w-full p-4"}>Register Now</Button>
      </Link>
    </div>
  );
};
