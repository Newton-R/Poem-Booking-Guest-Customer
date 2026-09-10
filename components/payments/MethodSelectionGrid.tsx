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

export function PaymentMethodSelectionGrid({
  value,
  onChange,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <RadioGroup
      defaultValue="poem_pay"
      value={value}
      onValueChange={onChange}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full mt-4"
    >
      <FieldLabel htmlFor="poem" className="bg-white/60 rounded-md p-1">
        <Field orientation="horizontal">
          <Image
            src={"/icon/poem_lg.jpg"}
            className="h-10 w-10 rounded-md"
            width={100}
            height={100}
            alt="poem"
          />
          <FieldContent>
            <FieldTitle>PoemPay</FieldTitle>
            <FieldDescription>Get 3% discount</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="poem_pay" id="poem" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="mtn" className="bg-white/60 rounded-md p-1">
        <Field orientation="horizontal" className="">
          <Image
            src={"/icon/mtn_lg.jpg"}
            className="h-10 w-10 rounded-md"
            width={100}
            height={100}
            alt="mtn"
          />
          <FieldContent>
            <FieldTitle>MTN MoMo</FieldTitle>
            <FieldDescription>Instant Confirmation</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="momo" id="mtn" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="orange" className="bg-white/60 rounded-md p-1">
        <Field orientation="horizontal">
          <Image
            src={"/icon/orange_lg.jpg"}
            className="h-10 w-10 rounded-md"
            width={100}
            height={100}
            alt="mtn"
          />
          <FieldContent>
            <FieldTitle>Orange Money</FieldTitle>
            <FieldDescription>Secure Transfer</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="orange_money" id="orange" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="visa" className="bg-white/60 rounded-md p-1">
        <Field orientation="horizontal">
          <div className="w-10 h-10 bg-white rounded-md border border-border flex items-center justify-center">
            <HugeiconsIcon icon={Card} size={16} />
          </div>

          <FieldContent>
            <FieldTitle>Credit/Debit Card</FieldTitle>
            <FieldDescription>Visa / Mastercard</FieldDescription>
          </FieldContent>
          <RadioGroupItem value="visa" id="visa" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  );
}
