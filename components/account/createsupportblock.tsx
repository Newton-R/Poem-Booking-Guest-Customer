"use client";
import React from "react";
import { DashIntro } from "./DashIntro";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CircleAlert,
  CloudUpload,
  SendHorizontal,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";

const InputField = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] text-primary">{label}</span>
      {children}
    </div>
  );
};

export const CreateSupportBlock = () => {
  return (
    <div className="flex flex-col gap-4">
      <DashIntro
        heading={"How can we assist you?"}
        description={
          "Create a new support ticket and our premium concierge team will resolve your inquiry within 24 hours."
        }
      />
      <div className="flex flex-col gap-6">
        {/* Complaint form */}
        <div className="border border-border flex flex-col gap-6 p-6 bg-white rounded-xl shadow-md">
          <InputField label="Service Category">
            <Combobox
              items={["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]}
            >
              <ComboboxInput
                className={"h-10 bg-white"}
                placeholder="Select a framework"
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </InputField>
          <InputField label="Ticket Subject">
            <Input
              className="h-10 bg-white"
              placeholder="e.g. Flight delay on Sahara Fly 402"
            />
          </InputField>
          <InputField label="Detailed Description">
            <Textarea
              placeholder="Please provide as much detail as possible to help us assist you faster..."
              className="h-20 bg-white"
            />
          </InputField>
          <div className="flex flex-col rounded-xl p-4 gap-1 items-center text-[14px] text-muted-foreground justify-center bg-bg-mute/50">
            <HugeiconsIcon icon={CloudUpload} size={40} />
            <span className="mt-2">
              Drop here or{" "}
              <Button variant={"link"} className={"px-0"}>
                click to upload
              </Button>
            </span>
            <span className="text-muted-foreground text-xs">
              PDF, JPG, PNG (Max 10MB)
            </span>
          </div>
          <div className="flex items-center justify-between flex-col md:flex-row gap-4">
            <div className="flex gap-1 text-xs text-muted-foreground items-center">
              <HugeiconsIcon icon={CircleAlert} size={18} />
              <p>Priority status will be applied to your account.</p>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <Button className={"p-6 rounded-md"} variant={"outline"}>
                Save Draft
              </Button>
              <Button className={"p-6 rounded-md"}>
                Submit Ticket <HugeiconsIcon icon={SendHorizontal} />
              </Button>
            </div>
          </div>
        </div>

        {/* SOme dataa */}
        <div className="pt-6 grid text-[14px] grid-cols-1 md:grid-cols-3 gap-6 border-t border-border">
          <div className="flex gap-1.5 flex-col">
            <span className="text-primary">Frequently Asked</span>
            <span className="text-muted-foreground">
              How do I track my refund?
            </span>
          </div>
          <div className="flex gap-1.5 flex-col">
            <span className="text-primary">Quick Link</span>
            <span className="text-muted-foreground">
              View Active Reservations
            </span>
          </div>
          <div className="flex gap-1.5 flex-col">
            <span className="text-primary">Emergency</span>
            <span className="text-muted-foreground">
              24/7 Hotline: +237 2xx xxx xxx
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
