"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pen, UserAccountFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import SafeImage from "@/components/ui/safe-image";
import React from "react";
import { useGetUserData } from "@/lib/bearer/useUser";
import { ProfilePageSkeleton } from "@/components/loaders/account/profilePage";
import { EmptyBlock } from "@/components/emptystuff";
import { formatDate } from "date-fns";
import { LogoutDialog } from "@/components/auth/forms/LogoutBlock";
import { ProfileUpdateDialog } from "./UserUpdateForm";
import { useProfileUpdate } from "@/lib/bearer/form/useProfileUpdate";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/lib/query-keys/user";

export function SecurityAccountCard() {
  return (
    <Card className="p-6 rounded-2xl max-w-md">
      <h2 className="text-2xl font-bold">Security & Account Settings</h2>

      <div className="mt-6 pb-5 border-b border-border flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-mono tracking-wider text-muted-foreground">
            PASSWORD
          </p>
          <p className="text-sm">Last changed 3 months ago</p>
        </div>
        <Button variant="outline" className="font-mono text-xs shrink-0">
          CHANGE PASSWORD
        </Button>
      </div>

      <div className="py-5 border-b border-border flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-mono tracking-wider text-muted-foreground">
            TWO-FACTOR AUTHENTICATION
          </p>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 font-mono text-xs rounded-md">
              ENABLED
            </Badge>
            <span className="text-sm">
              Protects your account with extra security
            </span>
          </div>
        </div>
        <button className="text-sm font-mono font-semibold text-amber-800 underline underline-offset-2 shrink-0">
          MANAGE
        </button>
      </div>

      <div className="py-5 border-b border-border space-y-1">
        <p className="text-xs font-mono tracking-wider text-muted-foreground">
          LOGIN HISTORY
        </p>
        <p className="text-sm">
          Last session access: <span className="font-semibold">Douala, CM</span>{" "}
          on August 28, 2024 at 10:14 AM.
        </p>
      </div>

      <div className="pt-5 flex items-center justify-between gap-4">
        <p className="text-sm">No longer need your booking portal?</p>
        <button className="text-sm font-mono font-semibold text-amber-800 underline underline-offset-2 shrink-0">
          Delete Account
        </button>
      </div>
    </Card>
  );
}

export const ProfileBlock = () => {
  const { data, isLoading, isError, refetch } = useGetUserData();
  const { mutate, isPending } = useProfileUpdate();
  const queryClient = useQueryClient();
  if (isLoading) {
    return <ProfilePageSkeleton />;
  }

  if (!data || isError) {
    return (
      <EmptyBlock
        refetch={() => refetch()}
        icon={UserAccountFreeIcons}
        title="Error getting info"
        description="Check your network connectivity and try again."
      />
    );
  }

  const user = data.data;

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex flex-col gap-2 md:flex-row justify-between md:items-center">
        <div className="flex gap-2 items-center">
          <Avatar className={"size-14"}>
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-1 flex-col">
            <div className="flex gap-2 flex-col md:flex-row md:items-center">
              <span className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </span>
              <div className="text-[10px] bg-bg-mute w-fit p-1 px-2 flex gap-1 text-muted-foreground rounded-full items-center">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                ACCOUNT ACTIVE
              </div>
            </div>
            <span className="text-xs">
              Member since {formatDate(user.createdAt, "MMMM d, yyyy")}
            </span>
          </div>
        </div>
        <ProfileUpdateDialog
          defaultValues={{
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.email ?? "",
            preferredLanguage: user.preferredLanguage ?? "",
          }}
          onSubmit={async (values) => {
            mutate(values, {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: authKeys.currentUser(),
                });
              },
              onError: (error) => {
                throw error;
              },
            });
          }}
        />
      </div>
      <div className="bg-white p-6 rounded-2xl col-span-2 flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4">
          <span className="text-xl font-bold">Personal Details</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-light">Full Name</span>
            <span className="font-bold">
              {user.firstName} {user.lastName}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light">Email Address</span>
            <span className="font-bold">{user.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light">Nationality</span>
            <span className="font-bold">Cameroonian</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light">Phone Number</span>
            <span className="font-bold">{user.phoneNumber}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light">Date of Birth</span>
            <span className="font-bold">March 15, 1990</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light">Gender</span>
            <span className="font-bold">Male</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light">Pref. Language</span>
            {user.preferredLanguage === "fr" ? (
              <span className="font-bold">French (FR)</span>
            ) : (
              <span className="font-bold">English (EN)</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-light">Address</span>
            <span className="font-bold">
              12 Rue de la Joie, Douala, Cameroon
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="p-6 flex flex-col bg-white rounded-2xl gap-2">
          <span className="text-muted-foreground text-xs">User Actions</span>
          <div className="w-fit">
            <LogoutDialog btnStyle="w-fit min-w-30 h-9" />
          </div>
        </div>
      </div>
    </div>
  );
};
{
  /* <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-border rounded-2xl">
          <span className="text-xl font-bold">Saved Payment Methods</span>

          <div className="flex mt-6 flex-col gap-6">
            <div className="p-3 rounded-md bg-bg-mute flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-secondary-foreground" />
              <div className="flex gap-1">
                <div className="flex flex-col text-xs">
                  <span className="font-bold">Visa ending in 4521</span>
                  <span className="text-muted-foreground">EXPIRY 08/26</span>
                </div>
                <span className="text-[10px] text-primary p-1 px-2 rounded-md bg-primary/20 h-fit">
                  PRIMARY
                </span>
              </div>
            </div>
            <div className="p-3 rounded-md bg-bg-mute flex items-center gap-2">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-secondary-foreground">
                <SafeImage
                  src={"/icon/mtn.png"}
                  width={20}
                  height={20}
                  className="w-full h-full object-cover"
                  alt="icon"
                />
              </div>
              <div className="flex gap-1">
                <div className="flex flex-col text-xs">
                  <span className="font-bold">Visa ending in 4521</span>
                  <span className="text-muted-foreground">EXPIRY 08/26</span>
                </div>
              </div>
            </div>
            <Button className={"p-4 h-11"} variant={"outline"}>
              ADD PAYMENT METHOD
            </Button>
          </div>
        </div>
        <SecurityAccountCard />
      </div> */
}
