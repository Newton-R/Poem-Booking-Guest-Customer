"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01FreeIcons } from "@hugeicons/core-free-icons";
import { useLogout } from "@/lib/public/useRegister";
import { toast } from "sonner";
import { Loader } from "@/components/ui/Loader";
import { clearSession } from "@/lib/clearSession";
import { cn } from "@/lib/utils";

export function LogoutDialog({ btnStyle }: { btnStyle?: string }) {
  const { mutate, isPending } = useLogout();

  return (
    <Dialog>
      <DialogTrigger className={"w-full"}>
        <Button
          className={cn("p-4 flex-1 mt-2 w-full", btnStyle && btnStyle)}
          variant={"destructive"}
        >
          <HugeiconsIcon icon={Logout01FreeIcons} />
          Logout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Log out?</DialogTitle>
          <DialogDescription>
            You&apos;ll need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className={"w-30"}
            onClick={() => {
              mutate(null, {
                onSuccess: (response) => {
                  toast.success(response.data.message);
                },
                onError: (e) => {
                  toast.error(e.message ?? "Unable to logout");
                },
                onSettled: () => {
                  clearSession();
                  window.location.replace("/");
                },
              });
            }}
            disabled={isPending}
          >
            {isPending ? <Loader /> : "Log Out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
