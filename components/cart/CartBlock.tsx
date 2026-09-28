"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AlertTriangle,
  CircleCheck,
  CircleStar,
  CircleX,
  Coupon01FreeIcons,
  LoaderIcon,
  Minus,
  Plus,
  Trash,
  X,
} from "@hugeicons/core-free-icons";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CartItem as Item, useCartStore } from "@/lib/useCart";
import { EmptyCart } from "../emptystuff";
import { PaymentMethodSelectionGrid } from "../payments/MethodSelectionGrid";
import { formatPrice } from "@/lib/data";
import { useParams } from "next/navigation";
import { useCheckDeliveryData } from "@/lib/public/useGetRestaurants";

const CartItem = ({ item }: { item: Item }) => {
  const { removeItem, increment, decrement } = useCartStore();
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + item.dish.imageUrl;
  return (
    <div className="py-4 border-b border-border flex flex-col gap-2 md:flex-row justify-between md:items-end">
      <div className="flex items-center gap-3">
        <div className="size-16 shrink-0 rounded-md overflow-hidden">
          <Image
            className="w-full h-full object-cover"
            width={200}
            height={200}
            alt="image"
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <span className="font-bold">{item.dish.name}</span>
            <span className="text-xs text-muted-foreground">
              {item.specifications}
            </span>
          </div>
          <span className="font-bold text-primary mt-auto">
            {formatPrice(Number(item.price))}
          </span>
          <p className="text-muted-foreground line-clamp-1 text-xs">
            {item.adons?.map((adon, i) => (
              <span key={i}>
                {adon.name} {`(${formatPrice(Number(adon.price))})`} ,
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="flex md:flex-col gap-2 md:gap-4 items-end">
        <Button
          onClick={() => {
            removeItem(item.dish.id);
          }}
          variant={"outline"}
          size={"icon-lg"}
        >
          <HugeiconsIcon icon={Trash} size={17} />
        </Button>
        <div className="bg-blue-50 flex p-1 gap-4 rounded-md items-center">
          <Button
            onClick={() => decrement(item.dish.id)}
            size={"icon-sm"}
            variant={"outline"}
            className={"border-none"}
          >
            <HugeiconsIcon icon={Minus} size={20} />
          </Button>
          <span>{item.quantity}</span>
          <Button
            onClick={() => increment(item.dish.id)}
            size={"icon-sm"}
            variant={"outline"}
            className={"border-none"}
          >
            <HugeiconsIcon icon={Plus} size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <label className="uppercase text-[10px] font-bold text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
};

// Reasons we can end up without a location — lets the UI (and you, via
// console) know *why* instead of a single generic "unable to get location".
type LocationFailureReason =
  | "unsupported"
  | "insecure-context"
  | "permission-denied"
  | "position-unavailable"
  | "timeout"
  | "unknown";

export const CartBlock = () => {
  const { items } = useCartStore();
  const params = useParams<{ id: string }>();
  const [location, setLocation] = useState<{
    latitude: string;
    longitude: string;
  } | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [locationFailureReason, setLocationFailureReason] =
    useState<LocationFailureReason | null>(null);

  const itemsPrice = items.reduce((item, red) => item + Number(red.price), 0);

  const [checkingLocation, setCheckingLocation] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fail = (reason: LocationFailureReason, detail?: unknown) => {
      if (!isActive) return;
      if (detail) {
        // eslint-disable-next-line no-console
        console.warn(`Geolocation failed (${reason}):`, detail);
      } else {
        // eslint-disable-next-line no-console
        console.warn(`Geolocation failed (${reason})`);
      }
      setCheckingLocation(false);
      setLocationError(true);
      setLocationFailureReason(reason);
    };

    // 1. Browser doesn't support the API at all.
    if (!("geolocation" in navigator)) {
      fail("unsupported");
      return () => {
        isActive = false;
      };
    }

    // 2. Geolocation requires a secure context (https or localhost).
    //    On plain http origins the call fails instantly with no prompt —
    //    this is a very common silent cause of "location doesn't work".
    if (
      typeof window !== "undefined" &&
      !window.isSecureContext &&
      window.location.hostname !== "localhost"
    ) {
      fail("insecure-context");
      return () => {
        isActive = false;
      };
    }

    const timeoutId = window.setTimeout(() => {
      fail("timeout");
    }, 15000);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!isActive) return;
        window.clearTimeout(timeoutId);
        const { latitude, longitude } = pos.coords;
        setCheckingLocation(false);
        setLocationError(false);
        setLocationFailureReason(null);
        setLocation({
          latitude: String(latitude),
          longitude: String(longitude),
        });
      },
      (err: GeolocationPositionError) => {
        window.clearTimeout(timeoutId);
        // err.code: 1 = PERMISSION_DENIED, 2 = POSITION_UNAVAILABLE, 3 = TIMEOUT
        const reason: LocationFailureReason =
          err.code === err.PERMISSION_DENIED
            ? "permission-denied"
            : err.code === err.POSITION_UNAVAILABLE
              ? "position-unavailable"
              : err.code === err.TIMEOUT
                ? "timeout"
                : "unknown";
        fail(reason, err);
      },
      { enableHighAccuracy: true, maximumAge: 300000, timeout: 10000 },
    );

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const hasLocation = !!location?.latitude && !!location?.longitude;

  const {
    data: deliveryData,
    isFetching: checkingRestaurantOrderData,
    isError,
  } = useCheckDeliveryData(
    items[0]?.restaurantId ?? "",
    location?.latitude ?? "",
    location?.longitude ?? "",
  );

  const deliveryFee = 1000;
  const deliveryStatusLoading =
    checkingLocation || (hasLocation && checkingRestaurantOrderData);
  const poempayDiscount = () => {
    const calc = Number(itemsPrice) * (3 / 100);
    return calc;
  };

  const locationErrorMessage =
    locationFailureReason === "permission-denied"
      ? "Location permission denied"
      : locationFailureReason === "insecure-context"
        ? "Location requires a secure (https) connection"
        : locationFailureReason === "unsupported"
          ? "Location isn't supported on this device/browser"
          : locationFailureReason === "timeout"
            ? "Location request timed out"
            : "Unable to get location";

  return (
    <main className="container-x mt-(--mobile-nav-height) lg:mt-[calc(var(--nav-height)+10px)] gap-6 grid grid-cols-1 md:grid-cols-5">
      <div className="lg:col-span-3 flex flex-col gap-6">
        <h1 className="text-4xl font-bold">Checkout</h1>

        {/* cart item */}
        <div className="rounded-md shadow-md bg-white p-6">
          <div className="w-full items-center justify-between flex">
            <span>Your Items</span>
            <span className="p-1 bg-bg-mute rounded-full px-2 text-xs text-primary">
              {items.length} items
            </span>
          </div>
          <div className="mt-6 flex flex-col">
            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              items.map((item, i) => <CartItem item={item} key={i} />)
            )}
          </div>
        </div>

        {/* delivery location details */}
        <div className="rounded-md shadow-md bg-white p-6">
          <span className="font-bold mb-4">Delivery Address</span>
          <form className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <InputField label={"Full Name"}>
                <Input
                  placeholder="Enter your full name"
                  className="border p-4 bg-white h-10 px-4"
                />
              </InputField>
              <InputField label={"PHONE NUMBER"}>
                <Input
                  placeholder="237"
                  type="number"
                  className="border p-4 bg-white h-10 px-4"
                />
              </InputField>
            </div>
            <div className="flex pt-4 border-t border-border flex-col pb-4 gap-4">
              <div className="flex justify-between flex-col gap-2 md:flex-row">
                <span className="text-xs font-bold">DELIVERY INFO</span>
                {deliveryStatusLoading ? (
                  <span className="flex-nowrap rounded-full p-1 w-fit text-xs flex gap-1 bg-blue-500/20 px-2 text-blue-500 items-center">
                    <HugeiconsIcon
                      icon={LoaderIcon}
                      size={14}
                      className="animate-spin"
                    />{" "}
                    Checking delivery possibility
                  </span>
                ) : isError || locationError || !location || !deliveryData ? (
                  <span className="flex-nowrap rounded-full w-fit p-1 text-xs flex gap-1 bg-destructive/20 px-2 text-destructive items-center">
                    <HugeiconsIcon icon={CircleX} size={14} />{" "}
                    {locationError
                      ? locationErrorMessage
                      : "Unable to get location"}
                  </span>
                ) : !deliveryData.data.deliverable ? (
                  <span className="flex-nowrap p-1 w-fit rounded-full text-xs flex gap-1 bg-primary/20 px-2 text-primary items-center">
                    <HugeiconsIcon icon={AlertTriangle} size={14} /> Delivery
                    service not available
                  </span>
                ) : (
                  <span className="flex-nowrap p-1 w-fit rounded-full text-xs flex gap-1 bg-green-500/20 px-2 text-green-500 items-center">
                    <HugeiconsIcon icon={CircleCheck} size={14} /> Delivery is
                    possible
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <InputField label={"CITY"}>
                  <Input
                    placeholder="eg Douala"
                    disabled={
                      deliveryStatusLoading ||
                      !!deliveryData?.data.deliverable ||
                      isError ||
                      !deliveryData
                    }
                    className="border p-4 bg-white h-10 px-4"
                  />
                </InputField>
                <InputField label={"NEIGHBORHOOD / DISTRICT"}>
                  <Input
                    placeholder="eg Douala"
                    disabled={
                      deliveryStatusLoading ||
                      !!deliveryData?.data.deliverable ||
                      isError ||
                      !deliveryData
                    }
                    className="border p-4 bg-white h-10 px-4"
                  />
                </InputField>
                <InputField label={"DELIVERY INSTRUCTIONS (STREET/HOUSE)"}>
                  <Input
                    disabled={
                      deliveryStatusLoading ||
                      !!deliveryData?.data.deliverable ||
                      isError ||
                      !deliveryData
                    }
                    placeholder="Rue 124, near the bakery..."
                    className="border p-4 bg-white h-10 px-4"
                  />
                </InputField>
              </div>
              {locationError && (
                <div className="rounded-md bg-destructive/10 p-3 text-xs text-destructive flex flex-col gap-1">
                  <span>{locationErrorMessage}</span>
                  {locationFailureReason === "permission-denied" && (
                    <span className="text-muted-foreground">
                      Enable location access for this site in your browser
                      settings, then reload the page.
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-border flex flex-col pb-4 border-b gap-4">
              <div className="flex flex-col gap-4 text-xs">
                <span className="text-xs font-bold">CONTACT PREFERENCES</span>
                <div className="w-full grid gap-4 grid-cols-2 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Input type="radio" className="w-4 h-4" />
                    <label>Whatsapp</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="radio" className="w-4 h-4" />
                    <label>Whatsapp</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="radio" className="w-4 h-4" />
                    <label>Whatsapp</label>
                  </div>
                </div>
                <div className="rounded-md bg-blue-50 p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>Same as phone number</span>
                  </div>
                  <Input
                    className="h-10 px-4"
                    placeholder="WhatsApp Number (Optional)"
                  />
                </div>
              </div>
            </div>
            {/* Special requests */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold">
                SPECIAL REQUESTS (OPTIONAL)
              </span>
              <Textarea
                className="h-14 bg-white"
                placeholder="Anything else we should know about your order?"
              ></Textarea>
            </div>
          </form>
        </div>

        {/* paymentoptions */}
        <div className="flex p-6 flex-col rounded-md shadow-md bg-white gap-4">
          <span className="font-bold">Payment Method</span>
          {/* <PaymentMethodSelectionGrid /> */}
        </div>
      </div>
      <div className="bg-white w-full md:col-span-2 p-6 flex flex-col h-fit rounded-2xl shadow-md">
        <span className="text-xl font-bold">Summary</span>
        <div className="mt-4 flex flex-col gap-4 pb-6 border-b border-border">
          <div className="flex items-center text-muted-foreground text-xs justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(itemsPrice)}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-xs justify-between">
            <span>Delivery Fee</span>
            <span>{formatPrice(Number(deliveryFee))}</span>
          </div>
          <div className="flex items-center text-green-500 text-xs justify-between">
            <span className="flex items-center gap-1">
              {" "}
              <HugeiconsIcon icon={Coupon01FreeIcons} size={12} /> PoemPay
              Discount
            </span>
            <span>- {formatPrice(poempayDiscount())} </span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <span>Total</span>
          <div className="flex flex-col items-end text-end">
            <span className="text-primary text-xl">
              {formatPrice(deliveryFee + itemsPrice - poempayDiscount())}
            </span>
            <span className="text-xs text-muted-foreground">
              TAXES INCLUDED
            </span>
          </div>
        </div>
        <div className="p-4 mt-6 rounded-2xl border border-primary/40 bg-primary/10 flex items-center gap-2">
          <div className="w-8 h-8 bg-bg-mute rounded-full flex items-center p-1 justify-center">
            <HugeiconsIcon
              icon={CircleStar}
              size={20}
              className="text-primary"
            />
          </div>
          <div className="text-xs flex flex-col gap-0.5">
            <span>Sign up and get 500 free points</span>
            <span className="text-primary">JOIN REWARDS PROGRAM</span>
          </div>
        </div>
        <Button className={"p-6 text-[16px] mt-6"}>Place Order</Button>
        <span className="text-center mt-6 text-xs text-muted-foreground">
          Need help with your order?
        </span>
      </div>
    </main>
  );
};
