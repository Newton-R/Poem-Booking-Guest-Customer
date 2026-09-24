import React, { useState } from "react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function PaymentMethodSelectionGrid({
  value,
  onChange,
  className,
  size,
}: {
  value: string;
  className?: string;
  size?: "mini" | "large";
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const isMini = size === "mini";
  return (
    <RadioGroup
      defaultValue="poem_pay"
      value={value}
      onValueChange={onChange}
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 w-full mt-4",
        className,
      )}
    >
      <FieldLabel
        htmlFor="poem"
        className={cn("bg-white/60 rounded-md p-1", isMini && "p-0")}
      >
        <Field
          className={cn(
            "",
            isMini ? "flex flex-col gap-1 items-center justify-center" : "",
          )}
          orientation={"horizontal"}
        >
          <Image
            src={"/icon/poem_lg.jpg"}
            className={cn("h-10 w-10 rounded-md", isMini && "h-7 w-7")}
            width={100}
            height={100}
            alt="poem"
          />
          {!isMini && (
            <FieldContent>
              <FieldTitle>PoemPay</FieldTitle>
              <FieldDescription>Get 3% discount</FieldDescription>
            </FieldContent>
          )}
          <RadioGroupItem
            className={cn(isMini && "hidden")}
            value="poem_pay"
            id="poem"
          />
        </Field>
      </FieldLabel>
      <FieldLabel
        htmlFor="mtn"
        className={cn("bg-white/60 rounded-md p-1", isMini && "p-0")}
      >
        <Field
          orientation="horizontal"
          className={cn(
            "",
            isMini ? "flex flex-col gap-1 items-center justify-center" : "",
          )}
        >
          <Image
            src={"/icon/mtn_lg.jpg"}
            className={cn("h-10 w-10 rounded-md", isMini && "h-7 w-7")}
            width={100}
            height={100}
            alt="mtn"
          />
          {!isMini && (
            <FieldContent>
              <FieldTitle>MTN MoMo</FieldTitle>

              <FieldDescription>Instant Confirmation</FieldDescription>
            </FieldContent>
          )}
          <RadioGroupItem
            className={cn(isMini && "hidden")}
            value="momo"
            id="mtn"
          />
        </Field>
      </FieldLabel>
      <FieldLabel
        htmlFor="orange"
        className={cn("bg-white/60 rounded-md p-1", isMini && "p-0")}
      >
        <Field
          orientation="horizontal"
          className={cn(
            "",
            isMini ? "flex flex-col gap-1 items-center justify-center" : "",
          )}
        >
          <Image
            src={"/icon/orange_lg.jpg"}
            className={cn("h-10 w-10 rounded-md", isMini && "h-7 w-7")}
            width={100}
            height={100}
            alt="mtn"
          />
          {!isMini && (
            <FieldContent>
              <FieldTitle>Orange Money</FieldTitle>
              <FieldDescription>Secure Transfer</FieldDescription>
            </FieldContent>
          )}
          <RadioGroupItem
            className={cn(isMini && "hidden")}
            value="orange_money"
            id="orange"
          />
        </Field>
      </FieldLabel>
      <FieldLabel
        htmlFor="visa"
        className={cn("bg-white/60 rounded-md p-1", isMini && "p-0")}
      >
        <Field
          orientation="horizontal"
          className={cn(
            "",
            isMini ? "flex flex-col gap-1 items-center justify-center" : "",
          )}
        >
          <div
            className={cn(
              "w-10 h-10 bg-white rounded-md border border-border flex items-center justify-center",
              isMini && "w-8 h-8 border-none",
            )}
          >
            <HugeiconsIcon icon={Card} size={isMini ? 18 : 16} />
          </div>

          {!isMini && (
            <FieldContent>
              <FieldTitle>Credit/Debit Card</FieldTitle>
              <FieldDescription>Visa / Mastercard</FieldDescription>
            </FieldContent>
          )}
          <RadioGroupItem
            className={cn(isMini && "hidden")}
            value="visa"
            id="visa"
          />
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}
