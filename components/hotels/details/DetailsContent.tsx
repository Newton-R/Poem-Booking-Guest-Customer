"use client";
import { LoadingHotelDetailsContent } from "@/components/loaders/hoteldetails/Content";
import { LoadingRoomAccommodationCard } from "@/components/loaders/hoteldetails/LoadingRoomCard";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Hotel, RoomCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BedBunkFreeIcons,
  CircleCheck,
  Clock,
  CustomerService01FreeIcons,
  MilkBottleFreeIcons,
  Search,
  Star,
} from "@hugeicons/core-free-icons";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { EmptyHotelsRooms } from "@/components/emptystuff";
import {
  HotelDetail,
  HotelReviews,
  RoomAvailabilityResponse,
  RoomsAvailabilityParams,
  RoomTypes,
} from "@/lib/types/hotels";
import { formatPrice } from "@/lib/data";
import {
  getHotelsAvailability,
  useGetHotelsAvailability,
} from "@/lib/public/useGetHotels";
import { amenityIcons } from "@/lib/icons";
import { apiClient } from "@/lib/api";
import { isAxiosError } from "axios";
import { ErrorType } from "@/lib/defined_types";
import { Loader } from "@/components/ui/Loader";

const RoomAccommodationCard = ({
  room,
  roomParams,
}: {
  room: RoomTypes;
  roomParams?: RoomsAvailabilityParams;
}) => {
  const pathname = usePathname();
  const imagePaths = process.env.NEXT_PUBLIC_IMAGE_URL + room.imageUrl;
  const NoParams =
    !roomParams?.checkIn ||
    !roomParams.checkOut ||
    !roomParams.roomtype ||
    !roomParams.adults;
  return (
    <div
      className={cn(
        "flex overflow-hidden w-full flex-col max-h-100 md:max-h-60 md:flex-row md:gap-4 border border-border rounded-xl",
        room.status === "active" && "border-primary",
      )}
    >
      <div className="w-full md:w-60 lg:w-80 h-full relative overflow-hidden">
        <Image
          src={imagePaths}
          alt={room.name}
          className="w-full h-full object-cover"
          width={320}
          height={240}
        />
        {/* {room.premium && (
          <span className="text-xs p-1 px-2 rounded-md bg-primary absolute h-fit w-fit top-4 left-4">
            PREMIUM SELECTION
          </span>
        )} */}
      </div>
      <div className="flex flex-col gap-2 flex-1 p-4 md:px-2 ">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-px">
            <span className="font-bold">{room.name}</span>

            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <HugeiconsIcon icon={BedBunkFreeIcons} size={16} />{" "}
              {room.maxAdults} Adults , {room.maxChildren}{" "}
              {room.maxChildren > 1 ? "Children" : "Child"}
            </span>
          </div>
          {/* {room.popular && (
            <span className="text-xs font-bold p-2 px-4 bg-secondary  rounded-full">
              POPULAR
            </span>
          )} */}
        </div>
        <p className="text-sm text-muted-foreground pb-3 border-b mt-4 border-border">
          {room.description}
        </p>
        <div className="flex mt-auto justify-between items-center mt-3">
          <div className="flex gap-2 w-full justify-between items-end">
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-xs text-muted-foreground">Starts at</span>
              <span className="font-bold text-lg">
                {formatPrice(room.basePrice)}
              </span>
            </div>
            {NoParams ? (
              <Button
                onClick={() =>
                  toast.info(
                    "Enter all booking info & check availabilty first!",
                  )
                }
                className="bg-primary text-white p-4 hover:bg-primary/90"
              >
                Book Now
              </Button>
            ) : (
              <Link
                href={
                  !roomParams
                    ? `${pathname}/${room.id}`
                    : `${pathname}/${room.id}?checkIn=${roomParams.checkIn}&checkOut=${roomParams.checkOut}&adults=${roomParams.adults}`
                }
              >
                <Button className="bg-primary text-white p-4 hover:bg-primary/90">
                  Book Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewsCard = ({ review }: { review: HotelReviews }) => {
  return (
    <div className="p-6 flex flex-col gap-4 rounded-xl bg-bg-mute">
      <div className="flex gap-2 w-full justify-between items-end">
        <div className="flex gap-2.5">
          <div className="flex size-12 items-center justify-center rounded-full bg-amber-600 font-bold text-white">
            {review.customerName.split(" ").map((n) => (
              <span>{n[0]}</span>
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-bold">{review.customerName}</span>
            <span className="text-muted-foreground text-[14px]">
              Stayed in {review.created_at.split("T")[0]}
            </span>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <HugeiconsIcon
              icon={Star}
              key={i}
              size={18}
              className={
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }
            />
          ))}
        </div>
      </div>
      <p className="italic text-[14px] text-muted-foreground">
        “{review.comment}”
      </p>
    </div>
  );
};

// Main details content

interface RoomsFilter {
  guests: string;
  checkIn: string;
  checkout: string;
  roomtype: RoomCategory | "";
}

export const DetailsContent = ({
  hotel,
  isLoading,
  id,
}: {
  hotel?: HotelDetail;
  isLoading: boolean;
  id: string;
}) => {
  const [rooms, setRooms] = useState<RoomTypes[] | null>(null);
  const [myroomtype, setType] = useState("");
  console.log({ rooms: rooms });
  const [roomFilters, setRoomFilters] = useState<RoomsAvailabilityParams>({
    adults: "",
    checkIn: "",
    checkOut: "",
    roomtype: "",
  });
  const [checking, setChecking] = useState<boolean>(false);
  const RoomsBlock = useRef<HTMLDivElement>(null);
  const MyRooms = !rooms ? hotel?.roomTypes : rooms;

  const roomtypes = hotel?.roomTypes.map((room) => ({
    label: room.name,
    value: room.id,
  }));

  const updateFilter = (key: keyof RoomsAvailabilityParams, value: string) => {
    setRoomFilters((prev) => ({ ...prev, [key]: value }));
  };

  const CheckAvailability = async () => {
    setChecking(true);
    try {
      const { data } = await apiClient.get<RoomAvailabilityResponse>(
        `/hotels/${id}/availability?checkIn=${roomFilters.checkIn}&checkOut=${roomFilters.checkOut}&adults=${roomFilters.adults}`,
      );

      if (data && data.data.length > 0) {
        const rooms = hotel?.roomTypes.filter(
          (roomtype) =>
            data.data.some((available) => roomtype.name === available.name) &&
            roomtype.name === roomFilters.roomtype,
        );
        if (rooms && rooms?.length > 0) {
          toast.success("Rooms available");
          setRooms(rooms);
        } else {
          toast.success("Rooms not available");
          setRooms([]);
        }
      } else if (data.data.length === 0) {
        toast.success("No rooms available");
        setRooms([]);
      }
      console.log(data);
      return data;
    } catch (e) {
      if (isAxiosError<ErrorType>(e)) {
        toast.error("Something went wrong checking availability.");
        throw new Error(e.message);
      }
      throw new Error("Something went wrong");
    } finally {
      setChecking(false);
    }
  };

  if (isLoading) {
    return <LoadingHotelDetailsContent />;
  }

  return (
    <div className="container-x lg:mb-20 flex md:flex-row flex-col-reverse gap-8">
      <div className="flex flex-col gap-20 flex-1">
        <div className="flex flex-col gap-4 text-[14px]">
          <h3 className="text-2xl font-bold border-b border-border pb-2">
            Hotel Details
          </h3>
          <p>{hotel?.description}</p>
        </div>

        {/* Amenities section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold pb-2">Amenities </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hotel?.amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex flex-col bg-primary/5 items-center text-center p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <HugeiconsIcon
                  icon={amenityIcons[amenity.icon] ?? CircleCheck}
                  size={28}
                  className="mb-4 text-primary"
                />
                <h4 className="font-semibold">{amenity.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Accomodation section */}
        <div className="flex flex-col gap-4" ref={RoomsBlock}>
          <h3 className="text-2xl font-bold pb-2">Accommodation</h3>
          <div className="flex flex-col gap-4">
            {MyRooms && MyRooms.length > 0 ? (
              MyRooms.map((room, i) => (
                <RoomAccommodationCard
                  roomParams={roomFilters}
                  room={room}
                  key={i}
                />
              ))
            ) : (
              <EmptyHotelsRooms />
            )}
          </div>
        </div>

        {/* Guest Experience */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between pb-3 flex-col md:flex-row gap-2 border-b border-border md:items-end">
            <h2 className="text-2xl font-bold pb-2">Guest Experiences</h2>
            <div className="flex gap-2 flex-row-reverse items-center w-fit md:flex-row md:items-end">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xl">
                  {hotel?.starRating?.toFixed(1)} / 5.0
                </span>
                <span className="text-[14px] text-muted-foreground">
                  Based on {hotel?.reviewCount} reviews
                </span>
              </div>
              <div className=" p-2 rounded-md size-10 bg-primary/30 text-primary text-xl flex items-center justify-center">
                {hotel?.starRating.toFixed(1)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(hotel?.reviews ?? []).map((review) => (
              <ReviewsCard review={review} key={review.id} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold pb-2">Important Information</h2>
          </div>
          <div className="w-full bg-bg-mute p-6 flex flex-col md:flex-row gap-6 rounded-2xl">
            <div className="flex flex-col flex-1 gap-2">
              <span className="font-bold flex gap-2 items-center text-xl">
                <HugeiconsIcon
                  className="text-primary font-bold"
                  icon={Clock}
                  size={18}
                />
                Check-in & Check-out
              </span>
              <div className="w-full flex mt-2 text-muted-foreground justify-between items-center border-b border-border pb-3">
                <span>Check-In</span>
                <span>From {hotel?.checkInTime}</span>
              </div>
              <div className="w-full flex text-muted-foreground justify-between items-center border-b border-border pb-3">
                <span>Check-Out</span>
                <span>Until {hotel?.checkOutTime}</span>
              </div>
              <p className="text-[14px] italic text-destructive">
                Express check-in available for Hilton Honors members.
              </p>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <span className="font-bold flex gap-2 mb-2 items-center text-xl">
                <HugeiconsIcon
                  className="text-primary font-bold"
                  icon={Search}
                  size={18}
                />
                Property Policies
              </span>
              {/* policy block */}
              <div className="flex gap-2 items-center text-[14px]">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <p>{hotel?.policy.cancellationPolicy}</p>
              </div>
              <div className="flex gap-2 items-center text-[14px]">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <p>{hotel?.policy.childPolicy}</p>
              </div>
              <div className="flex gap-2 items-center text-[14px]">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <p>{hotel?.policy.checkInPolicy}</p>
              </div>
              <div className="flex gap-2 items-center text-[14px]">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <p>{hotel?.policy.petPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:max-w-90 gap-4">
        <div className="flex flex-col border border-secondary-foreground rounded-2xl overflow-hidden">
          <div className="p-6 bg-secondary-foreground text-white flex justify-between">
            <div className="flex flex-col">
              <span className="text-xs">STARTING FROM</span>
              <span>
                <span className="text-2xl font-bold">
                  {formatPrice(hotel?.minPrice ?? 0)}
                </span>
                <span className="text-xs"> /night</span>
              </span>
            </div>
            <span className="bg-primary text-black p-1 px-2 rounded-md text-xs h-fit font-bold">
              BEST PRICE
            </span>
          </div>

          {/* filter forms */}

          <form
            className="flex flex-col gap-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex justify-between items-center gap-6">
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-[10px]">CHECK-IN </label>
                <DatePickerDemo
                  className="bg-white"
                  onChange={(e) =>
                    updateFilter("checkIn", e ? format(e, "yyyy-MM-dd") : "")
                  }
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-[10px]">CHECK-OUT</label>
                <DatePickerDemo
                  className="bg-white"
                  onChange={(e) =>
                    updateFilter("checkOut", e ? format(e, "yyyy-MM-dd") : "")
                  }
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-[10px]">GUESTS</label>
              <Input
                placeholder=""
                type="number"
                value={roomFilters.adults}
                onChange={(e) => updateFilter("adults", e.target.value)}
                className="p-2 bg-white h-10"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-[10px]">Room Type</label>
              <Combobox
                value={myroomtype}
                onInputValueChange={(e) => {
                  setType(e);
                  updateFilter("roomtype", e);
                  console.log();
                }}
                items={roomtypes}
              >
                <ComboboxInput
                  className="h-10"
                  placeholder="Select a room type"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item.value} value={item}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
            <Button
              type="submit"
              onClick={() => CheckAvailability()}
              className={"p-6"}
              disabled={checking}
            >
              {checking ? (
                <Loader />
              ) : (
                <>
                  Check Availability <HugeiconsIcon icon={ArrowRight} />
                </>
              )}
            </Button>
          </form>
        </div>
        <div className="p-5 flex items-center bg-primary/30 border border-primary rounded-2xl gap-2">
          <div className="p-2 bg-primary rounded-full">
            <HugeiconsIcon
              className="text-black font-bold"
              icon={CustomerService01FreeIcons}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold">Need help booking?</span>
            <span className="font-bold text-primary">
              Contact local experts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
