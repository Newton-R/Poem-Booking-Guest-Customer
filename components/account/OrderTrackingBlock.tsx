"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02FreeIcons,
  RestaurantTableFreeIcons,
  DeliveryTruck01FreeIcons,
  HelpCircleFreeIcons,
  Location01FreeIcons,
  BikeFreeIcons,
  Star,
  PhoneCall,
  Message01Icon,
  Truck,
} from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useGetOrderDetails } from "@/lib/public/useGetRestaurants";
import { useParams } from "next/navigation";
import { OrderStatusPageSkeleton } from "../loaders/OrderDetails";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { orderStates } from "@/lib/types/restaurant";
import { formatPrice } from "@/lib/data";

type StepDefinition = {
  label: string;
  icon: typeof Tick02FreeIcons;
  message: string;
  statuses: orderStates[];
};

const STEPS: StepDefinition[] = [
  {
    label: "Order Placed",
    icon: Tick02FreeIcons,
    message:
      "We've received your order and are waiting for the restaurant to confirm.",
    statuses: ["paid"],
  },
  {
    label: "Accepted",
    icon: Tick02FreeIcons,
    message:
      "The restaurant has accepted your order and will start preparing it shortly.",
    statuses: ["restaurant_accepted"],
  },
  {
    label: "Preparing",
    icon: RestaurantTableFreeIcons,
    message: "Your food is being freshly prepared in the kitchen.",
    statuses: ["preparing", "ready_for_pickup", "rider_assigned"],
  },
  {
    label: "On the Way",
    icon: DeliveryTruck01FreeIcons,
    message: "Your rider has picked up the order and is heading your way.",
    statuses: ["picked_up", "on_the_way"],
  },
  {
    label: "Delivered",
    icon: Tick02FreeIcons,
    message: "Your order has been delivered. Enjoy your meal!",
    statuses: ["delivered"],
  },
];

const ON_THE_WAY_INDEX = 3;
const DELIVERED_INDEX = 4;

// States that are not on the delivery path get a banner instead of the stepper
const EXCEPTION_COPY: Partial<
  Record<orderStates, { title: string; text: string }>
> = {
  payment_pending: {
    title: "Waiting for payment",
    text: "Complete your payment to place this order.",
  },
  restaurant_rejected: {
    title: "Order rejected",
    text: "The restaurant couldn't accept your order.",
  },
  cancelled: {
    title: "Order cancelled",
    text: "This order was cancelled.",
  },
  refund_pending: {
    title: "Refund in progress",
    text: "Your refund is being processed.",
  },
  refunded: {
    title: "Order refunded",
    text: "Your payment has been refunded.",
  },
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

export function OrderStatusPage() {
  const params = useParams<{ orderRef: string }>();
  const { data, isLoading, isError, refetch } = useGetOrderDetails(
    params.orderRef,
  );

  if (isLoading) {
    return <OrderStatusPageSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="mt-[calc(var(--nav-height)+20px)] container-x">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={Truck} size={40} />
            </EmptyMedia>
            <EmptyTitle>Error getting order</EmptyTitle>
            <EmptyDescription>
              There seems to be an error getting your order details. Please
              check your internet connection and try again.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant={"outline"}
              className={"w-30 h-9"}
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  const order = data.data;

  // Sort once so "first" and "last" mean what they say
  const timeline = [...order.timeline].sort(
    (a, b) => new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime(),
  );
  const latestNote = timeline.at(-1)?.note;

  const exception = EXCEPTION_COPY[order.status];
  const currentStep = STEPS.findIndex((s) => s.statuses.includes(order.status)); // -1 when off-path
  const progressPercent = (Math.max(currentStep, 0) / (STEPS.length - 1)) * 100;
  const isOnTheWay = currentStep === ON_THE_WAY_INDEX;
  const isDelivered = currentStep === DELIVERED_INDEX;

  const timeFor = (statuses: orderStates[]) => {
    const entry = timeline.find((t) => statuses.includes(t.status));
    return entry ? formatTime(entry.changedAt) : null;
  };

  const title =
    exception?.title ??
    (isDelivered
      ? "Your order has been delivered"
      : currentStep === 0
        ? "Your order has been placed"
        : "Your order is on its way");

  return (
    <div className="min-h-screen bg-muted/30 p-6 md:p-10 mt-[calc(var(--nav-height)+20px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 max-w-6xl mx-auto">
        {/* Left: Order status */}
        <Card className="p-8 rounded-2xl h-fit">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              {/* Restaurant name area */}
              <div className="flex items-center gap-2 mb-2">
                <HugeiconsIcon
                  icon={RestaurantTableFreeIcons}
                  size={16}
                  className="text-amber-800"
                />
                <span className="text-sm font-semibold text-amber-800">
                  {order.restaurantName}
                </span>
              </div>

              <h1 className="text-2xl font-bold">{title}</h1>

              {!exception && !isDelivered && (
                <p className="text-muted-foreground mt-1">
                  Estimated arrival:{" "}
                  <span className="text-amber-600 font-medium">
                    {currentStep <= 0 ? "Awaiting confirmation" : "25–35 mins"}
                  </span>
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground tracking-wide">
                ORDER ID
              </p>
              <span className="inline-block mt-1 px-3 py-1 rounded-md border border-primary/40 bg-primary/5 font-mono font-semibold text-sm">
                #{order.orderNumber}
              </span>
            </div>
          </div>

          {exception ? (
            <div className="mt-10 rounded-xl border border-border bg-muted/50 p-5">
              <p className="font-semibold">{exception.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {latestNote || exception.text}
              </p>
            </div>
          ) : (
            <>
              {/* Stepper */}
              <div className="mt-10">
                <div className="relative">
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" />
                  <div
                    className="absolute top-5 left-5 h-0.5 bg-foreground transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />

                  <div className="relative flex justify-between">
                    {STEPS.map((step, i) => {
                      const reached = i <= currentStep;
                      const time = timeFor(step.statuses);

                      return (
                        <div
                          key={step.label}
                          className="flex flex-col items-center gap-2 w-20"
                        >
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                              reached
                                ? "bg-amber-800 text-white"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            <HugeiconsIcon icon={step.icon} size={18} />
                          </div>
                          <span
                            className={`text-xs text-center font-medium ${
                              reached
                                ? "text-amber-800"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                          </span>
                          {time && (
                            <span className="text-[10px] text-muted-foreground">
                              {time}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Message or map, depending on step */}
              <div className="mt-10 pt-6 border-t border-border">
                {isOnTheWay ? (
                  <div className="flex flex-col gap-6">
                    <div className="rounded-xl overflow-hidden border border-border">
                      <div className="relative h-56 bg-muted flex items-center justify-center">
                        {/* Swap this block for your actual map component (Mapbox/Google Maps) */}
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <HugeiconsIcon icon={Location01FreeIcons} size={28} />
                          <span className="text-sm">Live map view</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 px-4 py-3 bg-background">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-800 mt-2 shrink-0" />
                        <p className="text-sm">
                          {latestNote || STEPS[currentStep].message}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-md p-4 shadow-md w-full flex justify-between items-center gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className={"w-17 h-17"}>
                          <AvatarFallback>PC</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-[16px]">Moussa</span>
                          <span className="flex gap-1">
                            <HugeiconsIcon icon={BikeFreeIcons} size={16} />
                            White Sanya Moto
                          </span>
                          <span className="flex items-center text-xs font-bold gap-1">
                            <HugeiconsIcon
                              icon={Star}
                              className="text-yellow-500 fill-yellow-500"
                              size={12}
                            />
                            4.9 (2k+ deliveries)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant={"outline"} className={"p-4 px-6"}>
                          <HugeiconsIcon icon={PhoneCall} />
                          Call
                        </Button>
                        <Button
                          className={
                            "p-4 bg-green-500 hover:bg-green-500/90 px-6"
                          }
                        >
                          <HugeiconsIcon icon={Message01Icon} />
                          Whatsapp
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-800 mt-2 shrink-0" />
                    <p className="text-sm">
                      {latestNote || STEPS[Math.max(currentStep, 0)].message}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </Card>

        {/* Right: Order summary */}
        <Card className="p-6 rounded-2xl h-fit">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <p className="text-sm text-muted-foreground mt-0.5 mb-4">
            from{" "}
            <span className="font-medium text-foreground">
              {order.restaurantName}
            </span>
          </p>

          <div className="flex flex-col gap-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between gap-2">
                <div>
                  <p className="text-sm">
                    <span className="text-amber-800 font-semibold mr-1">
                      {item.quantity}x
                    </span>
                    <span className="font-semibold">{item.name}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatPrice(item.unitPriceXaf ?? 0)}
                  </p>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">
                  {formatPrice(item.lineTotalXaf ?? 0)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotalXaf)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span>{formatPrice(order.deliveryFeeXaf)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-800">Promotional Discount</span>
              <span className="text-amber-800">
                -{formatPrice(order.discountXaf)}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-800 text-white px-4 py-4 flex items-center justify-between">
            <span className="font-medium">Total Paid</span>
            <span className="text-lg font-bold">
              {formatPrice(order.totalXaf)}
            </span>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-2 mt-10 text-sm text-muted-foreground">
        <HugeiconsIcon icon={HelpCircleFreeIcons} size={16} />
        <span>Need help with your order?</span>
      </div>
    </div>
  );
}
