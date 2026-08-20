"use client";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CircleQuestionMarkIcon,
  DashboardSquare01Icon,
  RibbonIcon,
  User,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const AccountSideBar = () => {
  const pathname = usePathname();
  const links = [
    {
      text: "Dashboard",
      icon: DashboardSquare01Icon,
      link: "/account",
      key: "bef",
    },
    {
      text: "My Bookings",
      icon: Calendar,
      key: "booking",
      link: "/account/booking",
    },
    {
      text: "Loyalty & Rewards",
      icon: RibbonIcon,
      key: "loyalty",
      link: "/account/loyalty",
    },
    {
      text: "Profile",
      icon: User,
      key: "profile",
      link: "/account/profile",
    },
    {
      text: "Refer a Friend",
      icon: RibbonIcon,
      key: "refer",
      link: "/account/refer",
    },
    {
      text: "Support",
      icon: CircleQuestionMarkIcon,
      key: "support",
      link: "/account/support",
    },
  ];
  return (
    <div className="h-full">
      <div className="sticky top-[calc(var(--nav-height)+20px)] h-fit flex gap-4 flex-col">
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              href={link.link}
              key={link.key}
              className={cn(
                "flex items-center gap-2 p-3 rounded-md hover:bg-bg-mute/90",
                pathname.includes(link.key) || pathname === link.link
                  ? "bg-secondary-foreground hover:bg-secondary-foreground/90 text-white"
                  : "",
              )}
            >
              <HugeiconsIcon icon={link.icon} size={20} />
              <span>{link.text}</span>
            </Link>
          ))}
        </div>
        <div className="p-6 rounded-2xl bg-secondary-foreground text-white flex flex-col gap-2">
          <span className="opacity-80">Balance</span>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold text-primary">2,450 XP</span>
            <span className="p-1 rounded-md w-fit text-xs bg-primary/20 text-primary">
              GOLD TIER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
