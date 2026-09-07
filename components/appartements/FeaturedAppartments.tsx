"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft, ArrowRight } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { apartments } from "@/lib/data";
import { Apartment } from "@/lib/types";
import { useGetApartments } from "@/lib/public/useGetApartments";

const FeaturedAppartmentCard = ({ apartment }: { apartment: Apartment }) => {
  return (
    <div className="flex flex-col gap-4 h-90">
      <div className="flex flex-1 rounded-2xl overflow-hidden relative">
        <span className="absolute top-2 right-2 text-xs text-primary font-bold p-1 px-2 rounded-full bg-white/50 w-fit">
          New
        </span>
        <Image
          src={apartment.image}
          className="h-full w-full object-cover"
          width={300}
          height={300}
          alt={`${apartment.name} image`}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-bold">{apartment.name}</span>
        <div className="flex flex-col gap-1.5 text-[14px] text-muted-foreground ">
          <span>
            {apartment.city}, {apartment.region}
          </span>
          <span>{apartment.bedrooms} BR • Laundry • High-Speed</span>
        </div>
        <span className="font-bold">
          Starting from {apartment.formattedPrice}
        </span>
      </div>
    </div>
  );
};

export const FeaturedAppartments = () => {
  const featuredApartments = apartments.filter(
    (apartment) => apartment.featured,
  );
  const { data } = useGetApartments();
  console.log({ aparemnts: data });
  return (
    <section className="container-x flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-primary uppercase">Top Rated</span>
        <div className="w-full flex flex-col gap-4 justify-between items-end md:flex-row">
          <div className="flex flex-col gap-1">
            <h2>Featured Apartments</h2>
            <p className="text-[14px] text-muted-foreground">
              Experience the finest living spaces across Cameroon's most
              prestigious neighborhoods.
            </p>
          </div>
          <Link href={"/appartment/all"}>
            <Button variant={"link"}>
              View All <HugeiconsIcon icon={ArrowRight} size={20} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredApartments.map((apartment, i) => (
          <FeaturedAppartmentCard apartment={apartment} key={i} />
        ))}
      </div>
    </section>
  );
};
