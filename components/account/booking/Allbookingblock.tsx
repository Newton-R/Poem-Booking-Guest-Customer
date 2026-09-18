"use client";
import React from "react";
import { DashIntro } from "../DashIntro";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar,
  CircleCheck,
  Location01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetCustomerBookings } from "@/lib/bearer/useGetBooking";

import { Skeleton } from "@/components/ui/skeleton";
import { GuestBookingDetailsResponseData } from "@/lib/types/booking_data";
import { differenceInCalendarDays, formatDate } from "date-fns";
import { formatPrice } from "@/lib/data";

export const BookingCardSkeleton = () => {
  return (
    <div className="p-6 rounded-xl border bg-white border-border grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Image */}
      <div className="rounded-xl overflow-hidden h-40">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <div className="flex justify-between flex-col gap-4 md:flex-row">
          {/* Left side: tag, title, date */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-24 rounded-md" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-3.5 w-28" />
            </div>
          </div>

          {/* Right side: status badge, price */}
          <div className="flex flex-col gap-2 md:items-end">
            <Skeleton className="h-5 w-24 rounded-full" />
            <div className="flex flex-col gap-1.5 md:items-end">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex mt-4 justify-between items-center gap-4">
          <Skeleton className="h-11 w-40 rounded-md" />
          <Skeleton className="h-5 w-28" />
        </div>
      </div>
    </div>
  );
};

const BookingHistoryCard = ({
  booking,
}: {
  booking: GuestBookingDetailsResponseData;
}) => {
  if (booking.bookingType !== "restaurant") {
    return (
      <div className="p-6 rounded-xl border bg-white border-border grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Image */}
        <div className="rounded-xl overflow-hidden h-40 relative">
          <Image
            src={"/apartment-placeholder.jpg"}
            width={400}
            height={400}
            alt={booking.id}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 col-span-2">
          <div className="flex justify-between flex-col gap-4 md:flex-row">
            {/* Left: type tag, property name, location */}
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase font-bold w-fit bg-bg-mute p-1 px-2 rounded-md">
                {booking.bookingType}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-2xl font-bold">
                  {/* {booking.property.name} */}
                </span>
                <span className="text-xs flex items-center gap-2 text-muted-foreground">
                  <HugeiconsIcon icon={Location01Icon} size={16} />
                  {/* {booking.property.location} */}
                </span>
              </div>
            </div>

            {/* Right: status + price */}
            <div className="flex flex-col gap-2 md:items-end">
              <span className="text-xs flex gap-1 w-fit items-center p-1 px-2 rounded-full bg-green-500/30 h-fit text-green-500">
                <HugeiconsIcon
                  icon={CircleCheck}
                  className="fill-green-500 text-white"
                  size={12}
                />
                Confirmed
              </span>
              <div className="flex flex-col gap-0.5 md:text-end">
                <span className="text-xs text-muted-foreground">
                  TOTAL PRICE
                </span>
                <span className="text-xl font-bold">
                  {formatPrice(booking.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Stay details: check-in / check-out / nights / guests */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 py-3 border-y border-border">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">
                CHECK IN
              </span>
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <HugeiconsIcon icon={Calendar} size={14} />
                {formatDate(
                  new Date(booking.items[0].startDatetime),
                  "MMM dd, yyyy",
                )}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">
                CHECK OUT
              </span>
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <HugeiconsIcon icon={Calendar} size={14} />
                {formatDate(
                  new Date(booking.items[0].endDatetime),
                  "MMM dd, yyyy",
                )}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">NIGHTS</span>
              <span className="text-xs font-semibold">
                {differenceInCalendarDays(
                  new Date(booking.items[0].endDatetime),
                  new Date(booking.items[0].startDatetime),
                )}{" "}
                Night(s)
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-muted-foreground">GUESTS</span>
              <span className="text-xs font-semibold flex items-center gap-1.5">
                <HugeiconsIcon icon={UserGroupIcon} size={14} />
                {/* {booking.items[0].guests} Guests */}
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

  return (
    <div className="p-6 rounded-xl border bg-white border-border grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="rounded-xl overflow-hidden h-40">
        <Image
          src={"/restau.jpg"}
          width={400}
          height={400}
          alt="Img"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <div className="flex justify-between flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase font-bold w-fit bg-bg-mute p-1 px-2 rounded-md">
              {booking.bookingType}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold">FUFU AND ERU</span>
              <span className="text-xs flex items-center gap-2 text-muted-foreground">
                <HugeiconsIcon icon={Calendar} size={16} />
                Nov 12, 2024
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <span className="text-xs flex gap-1 w-fit items-center p-1 px-2 rounded-full bg-green-500/30 h-fit text-green-500">
              <HugeiconsIcon
                icon={CircleCheck}
                className="fill-green-500 text-white"
                size={12}
              />
              Confirmed
            </span>
            <div className="flex flex-col gap-0.5 md:text-end">
              <span className="text-xs text-muted-foreground">TOTAL PRICE</span>
              <span className="text-xl font-bold">12,000 XAF</span>
            </div>
          </div>
        </div>
        <div className="flex mt-4 justify-between items-center gap-4">
          <Link href={`/account/booking/${booking.id}`}>
            <Button className={"p-4 w-40 rounded-md"}>VIEW RECIEPT</Button>
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
};

export const AllBookingBlock = () => {
  const { data, isError, isLoading } = useGetCustomerBookings();
  console.log({ bookings: data });

  return (
    <main className="flex flex-col gap-6">
      <DashIntro
        heading={"My Bookings"}
        description={"Manage your curated travel experiences across Cameroon."}
      />
      <div className="flex flex-col gap-4">
        {isLoading || !data ? (
          Array.from({ length: 4 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))
        ) : isError ? (
          <div></div>
        ) : data.data.length === 0 ? (
          <> </>
        ) : (
          data.data.map((booking, i) => (
            <BookingHistoryCard booking={booking} key={i} />
          ))
        )}
      </div>
    </main>
  );
};
