"use client";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ApartmentIcon,
  Bus01FreeIcons,
  CustomerService01FreeIcons,
  Hotel01Icon,
  House,
  Restaurant01FreeIcons,
  ShoppingCart,
} from "@hugeicons/core-free-icons";
import { useCartStore } from "@/lib/useCart";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { formatPrice } from "@/lib/data";
import { EmptyCart } from "../emptystuff";
import { icon } from "leaflet";
import { UserBlock } from "./userBlock";

export const Links = [
  {
    label: "Home",
    link: "/",
    key: "op",
    icon: House,
  },
  {
    label: "Hotels",
    link: "/hotels",
    key: "hotels",
    icon: Hotel01Icon,
  },
  {
    label: "Apartments",
    link: "/appartment",
    key: "appartment",
    icon: ApartmentIcon,
  },
  {
    label: "Buses",
    link: "/buses",
    key: "buses",
    icon: Bus01FreeIcons,
  },
  {
    label: "Restaurants",
    link: "/restaurants",
    key: "restaurants",
    icon: Restaurant01FreeIcons,
  },
];

export const HomeNavbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  const { items } = useCartStore();
  return (
    <div className="w-full hidden z-20 md:flex fixed top-0 border-b bg-background border-border">
      <div className="container-x h-(--nav-height) flex justify-between gap-2">
        <div className="flex gap-8 items-center">
          <div className="flex gap-2 items-center">
            <Image src="/logo.png" alt="Poem Booking" width={40} height={40} />
            <span className="font-bold">Poem Booking</span>
          </div>
          <div className="flex items-center text-[14px] gap-6">
            {Links.map((link, i) => (
              <Link
                className={cn(
                  "cursor-pointer hover:underline underline-offset-4",
                  isActive(link.link) || pathname.split("/").includes(link.key)
                    ? "underline text-primary"
                    : "",
                )}
                href={link.link}
                key={i}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={"/account/support"}
            className={cn(
              "relative p-2 rounded-full",
              pathname === "/account/support"
                ? " bg-bg-mute"
                : "text-muted-foreground",
            )}
          >
            <HugeiconsIcon
              strokeWidth={pathname === "/account/support" ? 2 : 1}
              icon={CustomerService01FreeIcons}
              size={20}
            />
          </Link>
          <HoverCard>
            <HoverCardTrigger>
              <Link
                href={"/cart"}
                className={cn(
                  "relative",
                  pathname === "/cart"
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <HugeiconsIcon icon={ShoppingCart} size={20} />
                <span className="absolute p-1 w-4 h-4 rounded-full -top-2 -right-2 flex items-center justify-center text-[10px] bg-primary/20 text-primary font-bold border border-primary/30">
                  {items.length}
                </span>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className={"z-90"}>
              <div className="w-full flex justify-between items-center text-xs gap-4">
                <span className="font-bold">Cart</span>
                <span className="p-1  rounded-full -top-2 -right-2 flex items-center justify-center text-[10px] bg-primary/20 text-primary font-bold border border-primary/30">
                  {items.length} items
                </span>
              </div>
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="w-full flex items-center justify-between"
                    >
                      <Image
                        src={item.dish.image}
                        className="w-10 h-10 rounded-md"
                        width={20}
                        height={20}
                        alt={item.dish.name}
                      />
                      <div className="flex flex-col text-end">
                        <span>{item.dish.name}</span>
                        <span className="text-primary font-bold">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </HoverCardContent>
          </HoverCard>

          <UserBlock />
        </div>
      </div>
    </div>
  );
};
