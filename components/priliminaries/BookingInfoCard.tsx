import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01FreeIcons,
  CheckmarkCircle02Icon,
  Copy01FreeIcons,
  Location01Icon,
  Star,
} from "@hugeicons/core-free-icons";
import { GuestBookingDetailsResponseData } from "@/lib/types/booking_data";
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
import Image from "next/image";
interface BookingSuccessCardProps {
  booking: GuestBookingDetailsResponseData;
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  confirmed: "default",
  pending: "secondary",
  failed: "destructive",
};

export function BookingInfoCard({ booking }: BookingSuccessCardProps) {
  const {
    bookingReference,
    bookingStatus,
    bookingType,
    checkinOtp,
    finalAmount,
    currency,
    discountAmount,
    createdAt,
    guestCustomer,
  } = booking;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const { mutate, isPending } = useCancelBooking(
    bookingReference,
    guestCustomer.phoneNumber,
  );

  const handleCancel = () => {
    mutate(
      { ref: bookingReference, number: guestCustomer.phoneNumber },
      {
        onSuccess: (response) => {
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
        {/* Hotel/Property info */}
        <div className="flex items-center gap-3 rounded-xl border border-border p-3">
          <div className="size-16 rounded-lg overflow-hidden shrink-0">
            <img
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                booking.items[0].serviceImageUrl
              }
              width={100}
              height={100}
              alt={booking.hotelName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-semibold truncate">
              {booking.bookingType === "hotel"
                ? booking.items[0].service.hotel.name
                : booking.items[0].service.name}
            </span>
            <span className="text-xs flex items-center gap-1.5 text-muted-foreground truncate">
              <HugeiconsIcon
                icon={Location01Icon}
                size={14}
                className="shrink-0"
              />
              {booking.items[0].service.location.address}
            </span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon
                icon={Star}
                size={14}
                className="text-primary fill-primary"
              />
              {booking.bookingType === "hotel" ? (
                Number(booking.items[0].service.hotel.starRating).toFixed(1)
              ) : (
                <span className="first-letter:uppercase">
                  {booking.items[0].service.kind}
                </span>
              )}
            </span>
          </div>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">GUEST</span>
            <span className="font-medium">{guestCustomer.fullName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">TYPE</span>
            <span className="font-medium capitalize">{bookingType}</span>
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
            <span className="text-xs text-muted-foreground">DATE</span>
            <span className="font-medium">
              {formatDate(
                new Date(createdAt).toLocaleDateString(),
                "EEE, dd MMM yyyy",
              )}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center gap-1 rounded-xl bg-muted p-4">
          <span className="text-xs text-muted-foreground">CHECK-IN OTP</span>
          <span className="text-2xl font-bold tracking-widest">
            {checkinOtp}
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
