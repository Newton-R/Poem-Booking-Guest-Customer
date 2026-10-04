"use client";
import React, { useState } from "react";
import { AnimatePresence, motion as m } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bomb,
  Calendar,
  CircleQuestionMarkIcon,
  DashboardSquare01Icon,
  Menu,
  RibbonIcon,
  User,
  X,
} from "@hugeicons/core-free-icons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogoutDialog } from "../auth/forms/LogoutBlock";

const panelTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 40,
  mass: 0.8,
};

const listContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export const MobileDashboardNavigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    { text: "Profile", icon: User, key: "profile", link: "/account/profile" },
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
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed flex justify-end right-4 lg:hidden bottom-[calc(var(--mobile-nav-height)+10px)]">
      <AnimatePresence mode="popLayout" initial={false}>
        {!isOpen ? (
          <m.div
            key="collapsed"
            onClick={() => setIsOpen(true)}
            layoutId="menu"
            layout
            transition={panelTransition}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-xs border-border border"
          >
            <m.div layoutId="trigger" transition={panelTransition}>
              <HugeiconsIcon icon={Menu} size={24} />
            </m.div>
          </m.div>
        ) : (
          <m.div
            key="expanded"
            layoutId="menu"
            layout
            transition={panelTransition}
            className="flex flex-col gap-4 p-5 rounded-2xl overflow-hidden w-[calc(100vw-32px)] border border-border bg-white/70 backdrop-blur-xs"
          >
            <div className="w-full justify-between flex items-center gap-2">
              <m.div layoutId="trigger" transition={panelTransition}>
                <HugeiconsIcon icon={Menu} size={20} />
              </m.div>
              <m.div
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, rotate: 90, x: -20 }}
                animate={{ opacity: 1, rotate: 0, x: 0 }}
                exit={{ opacity: 0, rotate: -90, x: -20 }}
              >
                <HugeiconsIcon icon={X} size={20} />
              </m.div>
            </div>

            <m.div
              className="flex flex-col gap-2"
              variants={listContainerVariants}
              initial="hidden"
              animate="show"
            >
              {links.map((link, i) => (
                <Link key={link.key ?? i} href={link.link} className="w-full">
                  <m.div
                    variants={listItemVariants}
                    className={cn(
                      "p-2 flex items-center gap-2 w-full",
                      pathname.includes(link.key) || pathname === link.link
                        ? "bg-secondary-foreground text-white rounded-md"
                        : "",
                    )}
                  >
                    <HugeiconsIcon icon={link.icon} size={16} />
                    <span>{link.text}</span>
                  </m.div>
                </Link>
              ))}
              <m.div variants={listItemVariants}>
                <LogoutDialog />
              </m.div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
