import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01FreeIcons,
  CheckmarkCircle02Icon,
  Copy01FreeIcons,
  Bus02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { formatDate } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCancelBooking } from "@/lib/public/form/useCancelBooking";
import { toast } from "sonner";
import { Loader } from "../ui/Loader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TransportBookingData } from "@/lib/types/booking_data";

interface TransportBookingInfoCardProps {
  booking: TransportBookingData;
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  failed: "destructive",
};

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m > 0 ? `${m}m` : ""}`.trim();
}

export function TransportBookingInfoCard({
  booking,
}: TransportBookingInfoCardProps) {
  const {
    bookingReference,
    bookingStatus,
    finalAmount,
    currency,
    discountAmount,
    createdAt,
    customerPhoneNumber,
    guestCustomer,
  } = booking;

  const item = booking.items[0];
  const { guests, service } = item;
  const { transport } = service;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const { mutate, isPending } = useCancelBooking(
    bookingReference,
    String(customerPhoneNumber),
  );

  const handleCancel = () => {
    mutate(
      { ref: bookingReference, number: String(customerPhoneNumber) },
      {
        onSuccess: () => {
          toast.success("Booking cancelled successfully..");
          router.push("/");
        },
        onError: (e) => {
          toast.error(e.message ?? "Something went wrong");
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-md rounded-[11px]">
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          size={40}
          className="text-primary"
        />
        <CardTitle className="text-xl">Booking Confirmed</CardTitle>
        <Badge variant={statusVariant[bookingStatus]} className="capitalize">
          {bookingStatus}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Agency info */}
        <div className="flex items-center gap-3 rounded-xl border border-border p-3">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon
              icon={Bus02Icon}
              size={22}
              className="text-primary"
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-semibold truncate">
              {transport.agencyName}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {service.name}
            </span>
          </div>
        </div>

        <Separator />

        {/* Route timeline */}
        <div className="flex flex-col gap-3 rounded-xl bg-muted p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-lg font-bold">
                {formatDate(new Date(service.startDatetime), "hh:mm a")}
              </span>
              <span className="font-medium">{transport.originCity}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 pt-1.5 flex-1">
              <div className="flex h-0.5 relative bg-gray-400 w-full items-center">
                <div className="size-2 rounded-full border border-gray-400 bg-background absolute -left-1" />
                <div className="size-2 rounded-full border bg-primary border-gray-400 absolute -right-1" />
              </div>
              <span className="text-xs text-primary whitespace-nowrap">
                {formatDuration(transport.estimatedDurationMinutes)} &bull;{" "}
                {transport.distanceKm}km
              </span>
            </div>
            <div className="flex flex-col text-end">
              <span className="text-lg font-bold">
                {formatDate(new Date(service.endDatetime), "hh:mm a")}
              </span>
              <span className="font-medium">{transport.destinationCity}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground pt-1 border-t border-border/60">
            {formatDate(new Date(service.startDatetime), "EEE, dd MMM yyyy")}
          </span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            BOOKING REFERENCE
          </span>
          <button
            onClick={() => copyToClipboard(bookingReference)}
            className="flex items-center gap-1 text-sm font-semibold"
          >
            {bookingReference}
            <HugeiconsIcon icon={Copy01FreeIcons} size={14} />
          </button>
        </div>

        <Separator />

        {/* Passengers + seats */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground">
            PASSENGER(S) & SEAT(S)
          </span>
          <div className="flex flex-col gap-2">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className="flex items-center justify-between rounded-lg border border-border p-2.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <HugeiconsIcon
                    icon={UserIcon}
                    size={16}
                    className="text-muted-foreground shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">
                      {guest.fullName}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">
                      {guest.passengerType}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  Seat {guest.seatNumber}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">BOOKED BY</span>
            <span className="font-medium">{guestCustomer.fullName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">AMOUNT PAID</span>
            <span className="font-medium">
              {currency} {finalAmount}
            </span>
          </div>
          {Number(discountAmount) > 0 && (
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">DISCOUNT</span>
              <span className="font-medium text-green-600">
                -{currency} {discountAmount}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">BOOKED ON</span>
            <span className="font-medium">
              {formatDate(new Date(createdAt), "EEE, dd MMM yyyy")}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center gap-1 rounded-xl bg-muted p-4">
          <span className="text-xs text-muted-foreground">CHECK-IN OTP</span>
          <span className="text-2xl font-bold tracking-widest">
            {booking.checkinOtp}
          </span>
        </div>

        <Separator />
        <div className="flex flex-col md:flex-row gap-4">
          <Dialog open={isOpen}>
            <DialogTrigger className={"w-full"}>
              <Button
                onClick={() => setIsOpen(true)}
                className={"w-full h-10"}
                variant={"destructive"}
              >
                <HugeiconsIcon icon={Cancel01FreeIcons} /> Cancel Booking
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogTitle className={"text-xl font-bold"}>
                Cancel Booking
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel? This action can't be undone.
              </DialogDescription>
              <DialogFooter>
                <DialogClose>
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className={"p-2 w-full h-9"}
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleCancel}
                  type="button"
                  disabled={isPending}
                  className={"h-9 min-w-30"}
                >
                  {isPending ? <Loader /> : "Keep Going"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
