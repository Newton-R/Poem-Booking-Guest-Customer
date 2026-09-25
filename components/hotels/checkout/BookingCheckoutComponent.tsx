"use client";

import { CompleteReservationSkeleton } from "@/components/loaders/ReservationSkeleton";
import { PaymentMethodSelectionGrid } from "@/components/payments/MethodSelectionGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { RegistrationReminderBlock } from "@/components/ui/registrationReminderblock";
import { useInitiateCustomerApartmentBooking } from "@/lib/bearer/form/useApartmentBooking";
import { useInitiateCustomerHotelBooking } from "@/lib/bearer/form/useHotelBooking";
import { formatPrice } from "@/lib/data";
import {
  useGuestApartmentInfo,
  useInitiateApartmentBooking,
} from "@/lib/public/form/useApartmentBooking";
import {
  useGuestBookingInfo,
  useInitiateHotelBooking,
} from "@/lib/public/form/useHotelBooking";
import { useGetRoomDetails } from "@/lib/public/useGetHotels";
import { BookingItem, GuestHotelFormBookingData } from "@/lib/types/booking";
import { ApartmentBookingItem } from "@/lib/types/apartmentbooking";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Controller,
  HandshakeFreeIcons,
  Lock,
  Payment01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { differenceInDays, formatDate } from "date-fns";
import Cookies from "js-cookie";
import { AnimatePresence, motion as m } from "motion/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { toast } from "sonner";
import { useGetApartmentDetails } from "@/lib/public/useGetApartments";

export type BookingType = "hotel" | "apartment";

interface BookingCheckoutComponentProps {
  bookingType: BookingType;
}

const initialGuestInfo: GuestHotelFormBookingData = {
  email: "",
  fullName: "",
  idDocumentNumber: "",
  phoneNumber: "",
  idDocumentType: "national_id",
};

export const BookingCheckoutComponent = ({
  bookingType,
}: BookingCheckoutComponentProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams<{ id: string; hotel: string; room: string }>();
  const userCookie = Cookies.get("token");
  const isHotel = bookingType === "hotel";
  const resourceId = isHotel ? String(params.room) : String(params.id);
  const { data: room, isLoading: isRoomLoading } = useGetRoomDetails(
    isHotel ? String(params.hotel) : "",
    isHotel ? String(params.room) : "",
  );
  const { data: apartment, isLoading: isApartmentLoading } =
    useGetApartmentDetails(params.id);
  const entry = new Date(String(searchParams.get("checkIn")));
  const exit = new Date(String(searchParams.get("checkOut")));
  const days = differenceInDays(exit, entry);
  const adults = Number(searchParams.get("adults"));
  const selectedRoom = room?.data;
  const selectedApartment = apartment?.data;
  const price = isHotel
    ? Number(selectedRoom?.basePrice ?? 0)
    : Number(selectedApartment?.base_price_per_night ?? 0);
  const displayName = isHotel ? selectedRoom?.name : selectedApartment?.title;

  const [bookingAsGuest, setBookingAsGuest] = useState(!userCookie);
  const [guestInfo, setGuestInfo] = useState(initialGuestInfo);
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("poem_pay");

  const { mutate: createHotelGuest, isPending: hotelGuestPending } =
    useGuestBookingInfo();
  const { mutate: createHotelBooking, isPending: hotelBookingPending } =
    useInitiateHotelBooking();
  const { mutate: createApartmentGuest, isPending: apartmentGuestPending } =
    useGuestApartmentInfo();
  const { mutate: createApartmentBooking, isPending: apartmentBookingPending } =
    useInitiateApartmentBooking();
  const {
    mutate: createCustomerHotelBooking,
    isPending: customerHotelPending,
  } = useInitiateCustomerHotelBooking();
  const {
    mutate: createCustomerApartmentBooking,
    isPending: customerApartmentPending,
  } = useInitiateCustomerApartmentBooking();

  const isPending =
    hotelGuestPending ||
    hotelBookingPending ||
    apartmentGuestPending ||
    apartmentBookingPending ||
    customerHotelPending ||
    customerApartmentPending;

  const goToPayment = (response: {
    data: { bookingReference: string; id: string };
  }) => {
    Cookies.set("bookingRef", response.data.bookingReference);
    router.push(
      `/payment/local?paymentMethod=${paymentMethod}&bookingId=${response.data.id}`,
    );
  };

  const initiateBooking = () => {
    const item: BookingItem | ApartmentBookingItem = isHotel
      ? {
          itemType: "hotel_room",
          itemId: resourceId,
          endDatetime: String(searchParams.get("checkOut")),
          startDatetime: String(searchParams.get("checkIn")),
          guests: [{ fullName: guestInfo.fullName, passengerType: "adult" }],
          quantity: 1,
        }
      : {
          itemType: "apartment",
          itemId: resourceId,
          endDatetime: String(searchParams.get("checkOut")),
          startDatetime: String(searchParams.get("checkIn")),
          quantity: 1,
        };

    if (userCookie && !bookingAsGuest) {
      const onSuccess = (response: {
        data: { bookingReference: string; id: string };
      }) => {
        toast.success("Booking initiated. Proceed to payment.");
        goToPayment(response);
      };
      const onError = (error: Error) => toast.error(error.message);
      if (isHotel) {
        createCustomerHotelBooking(
          { bookingType: "hotel", items: [item as BookingItem] },
          { onSuccess, onError },
        );
      } else {
        createCustomerApartmentBooking(
          { bookingType: "apartment", items: [item as ApartmentBookingItem] },
          { onSuccess, onError },
        );
      }
      return;
    }

    const createGuestBooking = (guestCustomerId: string) => {
      const onSuccess = (response: {
        data: { bookingReference: string; id: string };
      }) => {
        toast.success("Booking request successful.");
        goToPayment(response);
      };
      const onError = (error: Error) => toast.error(error.message);
      if (isHotel) {
        createHotelBooking(
          {
            bookingType: "hotel",
            guestCustomerId,
            idempotencyKey: guestCustomerId,
            items: [item as BookingItem],
          },
          { onSuccess, onError },
        );
      } else {
        createApartmentBooking(
          {
            bookingType: "apartment",
            guestCustomerId,
            items: [item as ApartmentBookingItem],
          },
          { onSuccess, onError },
        );
      }
    };

    const onGuestSuccess = (response: { data: { id: string } }) =>
      createGuestBooking(response.data.id);
    const onGuestError = (error: Error) => toast.error(error.message);
    if (isHotel) {
      createHotelGuest(guestInfo, {
        onSuccess: onGuestSuccess,
        onError: onGuestError,
      });
    } else {
      createApartmentGuest(guestInfo, {
        onSuccess: onGuestSuccess,
        onError: onGuestError,
      });
    }
  };

  const handleFormInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGuestInfo((previous) => ({ ...previous, [name]: value }));
  };

  if (
    isHotel
      ? isRoomLoading || !selectedRoom
      : isApartmentLoading || !selectedApartment
  ) {
    return <CompleteReservationSkeleton />;
  }

  return (
    <section className="lg:mt-[calc(var(--nav-height)+10px)] mt-(--mobile-nav-height) container-x flex flex-col gap-2">
      <h2>Complete your reservation</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 mt-4 gap-6">
        <div className="md:col-span-3 flex flex-col gap-6">
          <div className="p-6 bg-bg-mute rounded-2xl relative overflow-hidden">
            <div className="w-full justify-between mb-4 items-center flex">
              <span className="flex gap-2 items-center">
                <div className="size-8 bg-secondary-foreground flex items-center justify-center rounded-md text-white">
                  <HugeiconsIcon icon={Controller} size={16} />
                </div>
                Guest Details
              </span>
              {userCookie && (
                <Button
                  onClick={() => setBookingAsGuest(!bookingAsGuest)}
                  className="p-2 h-9"
                >
                  Continue as User
                </Button>
              )}
            </div>
            <AnimatePresence initial={false}>
              {userCookie && !bookingAsGuest && (
                <m.div
                  initial={{ y: "-100%", opacity: 1 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 p-4 bg-white rounded-2xl border border-border flex items-center justify-center flex-col gap-2"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full">
                    <HugeiconsIcon icon={HandshakeFreeIcons} />
                  </div>
                  <span className="font-bold">Booking for a friend?</span>
                  <p className="text-muted-foreground text-[14px] max-w-sm mx-auto text-center">
                    Booking for a friend or want to book as a guest? Add their
                    details below no account needed to check in, and you&apos;ll
                    still manage the booking and payment.
                  </p>
                  <Button
                    onClick={() => setBookingAsGuest(!bookingAsGuest)}
                    className="p-2 px-4 h-9 mt-2"
                  >
                    Book for a friend
                  </Button>
                </m.div>
              )}
            </AnimatePresence>
            <form className="flex flex-col gap-5">
              <Input
                onChange={handleFormInput}
                name="fullName"
                value={guestInfo.fullName}
                placeholder="FullName"
                className="p-6 bg-white"
              />
              <div className="flex justify-between gap-4">
                <Input
                  placeholder="Email"
                  onChange={handleFormInput}
                  value={guestInfo.email}
                  name="email"
                  type="email"
                  className="p-6 bg-white flex-1"
                />
                <Input
                  onChange={handleFormInput}
                  value={guestInfo.phoneNumber}
                  name="phoneNumber"
                  placeholder="Phone"
                  type="number"
                  className="p-6 bg-white flex-1"
                />
              </div>
              <div className="flex pb-3 border-b flex-col md:flex-row border-border gap-4">
                <Input
                  placeholder="ID Number"
                  value={guestInfo.idDocumentNumber}
                  onChange={handleFormInput}
                  name="idDocumentNumber"
                  className="p-6 bg-white"
                />
                <Input
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="Promotional Code (optional)"
                  className="p-6 bg-white"
                />
              </div>
              <div className="flex gap-3 flex-col">
                <p className="text-xs text-muted-foreground">
                  How should we send your booking reminders and checkups?
                </p>
                <div className="flex text-[14px] items-center gap-2">
                  {["Email", "SMS", "Whatsapp"].map((service, index) => (
                    <span
                      key={service}
                      className={cn(
                        "p-2 px-4 rounded-full",
                        index === 0 ? "bg-primary" : "",
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
                  <Input type="checkbox" className="w-4 h-4" value="" />
                  <span className="text-xs text-muted-foreground">
                    Same as phone number
                  </span>
                </div>
              </div>
            </form>
          </div>
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
            <div className="flex flex-col gap-2 p-6">
              <div className="grid-cols-2 grid gap-3 pb-4 border-b border-border">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px]">
                    CHECK IN
                  </span>
                  <span className="font-bold">
                    {formatDate(entry, "EEE, dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-[10px]">
                    CHECK OUT
                  </span>
                  <span className="font-bold">
                    {formatDate(exit, "EEE, dd MMM yyyy")}
                  </span>
                </div>
                {isHotel && (
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-[10px]">
                      TRAVELERS
                    </span>
                    <span className="font-bold">
                      {adults} Adults, {displayName}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex mt-3 flex-col gap-2 text-[14px]">
                <span className="text-xs font-semibold mb-4">
                  PRICE BREAKDOWN
                </span>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>Nights</span>
                    <span>{days} Night(s)</span>
                  </div>
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>Price Per Night</span>
                    <span>{formatPrice(price)}</span>
                  </div>
                  <div className="flex justify-between w-full text-muted-foreground items-center">
                    <span>Total payable</span>
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(price * days)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <Button
                      disabled={isPending}
                      onClick={initiateBooking}
                      className="p-6 w-full text-[14px]"
                    >
                      {isPending ? (
                        <Loader />
                      ) : (
                        <>
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
          <RegistrationReminderBlock />
        </div>
      </div>
    </section>
  );
};

export const BookingCheckoutSuspense = ({
  bookingType,
}: BookingCheckoutComponentProps) => (
  <Suspense>
    <BookingCheckoutComponent bookingType={bookingType} />
  </Suspense>
);
