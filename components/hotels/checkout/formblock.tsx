"use client";
import { PaymentMethodSelectionGrid } from "@/components/payments/MethodSelectionGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { formatPrice } from "@/lib/data";
import {
  useGuestBookingInfo,
  useInitiateHotelBooking,
} from "@/lib/public/form/useHotelBooking";
import { BookingItem, GuestHotelFormBookingData } from "@/lib/types/booking";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Controller,
  Lock,
  Payment01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatDate } from "date-fns";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { toast } from "sonner";

export const CheckoutFormBlock = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const roomId = String(params.room);

  const bookingData = {
    entry: new Date(String(searchParams.get("checkIn"))),
    exit: new Date(String(searchParams.get("checkOut"))),
    days: Number(searchParams.get("days")),
    adults: Number(searchParams.get("adults")),
    roomType: String(searchParams.get("roomtype")),
    price: Number(searchParams.get("per_price")),
  };

  const [GuestInfo, setGuestInfo] = useState<GuestHotelFormBookingData>({
    email: "",
    fullName: "",
    idDocumentNumber: "",
    phoneNumber: "",
    idDocumentType: "national_id",
  });

  const [promoCode, setPromoCode] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("poem_pay");

  const { mutate, isPending } = useGuestBookingInfo();
  const { mutate: HotelMutation, isPending: booking } =
    useInitiateHotelBooking();

  const InitiateBooking = () => {
    const BookedItemData: BookingItem = {
      itemType: "hotel_room",
      itemId: roomId,
      endDatetime: String(searchParams.get("checkOut")),
      startDatetime: String(searchParams.get("checkIn")),
      guests: [{ fullName: GuestInfo.fullName, passengerType: "adult" }],
      quantity: Number(searchParams.get("adults")),
    };

    mutate(GuestInfo, {
      onSuccess: (response) => {
        HotelMutation(
          {
            bookingType: "hotel",
            guestCustomerId: response.data.id,
            idempotencyKey: response.data.id,
            items: [BookedItemData],
          },
          {
            onSuccess: (response) => {
              console.log({ bookResponse: response });
              toast.success("Hotel room booked successfully 🎉");
              router.push(
                `/payment/local?paymentMethod=${paymentMethod}&bookingId=${response.data.id}`,
              );
            },
            onError: (e) => {
              console.log({ error: e });
              toast.error(e.message);
            },
          },
        );
        console.log({ guest: response });
        toast.success("Guest key created successfully. Booking hotel..");
      },
      onError: (e) => {
        console.log({ error: e });
        toast.error(e.message);
      },
    });
  };

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="lg:mt-[calc(var(--nav-height)+10px)] mt-(--mobile-nav-height) container-x flex flex-col gap-2">
      <h2>Complete your reservation</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 mt-4 gap-6">
        <div className="md:col-span-3 flex flex-col gap-6">
          <div className="p-6 bg-bg-mute rounded-2xl">
            <span className="flex gap-2 items-center mb-4">
              <div className="size-8 bg-secondary-foreground flex items-center justify-center rounded-md text-white">
                <HugeiconsIcon icon={Controller} size={16} />
              </div>
              Guest Details
            </span>

            {/* Guest form */}
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Input
                  onChange={handleFormInput}
                  name="fullName"
                  value={GuestInfo.fullName}
                  placeholder="FullName"
                  className="p-6 bg-white"
                />
              </div>
              <div className="flex justify-between gap-4">
                <Input
                  placeholder="Email"
                  onChange={handleFormInput}
                  value={GuestInfo.email}
                  name="email"
                  type="email"
                  className="p-6 bg-white flex-1"
                />
                <Input
                  onChange={handleFormInput}
                  value={GuestInfo.phoneNumber}
                  name="phoneNumber"
                  placeholder="Phone"
                  type="number"
                  className="p-6 bg-white flex-1"
                />
              </div>
              <div className="flex pb-3 border-b flex-col md:flex-row border-border gap-4">
                <Input
                  placeholder="ID Number"
                  value={GuestInfo.idDocumentNumber}
                  onChange={handleFormInput}
                  name="idDocumentNumber"
                  className="p-6 bg-white"
                />
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promotional Code (optional)"
                  className="p-6 bg-white"
                />
              </div>
              <div className="flex gap-3 flex-col">
                <p className="text-xs text-muted-foreground">
                  How should we send your booking reminders and checkups?
                </p>
                <div className="flex  text-[14px] items-center gap-2">
                  {["Email", "SMS", "Whatsapp"].map((service, i) => (
                    <span
                      className={cn(
                        "p-2 px-4 rounded-full",
                        i === 0 ? "bg-primary" : "",
                      )}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Input placeholder="Whatsapp Number" className="p-6 bg-white" />
                <div className="flex items-center gap-2 mt-2">
                  <Input type="checkbox" className="w-4 h-4" value={""} />
                  <span className="text-xs text-muted-foreground">
                    Same as phone number
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="p-6 bg-bg-mute rounded-2xl flex flex-col gap-6">
            <span className="flex gap-2 items-center">
              <div className="size-8 bg-secondary-foreground flex items-center justify-center rounded-md text-white">
                <HugeiconsIcon
                  icon={Payment01FreeIcons}
                  className="opacity-55"
                  size={16}
                />
              </div>
              Payment Method
            </span>
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">
                Select your preferred secure payment provider. All transactions
                are encrypted.
              </p>
              <PaymentMethodSelectionGrid
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex flex-col rounded-2xl border border-border shadow-md gap-4">
            <div></div>
            <div className="flex flex-col gap-2 p-6">
              <div className="grid-cols-2 grid gap-3 pb-4 border-b border-border">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px]">
                    CHECK IN
                  </span>
                  <span className="font-bold">
                    {formatDate(bookingData.entry, "EEE, dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px]">
                    CHECK OUT
                  </span>
                  <span className="font-bold">
                    {" "}
                    {formatDate(bookingData.exit, "EEE, dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px]">
                    TRAVELERS
                  </span>
                  <span className="font-bold">
                    {bookingData.adults} Adults, {bookingData.roomType}
                  </span>
                </div>
              </div>
              <div className="flex mt-3 flex-col gap-2 text-[14px]">
                <span className="text-xs font-semibold mb-4">
                  PRICE BREAKDOWN
                </span>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>Nights</span>
                    <span>{bookingData.days} Night(s)</span>
                  </div>
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>Price Per Night</span>
                    <span>{formatPrice(bookingData.price)}</span>
                  </div>

                  {/* <div className="flex border-b-2 border-primary pb-3 justify-between w-full text-muted-foreground items-center">
                    <span>Service Fee</span>
                    <span>375,000 XAF</span>
                  </div> */}
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>Total payable</span>
                    <div className="flex flex-col text-end">
                      <span className="text-xl font-bold text-primary">
                        {formatPrice(bookingData.days * bookingData.price)}
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        All taxes included
                      </span>
                    </div>
                  </div>
                  {/* continue button */}
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <Button
                      disabled={booking || isPending}
                      onClick={InitiateBooking}
                      className={"p-6 w-full text-[14px]"}
                    >
                      {booking || isPending ? (
                        <Loader />
                      ) : (
                        <>
                          {" "}
                          Complete Booking{" "}
                          <HugeiconsIcon icon={ArrowRight} size={20} />
                        </>
                      )}
                    </Button>
                    <span className="flex mt-2 gap-1 items-center text-muted-foreground text-[10px]">
                      <HugeiconsIcon icon={Lock} size={10} />
                      Secure 256-bit SSL Encrypted Connection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 flex text-center rounded-2xl flex-col gap-2 border items-center justify-center border-primary bg-primary/10">
            <p className="text-xs">
              Register and earn free tokens on each transaction
            </p>
            <Button className={"w-full p-6"}>Register Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CheckoutSuspenseBlock = () => {
  return (
    <Suspense>
      <CheckoutFormBlock />
    </Suspense>
  );
};
