"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CustomerService01FreeIcons,
  ShoppingCart,
} from "@hugeicons/core-free-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { useCartStore } from "@/lib/useCart";
import { EmptyCart } from "../emptystuff";
import { formatPrice } from "@/lib/data";
import { useUserStore } from "@/lib/useUserStore";
import { Avatar, AvatarFallback } from "../ui/avatar";

export const TopBar = () => {
  const pathname = usePathname();
  const { items } = useCartStore();
  const { user } = useUserStore();
  return (
    <div className="fixed h-[calc(var(--mobile-nav-height))]  bg-background flex z-40 justify-between items-center p-2 lg:hidden top-0 w-full border-b border-border">
      <div className="flex gap-1 items-center">
        <Image src="/logo.png" alt="Poem Booking" width={50} height={50} />

        {/* <span className="font-bold">Poem Booking</span> */}
      </div>
      <div className="flex gap-6 items-center">
        <Link
          href={"/account/support"}
          className={cn(
            "relative rounded-full",
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
                pathname === "/cart" ? "text-primary" : "text-muted-foreground",
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
        {!user ? (
          <Link href={"/account"}>
            <Button
              className={cn(
                "text-[14px] bg-secondary-foreground hover:bg-secondary-foreground/80 h-9 text-white rounded-full p-3 px-4",
                pathname.includes("/account")
                  ? "bg-primary hover:bg-primary/80"
                  : "",
              )}
            >
              Account
            </Button>
          </Link>
        ) : (
          <Link href={"/account"}>
            <Avatar>
              <AvatarFallback className={"uppercase"}>
                {user.data.firstName[0]}
                {user.data.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </div>
  );
};
