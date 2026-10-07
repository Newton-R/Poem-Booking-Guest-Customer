"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  KnightShieldFreeIcons,
  PolicyFreeIcons,
  Shield01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RefundPolicyData } from "@/lib/types/refund";
import { useGetRefundPolicy } from "@/lib/public/useGetRefundPolicy";
import { RefundPolicySkeleton } from "./loaders/refundPolicy";
import { EmptyBlock } from "./emptystuff";
import { cn } from "@/lib/utils";

interface PoliciesDialogProps {}

export function PoliciesDialog({
  locale = "en",
  icon,
}: {
  locale?: "en" | "fr";
  icon?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useGetRefundPolicy();

  const sortedPolicies = data
    ? [...data?.data].sort((a, b) => a.sortOrder - b.sortOrder)
    : ([] as RefundPolicyData[]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {icon ? (
          <HugeiconsIcon
            className="cursor-pointer text-muted-foreground"
            icon={KnightShieldFreeIcons}
            size={20}
          />
        ) : (
          <Button
            variant="link"
            className={cn("text-xs h-fit cursor-pointer p-0")}
          >
            <HugeiconsIcon icon={Shield01Icon} size={icon ? 20 : 14} />
            {!icon && "View Policies"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        {isLoading ? (
          <RefundPolicySkeleton />
        ) : isError || !data ? (
          <EmptyBlock
            refetch={() => refetch()}
            variant="destructive"
            icon={PolicyFreeIcons}
            description="There seems to be an issue getting the refund policy. Check your internet connectivity"
            title="Erorr getting refund policy"
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Booking Policies
              </DialogTitle>
              <DialogDescription>
                Please review our policies before proceeding.
              </DialogDescription>
            </DialogHeader>

            <Accordion className="w-full">
              {sortedPolicies.map((policy) => (
                <AccordionItem value={policy.key} key={policy.key}>
                  <AccordionTrigger className="text-sm font-semibold">
                    {locale === "fr" ? policy.titleFr : policy.titleEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground ">
                    {locale === "fr" ? policy.bodyFr : policy.bodyEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
