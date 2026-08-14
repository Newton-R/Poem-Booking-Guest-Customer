"use client";
import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const HomeNavbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };
  const Links = [
    {
      label: "Home",
      link: "/",
      key: "op",
    },
    {
      label: "Hotels",
      link: "/hotels",
      key: "hotels",
    },
    {
      label: "Appartments",
      link: "/appartments",
      key: "appartments",
    },
    {
      label: "Buses",
      link: "/buses",
      key: "buses",
    },
    {
      label: "Restaurants",
      link: "/restaurants",
      key: "restaurants",
    },
  ];
  return (
    <div className="w-full z-90 fixed top-0 border-b bg-background border-border">
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
        <div className="flex items-center">
          <Button
            className={
              "text-[14px] bg-secondary-foreground text-white rounded-full p-5 px-6"
            }
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
