"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useParams, useSearchParams } from "next/navigation";
import { useGetGuestBookingDetails } from "@/lib/public/useGetBookingInfo";
import { BookingInfoCardSkeleton } from "../loaders/BookingInfoSkeleton";
import { BookingInfoCard } from "./BookingInfoCard";
import { GuestBookingDetailsResponseData } from "@/lib/types/booking_data";
import { BookingQRCode } from "../BookingQrCode";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { HugeiconsIcon } from "@hugeicons/react";
import { TicketXFreeIcons } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";

const GuestBookingDetailsQrDisplay = () => {
  const params = useParams<{ paymentRef: string }>();
  const paymentRef = params.paymentRef;
  const searchParams = useSearchParams();

  const number = String(searchParams.get("num"));

  const {
    data,
    isLoading: infoLoading,
    isError,
    refetch,
  } = useGetGuestBookingDetails(paymentRef, number);
  console.log({ detais: data });
  if (isError) {
    return (
      <div className="mt-[20px] max-w-md mx-auto">
        <Empty>
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="bg-destructive/20 text-destructive"
            >
              <HugeiconsIcon icon={TicketXFreeIcons} size={40} />
            </EmptyMedia>
            <EmptyTitle>Error fetching details</EmptyTitle>
            <EmptyDescription>
              Check your internet connection & try again.
            </EmptyDescription>
            <EmptyContent>
              <Button className={"min-w-30"} onClick={() => refetch()}>
                Try Again
              </Button>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-w-md p-4 mx-auto">
      <Tabs defaultValue={"details"} className={"mt-4 flex flex-col gap-3"}>
        <TabsList className={"w-full bg-white border min-h-12 border-border"}>
          <TabsTrigger value={"details"}>Details</TabsTrigger>
          <TabsTrigger value={"qr"}>QR Code</TabsTrigger>
        </TabsList>
        <TabsContent
          value={"details"}
          className={"p-1 bg-white rounded-[15px] border border-border"}
        >
          {infoLoading ? (
            <BookingInfoCardSkeleton />
          ) : (
            <BookingInfoCard
              booking={data?.data ?? ({} as GuestBookingDetailsResponseData)}
            />
          )}
        </TabsContent>
        <TabsContent
          value={"qr"}
          className={"p-1 bg-white rounded-[15px] border border-border"}
        >
          <div className="w-full border border-border min-h-90 rounded-[11px] flex items-center justify-center">
            <BookingQRCode initials="GB" data={data?.data.qrToken ?? ""} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestBookingDetailsQrDisplay;
