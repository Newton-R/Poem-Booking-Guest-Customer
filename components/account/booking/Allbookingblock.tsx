"use client";
import React from "react";
import { DashIntro } from "../DashIntro";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Box,
  Calendar,
  CircleCheck,
  CircleXFreeIcons,
  Clock01FreeIcons,
  CloudAlertIcon,
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
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { TransportBookingCard } from "./transportBookingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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
  if (booking.bookingType === "hotel") {
    return (
      <div className="p-6 rounded-xl border bg-white border-border grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Image */}
        <div className="rounded-xl overflow-hidden h-40 relative">
          <img
            src={
              process.env.NEXT_PUBLIC_IMAGE_URL +
              booking.items[0].service.imageUrl
            }
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
                  {booking.items[0].service.name}
                </span>
                <span className="text-xs flex items-center gap-2 text-muted-foreground">
                  <HugeiconsIcon icon={Location01Icon} size={16} />
                  {booking.items[0].service.location.address}
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
                {booking.items[0].guests.length} Guests
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

  if (booking.bookingType === "apartment") {
    return (
      <div className="p-6 rounded-xl border bg-white border-border grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Image */}
        <div className="rounded-xl overflow-hidden h-40 relative">
          <img
            src={
              process.env.NEXT_PUBLIC_IMAGE_URL +
              booking.items[0].service.imageUrl
            }
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
                  {booking.items[0].service.name}
                </span>
                <span className="text-xs flex items-center gap-2 text-muted-foreground">
                  <HugeiconsIcon icon={Location01Icon} size={16} />
                  {booking.items[0].service.location.address}
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
                <span className={"first-letter:uppercase flex-nowrap"}>
                  {" "}
                  {booking.bookingStatus}
                </span>
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
                {booking.items[0].guests.length} Guests
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

  if (booking.bookingType === "transport") {
    return <TransportBookingCard booking={booking} />;
  }
};

const BookingHistoryBlock = ({
  bookings,
}: {
  bookings: GuestBookingDetailsResponseData[];
}) => {
  const Confirmed = bookings.filter(
    (booking) => booking.bookingStatus === "confirmed",
  );
  const Failed = bookings.filter(
    (booking) => booking.bookingStatus === "failed",
  );
  const Pending = bookings.filter(
    (booking) => booking.bookingStatus === "pending",
  );
  const Completed = bookings.filter(
    (booking) => booking.bookingStatus === "completed",
  );
  return (
    <Tabs defaultValue={"all"} className={"w-full"}>
      <TabsList variant={"line"} className={"mb-4"}>
        <TabsTrigger value={"all"}>All ({bookings.length})</TabsTrigger>
        <TabsTrigger value={"Confirmed"}>
          <div className="w-2 h-2 rounded-full bg-green-500" /> Confirmed (
          {Confirmed.length})
        </TabsTrigger>
        <TabsTrigger value={"Complete"}>
          <div className="w-2 h-2 rounded-full bg-purple-500" /> Completed (
          {Completed.length})
        </TabsTrigger>
        <TabsTrigger value={"Failed"}>
          <div className="w-2 h-2 rounded-full bg-red-500" /> Failed (
          {Failed.length})
        </TabsTrigger>
        {/* <TabsTrigger value={"Pending"}>
          <div className="w-2 h-2 rounded-full bg-yellow-500" /> Pending (
          {Pending.length})
        </TabsTrigger> */}
      </TabsList>
      <TabsContent
        className={"flex flex-col w-full bg-amber-5 gap-4"}
        value={"all"}
      >
        {bookings.map((booking, i) => (
          <BookingHistoryCard booking={booking} key={i} />
        ))}
      </TabsContent>
      <TabsContent className={"flex flex-col gap-4"} value={"Complete"}>
        {Completed.map((booking, i) => (
          <BookingHistoryCard booking={booking} key={i} />
        ))}
      </TabsContent>
      <TabsContent className={"flex flex-col gap-4"} value={"Confirmed"}>
        {Confirmed.length > 0 ? (
          Confirmed.map((booking, i) => (
            <BookingHistoryCard booking={booking} key={i} />
          ))
        ) : (
          <div className="mt-5">
            <Empty>
              <EmptyHeader>
                <EmptyMedia
                  variant="icon"
                  className="bg-green-500/20 text-green-500"
                >
                  <HugeiconsIcon icon={CircleCheck} size={40} />
                </EmptyMedia>
                <EmptyTitle>No Booking</EmptyTitle>
                <EmptyDescription>
                  You don't have any confirmed bookings
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </TabsContent>
      <TabsContent className={"flex flex-col gap-4"} value={"Pending"}>
        {Pending.length > 0 ? (
          Pending.map((booking, i) => (
            <BookingHistoryCard booking={booking} key={i} />
          ))
        ) : (
          <div className="mt-5">
            <Empty>
              <EmptyHeader>
                <EmptyMedia
                  variant="icon"
                  className="bg-yellow-500/20 text-yellow-500"
                >
                  <HugeiconsIcon icon={Clock01FreeIcons} size={40} />
                </EmptyMedia>
                <EmptyTitle>No Booking</EmptyTitle>
                <EmptyDescription>
                  You don't have any bookings that are pending
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </TabsContent>
      <TabsContent className={"flex flex-col gap-4"} value={"Failed"}>
        {Failed.length > 0 ? (
          Failed.map((booking, i) => (
            <BookingHistoryCard booking={booking} key={i} />
          ))
        ) : (
          <div className="mt-5">
            <Empty>
              <EmptyHeader>
                <EmptyMedia
                  variant="icon"
                  className="bg-red-500/20 text-red-500"
                >
                  <HugeiconsIcon icon={CircleXFreeIcons} size={40} />
                </EmptyMedia>
                <EmptyTitle>No Booking</EmptyTitle>
                <EmptyDescription>
                  You don't have any failed bookings
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export const AllBookingBlock = () => {
  const { data, isError, isLoading, refetch } = useGetCustomerBookings();
  console.log({ data });
  return (
    <main className="flex flex-col gap-6">
      <DashIntro
        heading={"My Bookings"}
        description={"Manage your curated travel experiences across Cameroon."}
      />
      <div className="flex flex-col w-full gap-4">
        {isLoading || !data ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton className="h-9 w-30" key={i} />
              ))}
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <BookingCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-5">
            <Empty>
              <EmptyHeader>
                <EmptyMedia
                  variant="icon"
                  className="bg-destructive/20 text-destructive"
                >
                  <HugeiconsIcon icon={CloudAlertIcon} size={40} />
                </EmptyMedia>
                <EmptyTitle> Error</EmptyTitle>
                <EmptyDescription>
                  Ooops! there seems to be an error getting your bookings.
                </EmptyDescription>
                <EmptyContent>
                  <Button
                    onClick={() => refetch()}
                    className={"h-9 px-4"}
                    variant={"outline"}
                  >
                    Try Again
                  </Button>
                </EmptyContent>
              </EmptyHeader>
            </Empty>
          </div>
        ) : data.data.length === 0 ? (
          <div className="mt-5">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon icon={Box} size={40} />
                </EmptyMedia>
                <EmptyTitle>No bookings yet</EmptyTitle>
                <EmptyDescription>
                  You don't have any bookings yet. Please checkout{" "}
                  <Link
                    href={"/hotels"}
                    className="hover:underline underline-offset-2 text-primary"
                  >
                    Hotels
                  </Link>
                  ,{" "}
                  <Link
                    href={"/appartment"}
                    className="hover:underline underline-offset-2 text-primary"
                  >
                    Hotels
                  </Link>
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <BookingHistoryBlock bookings={data.data} />
        )}
      </div>
    </main>
  );
};
