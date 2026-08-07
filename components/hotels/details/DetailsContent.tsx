import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Dumbbell,
  Leaf,
  UtensilsCrossed,
  Waves,
  Wifi01FreeIcons,
  WifiIcon,
} from "@hugeicons/core-free-icons";
import { IconSvgObject } from "@hugeicons/core-free-icons/types";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
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

const RoomAccommodationCard = () => {
  return (
    <div className="flex overflow-hidden w-full flex-col max-h-80 md:max-h-60  md:flex-row gap-4 border border-border rounded-xl">
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
            <span className="text-sm text-muted-foreground">
              1 King Bed, City View
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
            <Button className="bg-primary text-white p-4 hover:bg-primary/90">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DetailsContent = () => {
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
            <RoomAccommodationCard />
          </div>
        </div>
      </div>
      <div className="w-90 h-100 bg-black"></div>
    </div>
  );
};
