import { LoadingGridHero } from "@/components/loaders/hoteldetails/GridHero";
import { Apartment } from "@/lib/types";
import { ApartmentDetail } from "@/lib/types/apartment";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const AppartmentDetailsHero = ({
  apartment,
  isLoading,
}: {
  apartment: ApartmentDetail;
  isLoading: Boolean;
}) => {
  if (isLoading) {
    return (
      <div className="container-x">
        <LoadingGridHero />
      </div>
    );
  }

  const images = apartment.images.map(
    (img) => process.env.NEXT_PUBLIC_IMAGE_URL + img.image_url,
  );

  const length = images.length;
  return (
    <div className=" grid grid-rows-2 container-x hero border-none gap-2  grid-cols-1  md:grid-cols-4 relative">
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "rounded-2xl overflow-hidden",
            index === 0
              ? "md:col-span-2 md:row-span-2"
              : index === 1 && length === 4
                ? "col-span-1 row-span-1"
                : index === 2
                  ? "col-span-1 row-span-1 hidden md:flex"
                  : index === 3
                    ? "col-span-2 row-span-1 hidden md:flex"
                    : "",
          )}
        >
          <Image
            width={200}
            height={200}
            src={image}
            alt={`room image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
