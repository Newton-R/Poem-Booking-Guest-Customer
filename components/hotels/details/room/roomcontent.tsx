"use client";
import { LoadingRoomDetailsContent } from "@/components/loaders/hoteldetails/RoomDetailsContent";
import { Button } from "@/components/ui/button";
import { RegistrationReminderBlock } from "@/components/ui/registrationReminderblock";
import { formatPrice } from "@/lib/data";
import { amenityIcons } from "@/lib/icons";
import { HotelRoomDetail } from "@/lib/types/hotels";
import { cn } from "@/lib/utils";
import { CircleCheck, Ruler, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { differenceInDays, formatDate } from "date-fns";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export const RoomContent = ({
  room,
  isLoading,
}: {
  room: HotelRoomDetail;
  isLoading: boolean;
}) => {
  const pathname = usePathname();

  if (isLoading) {
    return <LoadingRoomDetailsContent />;
  }

  const searchParams = useSearchParams();

  const userStayData = {
    stayDates: {
      entry: new Date(String(searchParams.get("checkIn"))),
      exit: new Date(String(searchParams.get("checkOut"))),
    },
    adults: Number(searchParams.get("adults")),
  };

  const days = differenceInDays(
    userStayData.stayDates.exit,
    userStayData.stayDates.entry,
  );
  return (
    <section className="container-x grid gap-6 grid-cols-1 md:grid-cols-3">
      <div className="md:col-span-2 flex flex-col gap-6">
        <div className="flex flex-col gap-1 pb-6 border-b border-b-border">
          <div className="flex gap-2">
            <span className="p-1 px-3 text-xs rounded-full bg-primary text-white">
              Verified Luxury
            </span>
            <div className="flex gap-1 items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon
                  icon={Star}
                  size={16}
                  className={cn("fill-yellow-500 text-yellow-500")}
                  key={i}
                />
              ))}
            </div>
          </div>
          <span className="text-3xl font-bold">{room.name}</span>
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col text-end">
                <span className="text-muted-foreground text-[10px]">
                  Height
                </span>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Ruler}
                    size={14}
                    className="text-primary font-bold"
                  />
                  <span className="font-bold text-xl">{room.lengthM}m</span>
                </div>
              </div>
              <div className="flex flex-col text-end">
                <span className="text-muted-foreground text-[10px]">Width</span>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Ruler}
                    size={14}
                    className="text-primary font-bold"
                  />
                  <span className="font-bold text-xl">{room.widthM}m</span>
                </div>
              </div>
              <div className="flex flex-col text-end">
                <span className="text-muted-foreground text-[10px]">
                  Total Area
                </span>
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Ruler}
                    size={14}
                    className="text-primary font-bold"
                  />
                  <span className="font-bold text-xl">
                    {room.areaSqm}m<sup>2</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Room Overview</span>
          <div className="flex flex-col text-[14px] text-muted-foreground gap-4">
            <p>{room.description}</p>
          </div>
        </div>
        <div className="p-6 bg-bg-mute/50 rounded-2xl flex flex-col">
          <span className="text-2xl font-bold">Exclusive Amenities</span>
          <div className="w-full grid gap-4 grid-cols-2 mt-2 md:grid-cols-3">
            {room.amenities.map((amenity, i) => (
              <div className="flex items-center gap-2" key={i}>
                <div className="size-10 bg-bg-mute rounded-full flex items-center justify-center">
                  <HugeiconsIcon
                    icon={amenityIcons[amenity.icon] ?? CircleCheck}
                    className="text-primary"
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {amenity.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-6 ">
        <div className="p-6 border border-border rounded-2xl bg-white flex flex-col ">
          <span className="text-xl font-bold">Reservation Details</span>
          <div className="mt-3 flex flex-col gap-4 text-[14px]">
            <div className="w-full justify-between items-center flex pb-3 border-b border-border">
              <span className="text-muted-foreground">Selected Room</span>
              <span className="font-bold">{room.name}</span>
            </div>
            <div className="w-full justify-between items-center flex pb-3 border-b border-border">
              <span className="text-muted-foreground">Stay Dates</span>
              <div className="flex flex-col text-end">
                <span className="font-bold">
                  {formatDate(String(userStayData.stayDates.entry), "dd MMM")} -{" "}
                  {formatDate(
                    String(userStayData.stayDates.exit),
                    "dd MMM yyyy",
                  )}
                </span>
                <span className="text-muted-foreground text-[9px]">
                  {/* days */}
                  {days} {days > 1 ? "Days" : "Day"}
                </span>
              </div>
            </div>
            <div className="w-full justify-between items-center flex pb-3 border-b border-border">
              <span className="text-muted-foreground">Guests</span>
              <span className="font-bold">
                {" "}
                {userStayData.adults}{" "}
                {userStayData.adults > 1 ? "adults" : "adult"}
              </span>
            </div>
            <div className="text-muted-foreground text-[14px]">
              <div className="flex justify-between pb-4 border-b-2 border-border">
                <span>Base rate ( 1 night )</span>
                <span>{formatPrice(room.basePrice)}</span>
              </div>
              {/* <div className="flex justify-between pb-4 border-b-2 border-border">
                <span>Service & Taxes</span>
                <span>100,000 XAF</span>
              </div> */}
              <div className="flex justify-between text-black mt-2">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(days * Number(room.basePrice))}
                </span>
              </div>
            </div>
            <Link
              href={`${pathname}/checkout?checkIn=${searchParams.get("checkIn")}&checkOut=${searchParams.get("checkOut")}&adults=${userStayData.adults}&days=${days}&roomtype=${room.name}&per_price=${room.basePrice}`}
              className="w-full"
            >
              {" "}
              <Button className={"p-6 w-full font-bold"}>
                Proceed to checkout
              </Button>
            </Link>
          </div>
        </div>
        <RegistrationReminderBlock />
      </div>
    </section>
  );
};
