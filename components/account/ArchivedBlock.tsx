import React from "react";
import { DashIntro } from "./DashIntro";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight,
  BadgeAlert,
  Date,
  Download,
  Search,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";

const HistoryCard = () => {
  return (
    <div className="p-4 rounded-md border border-border bg-white flex justify-between items-center flex-col md:flex-row">
      <div className="flex gap-2">
        <div className="w-10 h-10 rounded-full bg-primary/50 flex items-center justify-center">
          <HugeiconsIcon icon={BadgeAlert} size={18} className="text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground">Ticket ID</span>
          <span className="">#SP-94021</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground">Subject</span>
        <span className="font-bold">Cancellation of Hilton Douala Booking</span>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground">Date Resolved</span>
        <span className="font-bold text-muted-foreground">Oct 12, 2023</span>
      </div>
      <Button variant={"link"}>
        View Details <HugeiconsIcon icon={ArrowRight} size={18} />
      </Button>
    </div>
  );
};

export const ArchivedBlock = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-[12px] text-primary">RECORDS & HISTORY</span>
        <DashIntro
          heading={"Archived Tickets"}
          description={
            "Review and manage your resolved support inquiries. All closed tickets are stored here for 24 months for your reference."
          }
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        {/* History display */}
        <div className="w-full flex items-center gap-3">
          <InputGroup className="bg-white h-10 flex-1">
            <InputGroupInput placeholder="Filter by Ticket ID or Subject..." />
            <InputGroupAddon>
              <HugeiconsIcon
                icon={Search}
                size={20}
                className="text-primary"
                strokeWidth={1}
              />
            </InputGroupAddon>
          </InputGroup>
          <Button className={"p-2 h-10"} variant={"outline"}>
            <HugeiconsIcon icon={Date} size={16} />
            Date Range
          </Button>
          <Button className={"p-2 h-10"} variant={"outline"}>
            <HugeiconsIcon icon={Download} size={16} />
            Export CSV
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <HistoryCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
