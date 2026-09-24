"use client";
import { Button } from "@/components/ui/button";
import SeatPicker from "@/components/ui/SeatPicker";
import { formatPrice } from "@/lib/data";
import { useGetBusSeats } from "@/lib/public/useGetAgencies";
import { cn } from "@/lib/utils";
import {
  Alert01FreeIcons,
  ArrowRight,
  Bus,
  CircleAlert,
  Disability01FreeIcons,
  DotIcon,
  SchoolBusFreeIcons,
  Shield,
  WheelchairFreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { formatDate } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import BookingGuestForm from "../BookingGuestForm";
import { useAgencies } from "@/lib/useAgency";
import { useGetCities } from "@/lib/public/useCitiesAmeneties";
import { SeatPickerSkeleton } from "@/components/loaders/bus/loadingSeatPicker";
import { TripDetailsBlockSkeleton } from "@/components/loaders/bus/tripsDetails";
import { RegistrationReminderBlock } from "@/components/ui/registrationReminderblock";
import { useCustomerTransportPayment } from "@/lib/bearer/form/useTransportBooking";
import { PaymentMethodSelectionGrid } from "@/components/payments/MethodSelectionGrid";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUserStore } from "@/lib/useUserStore";
import { Loader } from "@/components/ui/Loader";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const RouteDetailsBlock = () => {
  const params = useParams<{ busId: string; route: string }>();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [paymentMethod, setSelectedPayment] = useState("poem_pay");
  const { agencies } = useAgencies();
  const { user } = useUserStore();
  const router = useRouter();
  const userCookie = Cookies.get("token");

  const { mutate, isPending } = useCustomerTransportPayment();
  const { data: cities, isLoading: citiesLoading } = useGetCities();
  const {
    data: seats,
    isLoading: seatsLoading,
    isError,
    refetch,
  } = useGetBusSeats(String(params.busId));

  const agency = agencies.find((a) => a.id === params.route);
  const trip = agency?.routes
    .flatMap((route) => route.trips)
    .find(
      (routeTrip) =>
        routeTrip.id === params.busId || routeTrip.busId === params.busId,
    );
  const route = agency?.routes.find(
    (agencyRoute) => agencyRoute.id === trip?.routeId,
  );
  const originCity = cities?.data.find(
    (city) => city.id === route?.originCityId,
  );
  const destinationCity = cities?.data.find(
    (city) => city.id === route?.destinationCityId,
  );

  if (citiesLoading) {
    return <TripDetailsBlockSkeleton />;
  }

  if (!trip || !route || !originCity || !destinationCity) {
    return (
      <div className="mt-5">
        <Empty>
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="bg-destructive/20 text-destructive"
            >
              <HugeiconsIcon icon={SchoolBusFreeIcons} size={40} />
            </EmptyMedia>
            <EmptyTitle>Error</EmptyTitle>
            <EmptyDescription>Error getting drip details</EmptyDescription>
            <EmptyContent>
              <Button
                variant={"outline"}
                className={"h-9 min-w-30"}
                onClick={() => router.back()}
              >
                Back
              </Button>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  const handlePaymentInitiation = () => {
    mutate(
      {
        bookingType: "transport",
        items: [
          {
            itemId: trip.id,
            startDatetime: new Date(trip.departureTime),
            itemType: "bus_ticket",
            quantity: selectedSeats.length,
            guests: selectedSeats.map((seat) => ({
              fullName: `${user?.data.firstName} ${user?.data.lastName}`,
              phoneNumber: `${user?.data.lastName}`,
              seatNumber: seat,
            })),
          },
        ],
      },
      {
        onSuccess: (response) => {
          toast.success("Ticket booking successful.");
          Cookies.set("bookingRef", response.data.bookingReference);
          router.push(
            `/payment/local?paymentMethod=${paymentMethod}&bookingId=${response.data.id}`,
          );
        },
        onError: (error) => {
          console.log({ error });
          toast.error(error.message);
        },
      },
    );
  };

  // const Filters = [
  //   {
  //     value: "selected",
  //     label: "Selected",
  //   },
  //   {
  //     value: "available",
  //     label: "Available",
  //   },
  //   {
  //     value: "occupied",
  //     label: "Occupied",
  //   },
  // ];

  const policies = [
    "VIP tickets include refreshment and priority boarding.",
    "Classic seats offer full air-conditioning and movies.",
    "Arrive 45 mins early for luggage tagging.",
  ];
  return (
    <main className="container-x flex flex-col mt-(--mobile-nav-height) md:mt-(--nav-height) gap-10 md:gap-20">
      <div className="p-6 w-full flex-col md:flex-row gap-4 rounded-2xl bg-bg-mute/50 flex md:items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-primary flex gap-1.5 text-[14px]">
            <HugeiconsIcon icon={Bus} size={20} className="text-primary" />
            Trip Selection
          </span>
          <span className="text-2xl font-bold mt-4">
            {originCity.name} to {destinationCity.name}
          </span>
          <p className="text-xs text-muted-foreground">
            {formatDate(new Date(), "EEEE, MMM d")} •{" "}
            {formatDate(new Date(trip.departureTime), "hh:mm a")} •{" "}
            {agency?.name}
          </p>
        </div>
        <div className="bg-white flex gap-2 p-2 rounded-xl">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary-foreground text-white">
            <HugeiconsIcon
              icon={Shield}
              className="font-bold"
              strokeWidth={1}
            />
          </div>
          <div className="flex flex-col ">
            <span className="text-xs text-muted-foreground">Operator</span>
            <span className="font-bold">
              {agency?.name} ({trip.bus.seatCapacity} Seater)
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="flex flex-col md:col-span-3 gap-4">
          <div className="w-full flex-col md:flex-row flex justify-between gap-2 md:items-center">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Select your seat</span>
              <span className="text-muted-foreground text-xs">
                {trip.bus.seatCapacity}-Seater Executive Coach
              </span>
            </div>

            {/* <div className="flex gap-4">
              {Filters.map((filte, i) => (
                <div
                  key={i}
                  className="flex text-muted-foreground gap-1 items-center text-xs"
                >
                  <Input type="checkbox" value={filte.value} />
                  <span>{filte.label}</span>
                </div>
              ))}
            </div> */}
          </div>
          <div className="w-full p-4 bg-bg-mute rounded-2xl">
            {seatsLoading || !seats ? (
              <SeatPickerSkeleton />
            ) : isError ? (
              <div className="mt-5">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia
                      variant="icon"
                      className="bg-destructive/20 text-destructive"
                    >
                      <HugeiconsIcon icon={Disability01FreeIcons} size={40} />
                    </EmptyMedia>
                    <EmptyTitle>Error</EmptyTitle>
                    <EmptyDescription>
                      There seems to be an error getting bus seats. Please try
                      again.
                    </EmptyDescription>
                    <EmptyContent>
                      <Button
                        variant={"outline"}
                        className={"h-9 min-w-30"}
                        onClick={() => refetch()}
                      >
                        Try Again
                      </Button>
                    </EmptyContent>
                  </EmptyHeader>
                </Empty>
              </div>
            ) : (
              <SeatPicker
                seats={seats?.data.seats}
                onSeatsChange={(selectedSeats, seats) =>
                  setSelectedSeats(selectedSeats)
                }
              />
            )}
          </div>
          <div className="p-6 bg-bg-mute/50 flex rounded-2xl gap-2">
            <div className=" h-fit w-fit p-2 bg-destructive/5 flex items-center justify-center rounded-full text-destructive">
              <HugeiconsIcon icon={Alert01FreeIcons} size={25} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Cancellation Policy</span>
              <p className="text-xs text-muted-foreground">
                Life happens. If you need to cancel your trip, please note that{" "}
                <span className="text-destructive">
                  10% of the fare will be deducted
                </span>{" "}
                as a processing fee. Cancellations are valid until 2 hours
                before scheduled departure.
              </p>
            </div>
          </div>
        </div>
        <div className="sticky top-[calc(var(--nav-height)+10px)] flex flex-col gap-6 h-fit md:h-[calc(100vh+9%)]">
          <div className="flex h-fit flex-col gap-6 p-6 bg-white border-border border rounded-2xl">
            <span className="font-bold">Booking Details</span>
            <div className="flex flex-1 flex-col justify-center">
              {selectedSeats.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col pb-2 border-b border-border">
                    <span className="text-xs text-primary font-black">
                      Route
                    </span>
                    <span className="text-xs font-bold">
                      {originCity.name} to {destinationCity.name}
                    </span>
                  </div>
                  <div className="flex flex-col pb-2 border-b border-border">
                    <span className="text-xs">Selected Seats</span>
                    <div className="flex gap-1">
                      {selectedSeats.map((seat, i) => (
                        <span
                          key={i}
                          className="text-xs font-bold p-2 border-border flex items-center justify-center border rounded-md w-10 mt-2 text-primary bg-primary/10"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-border">
                    <span className="text-xs ">Price / seat</span>
                    <span className="text-xs font-bold">
                      {formatPrice(trip.basePrice)}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-muted-foreground">
                        Total Amount
                      </span>
                      <div className="text-end flex-col flex">
                        <span className="text-[10px] text-primary">
                          ESTIMATED
                        </span>
                        <span className="font-bold">
                          {formatPrice(
                            selectedSeats.length * Number(trip.basePrice),
                          )}
                        </span>
                      </div>
                    </div>
                    {userCookie ? (
                      <Button
                        onClick={() => handlePaymentInitiation()}
                        disabled={selectedSeats.length === 0 || isPending}
                        className={"p-6 mt-2 w-full"}
                      >
                        {isPending ? (
                          <Loader />
                        ) : (
                          <>
                            Confirm & Proceed{" "}
                            <HugeiconsIcon icon={ArrowRight} />
                          </>
                        )}
                      </Button>
                    ) : (
                      <BookingGuestForm
                        iteminfo={{
                          itemId: trip.id,
                          seats: selectedSeats,
                          quantity: selectedSeats.length,
                          startDatetime: trip.departureTime,
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center flex-1 justify-center gap-3">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/5 text-primary">
                    <HugeiconsIcon icon={WheelchairFreeIcons} size={24} />
                  </div>
                  <p className="text-muted-foreground text-xs text-center">
                    No seats selected. Choose your seats from the{" "}
                    {trip.bus.seatCapacity}- seater map.
                  </p>
                </div>
              )}
              <div className="flex w-full justify-between ">
                <PaymentMethodSelectionGrid
                  value={paymentMethod}
                  className="grid-cols-4 grid md:grid-cols-4 gap-2"
                  onChange={(e) => setSelectedPayment(e)}
                  size="mini"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-6 text-white rounded-2xl bg-secondary-foreground">
            <span className="font-bold flex items-center gap-2">
              <HugeiconsIcon
                icon={CircleAlert}
                className="text-primary"
                size={15}
              />
              Trip Policies
            </span>
            <div className="mt-2 text-xs flex flex-col gap-2">
              {policies.map((policy, i) => (
                <span className="flex opacity-75" key={i}>
                  <HugeiconsIcon icon={DotIcon} size={30} />
                  <span className="text-[12px]">{policy}</span>
                </span>
              ))}
            </div>
          </div>
          <RegistrationReminderBlock />
        </div>
      </div>
    </main>
  );
};
