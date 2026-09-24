import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight } from "@hugeicons/core-free-icons";
import { Input } from "../ui/input";
import { PaymentMethodSelectionGrid } from "../payments/MethodSelectionGrid";
import {
  useGetGuestTransportDetails,
  useTransportPaymentInitiate,
} from "@/lib/public/form/useTransport";
import { toast } from "sonner";
import { Loader } from "../ui/Loader";
import { error, info } from "next/dist/build/output/log";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface PassengerFormData {
  fullname: string;
  idnumber: string;
  phone: string;
  email: string;
  promotionalCode: string;
}

interface PassengerFormProps {
  onSubmit?: (data: PassengerFormData) => void;
  iteminfo: {
    itemId: string;
    startDatetime: string;
    quantity: number;
    seats: string[];
  };
}

const BookingGuestForm = ({ iteminfo }: PassengerFormProps) => {
  const [formData, setFormData] = useState<PassengerFormData>({
    fullname: "",
    idnumber: "",
    phone: "",
    email: "",
    promotionalCode: "",
  });
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("poem_pay");
  const { mutate, isPending } = useGetGuestTransportDetails();
  const { mutate: TransportPayment, isPending: IsPaying } =
    useTransportPaymentInitiate();

  const handleInitiateGuestPayment = () => {
    mutate(
      {
        email: formData.email,
        fullName: formData.fullname,
        idDocumentNumber: formData.idnumber,
        phoneNumber: formData.phone,
        idDocumentType: "national_id",
      },
      {
        onSuccess: (response) => {
          console.log({ transport_reponse: response });
          toast.success("Guest key created successfully");
          TransportPayment(
            {
              bookingType: "transport",
              guestCustomerId: response.data.id,
              items: [
                {
                  itemId: iteminfo.itemId,
                  startDatetime: new Date(iteminfo.startDatetime),
                  itemType: "bus_ticket",
                  quantity: iteminfo.quantity,
                  guests: iteminfo.seats.map((seat) => ({
                    fullName: formData.fullname,
                    phoneNumber: formData.phone,
                    seatNumber: seat,
                  })),
                },
              ],
            },
            {
              onSuccess: (response) => {
                toast.success("Ticket booking successful.");
                Cookies.set("bookingRef", response.data.bookingReference);
                console.log({ response });
                // router.push(
                //   `/payment/local?paymentMethod=${paymentMethod}&bookingId=${response.data.id}`,
                // );
              },
              onError: (error) => {
                toast.error(error.message);
              },
            },
          );
        },
        onError: (error) => {
          console.log({ transport_error: error });
          toast.error(error.message ?? "Something went wrong");
        },
      },
    );
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PassengerFormData,
  ) {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleInitiateGuestPayment();
  }
  return (
    <Dialog>
      <DialogTrigger disabled={iteminfo.quantity === 0} className={"w-full"}>
        <Button
          disabled={iteminfo.quantity === 0}
          className={"p-6 my-4 w-full"}
        >
          Confirm & Proceed <HugeiconsIcon icon={ArrowRight} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-xl font-bold">Guest Form</DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <div className="flex flex-col gap-1.5">
            <Input
              id="fullname"
              type="text"
              className="h-10"
              disabled={isPending || IsPaying}
              placeholder="Full Name"
              value={formData.fullname}
              onChange={(e) => handleChange(e, "fullname")}
              required
            />
          </div>

          <div className="flex flex-col w-full md:flex-row gap-4 items-center">
            <div className="flex flex-col w-full gap-1.5">
              {/* <Label htmlFor="idnumber">ID Number</Label> */}
              <Input
                id="idnumber"
                type="text"
                className="h-10"
                placeholder="ID Number"
                disabled={isPending || IsPaying}
                value={formData.idnumber}
                onChange={(e) => handleChange(e, "idnumber")}
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1.5">
              {/* <Label htmlFor="phone">Phone</Label> */}
              <Input
                id="phone"
                className="h-10"
                type="tel"
                placeholder="+237 6XX XXX XXX"
                value={formData.phone}
                disabled={isPending || IsPaying}
                onChange={(e) => handleChange(e, "phone")}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {/* <Label htmlFor="email">Email</Label> */}
            <Input
              id="email"
              type="email"
              disabled={isPending || IsPaying}
              className="h-10"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            {/* <Label htmlFor="promotionalCode">Promotional Code</Label> */}
            <Input
              id="promotionalCode"
              type="text"
              disabled={isPending || IsPaying}
              className="h-10"
              placeholder="Promo Code (Optional)"
              value={formData.promotionalCode}
              onChange={(e) => handleChange(e, "promotionalCode")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">
              Choose payment method
            </p>
            <PaymentMethodSelectionGrid
              value={paymentMethod}
              size="mini"
              onChange={(method) => setPaymentMethod(method)}
              className="grid-cols-4 lg:grid-cols-4 mt-1"
            />
          </div>

          <Button
            disabled={isPending || IsPaying}
            type="submit"
            className="mt-2 h-10"
          >
            {isPending || IsPaying ? <Loader /> : "Continue"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingGuestForm;
