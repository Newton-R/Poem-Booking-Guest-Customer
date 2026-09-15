"use client";
import React, { useEffect, useState } from "react";
import { AppartmentDetailsHero } from "./DetailsHero";
import { AppartmentDetailsContent } from "./AppartmentDetailsContent";
import { Apartment } from "@/lib/types";
import { useGetApartmentDetails } from "@/lib/public/useGetApartments";
import { ApartmentDetail } from "@/lib/types/apartment";

export const AppartmentDetailsBlock = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetApartmentDetails(id);

  return (
    <div className="container-x flex flex-col gap-10">
      <AppartmentDetailsHero
        isLoading={isLoading}
        apartment={data?.data ?? ({} as ApartmentDetail)}
      />
      <AppartmentDetailsContent
        apartment={data?.data ?? ({} as ApartmentDetail)}
        loading={isLoading}
      />
    </div>
  );
};
