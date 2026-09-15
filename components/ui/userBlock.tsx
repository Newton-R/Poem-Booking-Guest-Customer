"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useGetUserData } from "@/lib/bearer/useUser";
import { Skeleton } from "./skeleton";
import { Avatar, AvatarFallback } from "./avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01FreeIcons, User } from "@hugeicons/core-free-icons";
import { LogoutDialog } from "../auth/forms/LogoutBlock";
import { useUserStore } from "@/lib/useUserStore";

export const UserBlock = () => {
  const pathname = usePathname();
  const { user } = useUserStore();

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center gap-2">
  //       <div className="flex flex-col items-end gap-1">
  //         <Skeleton className="w-14 h-4" />
  //         <Skeleton className="w-20 h-4" />
  //       </div>
  //       <Skeleton className="w-8 h-8 rounded-full" />
  //     </div>
  //   );
  // }

  if (!user) {
    return (
      <Link href={"/auth"}>
        <Button
          className={cn(
            "text-[14px] bg-secondary-foreground hover:bg-secondary-foreground/80 text-white rounded-full p-5 px-6",
            pathname.includes("/account")
              ? "bg-primary hover:bg-primary/80"
              : "",
          )}
        >
          Account
        </Button>
      </Link>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex text-xs gap-2 items-center p-1 rounded-full">
          <div className="flex flex-col text-end pl-1">
            <span>
              {user.data.firstName}
              {/* {data.data.lastName} */}
            </span>
            <span className="text-muted-foreground text-xs">
              {user.data.email}
            </span>
          </div>
          <Avatar>
            <AvatarFallback className={"uppercase"}>
              {user.data.firstName[0]}
              {user.data.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className={"z-90"}>
        <div className="flex text-xs gap-1 pb-4 items-center p-1 rounded-full">
          <Avatar>
            <AvatarFallback className={"uppercase"}>
              {user.data.firstName[0]}
              {user.data.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col pl-1">
            <span className="flex items-center gap-1">
              {user.data.firstName}
              <span className="text-[10px] p-0.5 px-2 first-letter:uppercase bg-green-500/20 text-green-500 rounded-full">
                {user.data.status}
              </span>
              {/* {data.data.lastName} */}
            </span>
            <span className="text-muted-foreground text-xs">
              {user.data.email}
            </span>
          </div>
        </div>
        <Link href={"/account"} className="mt-2 w-full">
          <Button
            className={
              "h-9 w-full bg-secondary-foreground hover:bg-secondary-foreground/90"
            }
          >
            <HugeiconsIcon icon={User} />
            Account
          </Button>
        </Link>
        <LogoutDialog />
      </HoverCardContent>
    </HoverCard>
  );
};
