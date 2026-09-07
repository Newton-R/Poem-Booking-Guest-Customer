"use client";
import { EmptyApartments } from "@/components/emptystuff";
import { ApartmentLoading } from "@/components/loaders/appartment/ApartmentLoading";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/data";

import { Apartment, ApartmentResponse } from "@/lib/types/apartment";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AppartmentCard = ({ apartment }: { apartment: Apartment }) => {
  const pathname = usePathname();
  const image = apartment.images.find((img) => img.is_primary);
  const imageUrl = String(process.env.NEXT_PUBLIC_IMAGE_URL) + image?.image_url;
  return (
    <div className="h-100 md:h-90 flex flex-col border border-border rounded-2xl overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Image
          src={imageUrl}
          width={400}
          height={400}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-primary">{apartment.address}</span>
          <div className="flex flex-col">
            <span className="text-xl font-bold">{apartment.title}</span>
            <span className="text-xl font-bold text-primary">
              {/* {apartment.} */}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="font-bold text-[16px]">
              {formatPrice(apartment.base_price_per_night)}{" "}
            </span>
            <span className="text-xs text-muted-foreground"> / night</span>
          </div>
        </div>
        <div className="w-full flex gap-3">
          <Link href={`${pathname}/${apartment.id}`} className="flex-1">
            <Button className={"p-5 w-full"}>Book Now</Button>
          </Link>

          <Link href={`${pathname}/${apartment.id}`} className="flex-1">
            <Button className={"p-5 w-full"} variant={"outline"}>
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AllAppartmentContent = ({
  loading,
  Apartments,
}: {
  loading: boolean;
  Apartments: Apartment[];
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <ApartmentLoading key={i} />
        ))}
      </div>
    );
  }

  if (Apartments.length === 0) {
    return (
      <div>
        <EmptyApartments />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Apartments.map((ap, i) => (
        <AppartmentCard key={i} apartment={ap} />
      ))}
    </div>
  );
};
