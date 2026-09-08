import { LoadingRoomDetailsContent } from "@/components/loaders/hoteldetails/RoomDetailsContent";
import MapView from "@/components/MapView";

import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RegistrationReminderBlock } from "@/components/ui/registrationReminderblock";
import { formatPrice } from "@/lib/data";
import { amenityIcons } from "@/lib/icons";
import { ApartmentDetail, ApartmentReview } from "@/lib/types/apartment";
import {
  CircleCheck,
  Location,
  Star,
  Tv,
  Wifi,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";

const AppartmentReviewsCard = ({ review }: { review: ApartmentReview }) => {
  return (
    <div className="p-6 flex flex-col gap-4 rounded-xl bg-bg-mute">
      <div className="flex gap-2 w-full justify-between items-end">
        <div className="flex gap-2.5">
          <div className="flex size-12 items-center justify-center rounded-full bg-secondary-foreground font-bold text-white">
            {review.customerName.split(" ").map((i) => (
              <span key={i}>{i[0]}</span>
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-bold">{review.customerName}</span>
            <span className="text-muted-foreground text-[14px]">
              {review.created_at.split("T")[0]}
            </span>
          </div>
        </div>
      </div>
      <p className="italic text-[14px] text-muted-foreground">
        {review.comment}
      </p>
    </div>
  );
};

export const AppartmentDetailsContent = ({
  loading,
  apartment,
}: {
  loading: Boolean;
  apartment: ApartmentDetail;
}) => {
  const places = [
    { id: "1", name: "Bamenda", lat: 5.9631, lng: 10.1591 },
    { id: "2", name: "Yaoundé", lat: 3.848, lng: 11.5021 },
  ];

  if (loading) {
    return <LoadingRoomDetailsContent />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-3 order-2 md:order-1 flex flex-col gap-6">
        <div className="flex flex-col pb-5 border-b gap-0.5 border-border">
          <div className="flex gap-2 items-center text-[14px]">
            <span className="p-1 bg-primary px-2 rounded-full text-white">
              Smart Living
            </span>
            <span className="text-primary flex gap-0.5 items-center">
              <HugeiconsIcon size={14} icon={Star} className="fill-primary" />
              {apartment.avg_rating}
            </span>
          </div>
          <h1 className="text-3xl font-bold">{apartment.title}</h1>
          <span className="text-xs text-muted-foreground flex gap-0.5">
            <HugeiconsIcon icon={Location} size={16} />
            {apartment.address}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">About this retreat</span>
          <p className="text-muted-foreground text-[14px]">
            {apartment.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 pb-6 border-b border-border">
          <span className="text-2xl font-bold">What this place offers</span>
          <div className="text-muted-foreground text-[14px] grid grid-cols-2 gap-4 md:grid-cols-3 ">
            {apartment.amenities.map((amenity, i) => (
              <div key={i} className="flex gap-2 text-primary items-center">
                <HugeiconsIcon
                  icon={amenityIcons[amenity.icon] ?? CircleCheck}
                  size={16}
                />
                <span className="text-muted-foreground">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 pb-6 border-b border-border">
          <span className="text-2xl font-bold">Guest Experience</span>
          <div className="flex flex-col gap-2">
            {apartment.reviews.map((review, i) => (
              <AppartmentReviewsCard review={review} key={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 order-1 md:order-2 gap-4 rounded-2xl h-fit bg-bg-mute">
        <div className="flex flex-col gap-4 pb-4 border-b-2 border-border">
          <div className="flex justify-between items-end">
            <div className="flex gap-0.5 items-center">
              <span className="font-bold text-xl">
                {formatPrice(apartment.base_price_per_night)}
              </span>
              <span className="text-xs text-muted-foreground">/ night</span>
            </div>
            <span className="text-xs text-primary flex gap-1 font-bold">
              <HugeiconsIcon icon={Star} size={12} className="fill-primary" />
              {apartment.avg_rating}
            </span>
          </div>
          <div className=" border border-border bg-white rounded-2xl grid grid-cols-2">
            <div className="flex flex-col p-2 border-r border-border gap-0.5">
              <span className="text-[10px] text-muted-foreground">
                CHECK IN
              </span>
              <DatePickerDemo />
            </div>
            <div className="flex flex-col p-2 border-r border-border gap-0.5">
              <span className="text-[10px] text-muted-foreground">
                CHECK OUT
              </span>
              <DatePickerDemo className="text-xs" />
            </div>
            <div className="flex flex-col col-span-2 border-t border-border p-2 gap-0.5">
              <span className="text-[10px] text-muted-foreground">Guests</span>
              <Input className="h-9" placeholder="Number of guests" />
            </div>
          </div>
          <Button className={"p-4 h-10"}>Book Now</Button>
        </div>
        <div className="h-40 text-xs relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 p-4 bg-black/20 flex items-end">
            <div className="w-full bg-white/80 rounded-md p-2 flex justify-between items-center">
              <span>{apartment.address}</span>
              <Dialog>
                <DialogTrigger
                  render={
                    <Button
                      className={
                        "bg-secondary-foreground text-[10px] hover:bg-secondary-foreground/90"
                      }
                    >
                      VIEW ON MAP
                    </Button>
                  }
                />
                <DialogContent
                  className={"h-fit min-w-[500px] flex flex-col mt-4"}
                >
                  <div className="relative w-fit ">
                    <MapView
                      lat={Number(apartment.latitude)}
                      lng={Number(apartment.longitude)}
                      label={apartment.title}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Image
            alt="map"
            width={200}
            height={200}
            src={"/map.png"}
            className="w-full h-full object-cover"
          />
        </div>

        <RegistrationReminderBlock />
      </div>
    </div>
  );
};
