"use client";
import React, { Suspense, useEffect, useState } from "react";
import { AllAppartmentHero } from "./AllHero";
import { AllAppartmentContent } from "./AllContent";
import { apartments } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { useGetApartments } from "@/lib/public/useGetApartments";
import { Apartment } from "@/lib/types/apartment";
import { City } from "@/components/hotels/all/Hero";
import { useGetCities } from "@/lib/public/useCitiesAmeneties";

export interface ApartmentFilter {
  city: string;
  price: string;
  type: string;
}

export const priceRange: Record<string, { max: number; min: number }> = {
  "< 50000": { max: 50000, min: 0 },
};

export const AllAppartmentBlock = () => {
  const searchParams = useSearchParams();

  const urlFilters = {
    city: searchParams.get("city"),
    price: searchParams.get("price"),
    type: searchParams.get("type"),
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ApartmentFilter>({
    city: urlFilters.city ? urlFilters.city : "",
    price: urlFilters.price ? urlFilters.price : "",
    type: urlFilters.type ? urlFilters.type : "",
  });

  const UpdateFilter = (key: keyof ApartmentFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const { data, isLoading, isError, refetch } = useGetApartments();

  console.log({ data: data });

  const apartmentsFormated = data?.data.data.filter((a) => {
    const FilteredCity = !filters.city || a.city_id === filters.city;
    const FilteredType = !filters.type || a.apartment_type === filters.type;
    const FilteredPrice =
      !filters.price ||
      (filters.price === "under-50000" && a.base_price_per_night < 50000) ||
      (filters.price === "50000-100000" &&
        a.base_price_per_night >= 50000 &&
        a.base_price_per_night <= 100000) ||
      (filters.price === "100000-150000" &&
        a.base_price_per_night > 100000 &&
        a.base_price_per_night <= 150000) ||
      (filters.price === "over-150000" && a.base_price_per_night > 150000);
    return FilteredCity && FilteredType && FilteredPrice;
  });

  const ClearFilter = () => {
    setFilters({ city: "", price: "", type: "" });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col gap-10 md:gap-20 container-x">
      <AllAppartmentHero
        apartmentLoading={isLoading}
        apartments={data?.data.data ?? ([] as Apartment[])}
        filter={filters}
        clearFilter={() => ClearFilter()}
        updateFilter={(key, val) => UpdateFilter(key, val)}
      />
      <AllAppartmentContent
        refetch={refetch}
        isError={isError}
        Apartments={apartmentsFormated}
        loading={loading}
      />
    </div>
  );
};

export const AllAppartmentBlockDone = () => {
  return (
    <Suspense>
      <AllAppartmentBlock />
    </Suspense>
  );
};
