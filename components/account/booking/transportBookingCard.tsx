import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bus02Icon,
  Calendar,
  CircleCheck,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

import Link from "next/link";
import { formatDate } from "date-fns";

import { TransportBookingData } from "@/lib/types/booking_data";
import { formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TransportBookingCardProps {
  booking: TransportBookingData;
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m > 0 ? `${m}m` : ""}`.trim();
}

export function TransportBookingCard({ booking }: TransportBookingCardProps) {
  const item = booking.items[0];
  const { service, guests } = item;
  const { transport } = service;

  return (
    <div className="p-6 rounded-xl border bg-white border-border grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Icon badge instead of image */}
      <div className="rounded-xl overflow-hidden h-40 bg-primary/10 flex items-center justify-center">
        <HugeiconsIcon icon={Bus02Icon} size={48} className="text-primary" />
      </div>

      <div className="flex flex-col gap-3 col-span-2">
        <div className="flex justify-between flex-col gap-4 md:flex-row">
          {/* Left: type tag, agency name, route */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase font-bold w-fit bg-bg-mute p-1 px-2 rounded-md">
              {booking.bookingType}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold">{transport.agencyName}</span>
              <span className="text-xs flex items-center gap-2 text-muted-foreground">
                {transport.originCity} &rarr; {transport.destinationCity}
              </span>
            </div>
          </div>

          {/* Right: status + price */}
          <div className="flex flex-col gap-2 md:items-end">
            <span
              className={cn(
                "text-xs flex gap-1 w-fit flex-nowrap items-center p-1 px-2 rounded-full h-fit",
                booking.bookingStatus === "confirmed"
                  ? " text-green-500 bg-green-500/20"
                  : booking.bookingStatus === "pending"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : booking.bookingStatus === "completed"
                      ? "bg-purple-500/20 text-purple-500"
                      : "bg-destructive/20 text-destructive",
              )}
            >
              {/* <HugeiconsIcon
                icon={CircleCheck}
                className="fill-green-500 text-white"
                size={12}
              /> */}
              <span className="first-letter:uppercase">
                {" "}
                {booking.bookingStatus}
              </span>
            </span>
            <div className="flex flex-col gap-0.5 md:text-end">
              <span className="text-xs text-muted-foreground">TOTAL PRICE</span>
              <span className="text-xl font-bold">
                {formatPrice(booking.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Trip details: departure / arrival / duration / passengers */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 py-3 border-y border-border">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground">DEPARTURE</span>
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <HugeiconsIcon icon={Calendar} size={14} />
              {formatDate(new Date(service.startDatetime), "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground">ARRIVAL</span>
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <HugeiconsIcon icon={Calendar} size={14} />
              {formatDate(new Date(service.endDatetime), "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground">DURATION</span>
            <span className="text-xs font-semibold">
              {formatDuration(transport.estimatedDurationMinutes)}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground">
              PASSENGERS
            </span>
            <span className="text-xs font-semibold flex items-center gap-1.5">
              <HugeiconsIcon icon={UserGroupIcon} size={14} />
              {guests.length} Passenger(s)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex mt-1 justify-between items-center gap-4">
          <Link href={`/account/booking/${booking.id}`}>
            <Button className={"p-4 w-40 rounded-md"}>VIEW RECEIPT</Button>
          </Link>

          <Link href={`/account/booking/${booking.id}`}>
            <Button variant={"link"} className={"text-[14px]"}>
              Download Receipt
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
