"use client";
import { Logout02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Button } from "./ui/button";
import { useSessionModal } from "@/lib/useSessionModal";
import { useUserStore } from "@/lib/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const SessionExpirationModal = () => {
  const { isOpen, closeModal } = useSessionModal();
  const { deleteUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    deleteUser();
    Cookies.remove("token");
    router.push(`/auth?callbackUrl=${pathname}`);
    closeModal();
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed top-0  left-0 z-90 w-full p-4 min-h-screen bg-black/50 backdrop-blur-xs flex items-center justify-center">
      <div className="flex flex-col gap-2 p-6 w-[95%] max-w-md rounded-xl bg-white items-center text-center justify-center">
        <div className="w-8 h-8 rounded-md flex flex-col items-center justify-center bg-destructive/20 text-destructive">
          <HugeiconsIcon icon={Logout02FreeIcons} />
        </div>
        <p className="text-[12px] text-muted-foreground">
          For your security, your session has expired. Please log in again to
          continue using your account.
        </p>
        <Button
          onClick={() => handleLogout()}
          className={"min-w-30 mt-4"}
          variant={"outline"}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};
