"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01FreeIcons } from "@hugeicons/core-free-icons";

interface DatePicker {
  onChange?: (date: Date | undefined) => void,
  className?: string
}

export function DatePickerDemo({ onChange, className }: DatePicker) {
  const [date, setDate] = React.useState<Date>();


  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn("flex-1 w-full justify-start text-left font-normal border border-border h-10 data-[empty=true]:text-muted-foreground", className)}
        >
          {/* <HugeiconsIcon icon={Calendar01FreeIcons} /> */}
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={(e) => {
          setDate(e)
          if (onChange) {
            onChange(e)
          }
        }} />
      </PopoverContent>
    </Popover>
  );
}
