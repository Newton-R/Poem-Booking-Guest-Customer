"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BedBunkFreeIcons,
  Briefcase,
  CircleCheck,
  Clock,
  CustomerService01FreeIcons,
  Dumbbell,
  Leaf,
  Search,
  Star,
  UtensilsCrossed,
  Waves,
  Wifi01FreeIcons,
  WifiIcon,
} from "@hugeicons/core-free-icons";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Amenity = {
  id: string;
  icon: IconSvgObject;
  title: string;
  subtitle: string;
};

const amenities: Amenity[] = [
  {
    id: "wifi",
    icon: Wifi01FreeIcons,
    title: "Free High-Speed WiFi",
    subtitle: "Unlimited Access",
  },
  {
    id: "pool",
    icon: Waves,
    title: "Olympic Swimming Pool",
    subtitle: "Heated & Outdoor",
  },
  {
    id: "gym",
    icon: Dumbbell,
    title: "State-of-the-art Gym",
    subtitle: "24/7 Access",
  },
  {
    id: "restaurant",
    icon: UtensilsCrossed,
    title: "Gourmet Restaurants",
    subtitle: "Fine Dining",
  },
  {
    id: "spa",
    icon: Leaf,
    title: "Luxury Wellness Spa",
    subtitle: "Full Service",
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Executive Business Center",
    subtitle: "Meetings & Tech",
  },
];

const RoomAccommodationCard = ({ index }: { index: number }) => {
  const pathname = usePathname();
  return (
    <section className="flex overflow-hidden w-full flex-col max-h-80 md:max-h-60  md:flex-row gap-4 border border-border rounded-xl">
      <div className="w-full md:w-60 lg:w-80 h-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1721132447246-5d33f3008b05?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Deluxe Room"
          className="w-full h-full object-cover"
          width={320}
          height={240}
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 p-4 px-2 ">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-px">
            <span className="font-bold">Deluxe Room</span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <HugeiconsIcon icon={BedBunkFreeIcons} size={16} /> 1 King Bed,
              City View
            </span>
          </div>
          <span className="text-xs font-bold p-2 px-4 bg-secondary  rounded-full">
            POPULAR
          </span>
        </div>
        <p className="text-sm text-muted-foreground pb-3 border-b mt-4 border-border">
          Perfect for couples and business travelers seeking comfort and
          convenience.
        </p>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2 w-full justify-between items-end">
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-xs text-muted-foreground">Starts at</span>
              <span className="font-bold text-lg">80,000XAF</span>
            </div>
            <Link href={`${pathname}/${index}`}>
              <Button className="bg-primary text-white p-4 hover:bg-primary/90">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewsCard = () => {
  return (
    <div className="p-6 flex flex-col gap-4 rounded-xl bg-bg-mute">
      <div className="flex gap-2 w-full justify-between items-end">
        <div className="flex gap-2.5">
          <div className="flex gap-2 size-12 rounded-full bg-amber-600"></div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-bold">Emmanuel M.</span>
            <span className="text-muted-foreground text-[14px]">
              Stayed in Jan 2024
            </span>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <HugeiconsIcon
              icon={Star}
              key={i}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </div>
      <p className="italic text-[14px] text-muted-foreground">
        "The service at the Hilton remains unmatched in Yaoundé. The staff is
        attentive, and the executive lounge offers the perfect quiet spot for
        business meetings."
      </p>
    </div>
  );
};

export const DetailsContent = () => {
  const policies = [
    "Cancellation: Free up to 24h before arrival for most bookings.",
    "Children: Free stay for children under 12 using existing bedding.",
    "Pets: Service animals only.",
  ];
  return (
    <div className="container-x mb-20 flex gap-8">
      <div className="flex flex-col gap-20 flex-1">
        <div className="flex flex-col gap-4 text-[14px]">
          <h3 className="text-2xl font-bold border-b border-border pb-2">
            Hotel Details
          </h3>
          <p>
            Standing as a landmark of sophistication in the heart of Cameroon's
            capital, The Hilton Yaoundé represents the pinnacle of international
            hospitality combined with local warmth. Since its inauguration, it
            has been the preferred destination for global leaders, business
            moguls, and travelers seeking an uncompromising standard of service.
          </p>
          <p>
            The hotel seamlessly blends corporate efficiency with 'Curated
            Comfort,' offering panoramic views of the city's lush hills. Its
            architectural grandeur and meticulously designed interiors reflect a
            commitment to luxury that has defined the Yaoundé skyline for
            decades.
          </p>
        </div>

        {/* Amenities section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold pb-2">Amenities </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex flex-col bg-primary/5 items-center text-center p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <HugeiconsIcon
                  icon={amenity.icon}
                  size={28}
                  className="mb-4 text-primary"
                />
                <h4 className="font-semibold">{amenity.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {amenity.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accomodation section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold pb-2">Accommodation</h3>
          <div className="flex flex-col gap-4">
            <RoomAccommodationCard index={0} />
            <RoomAccommodationCard index={1} />
            <RoomAccommodationCard index={2} />
          </div>
        </div>

        {/* Guest Experience */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between pb-3 border-b border-border items-end">
            <h2 className="text-2xl font-bold pb-2">Guest Experiences</h2>
            <div className="flex gap-2 items-end">
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-xl">4.8 / 5</span>
                <span className="text-[14px] text-muted-foreground">
                  Based on 1,240 reviews
                </span>
              </div>
              <div className=" p-2 rounded-md size-10 bg-primary/30 text-primary text-xl flex items-center justify-center">
                4.8
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <ReviewsCard />
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
                <span>From 14:00</span>
              </div>
              <div className="w-full flex text-muted-foreground justify-between items-center border-b border-border pb-3">
                <span>Check-Out</span>
                <span>Until 12:00</span>
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
              {policies.map((policy, i) => (
                <div className="flex gap-2 items-start text-[14px]" key={i}>
                  <HugeiconsIcon
                    icon={CircleCheck}
                    className="mt-0.5"
                    size={18}
                  />
                  <p>{policy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-90 gap-4">
        <div className="flex flex-col border border-secondary-foreground rounded-2xl overflow-hidden">
          <div className="p-6 bg-secondary-foreground text-white flex justify-between">
            <div className="flex flex-col">
              <span className="text-xs">STARTING FROM</span>
              <span>
                <span className="text-2xl font-bold">145,000 XAF</span>
                <span className="text-xs"> /night</span>
              </span>
            </div>
            <span className="bg-primary text-black p-1 px-2 rounded-md text-xs h-fit font-bold">
              BEST PRICE
            </span>
          </div>
          <form className="flex flex-col gap-4 p-6">
            <div className="flex justify-between items-center gap-6">
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-[10px]">CHECK-IN</label>
                <Input
                  placeholder=""
                  type="date"
                  className="p-2 bg-white h-10"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <label className="text-[10px]">CHECK-OUT</label>
                <Input
                  placeholder=""
                  type="date"
                  className="p-2 bg-white h-10"
                />
              </div>
            </div>
            <Button className={"p-6"}>
              Check Availability <HugeiconsIcon icon={ArrowRight} />
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
