"use client";
import React, { Suspense, useEffect, useState } from "react";
import { AllAppartmentHero } from "./AllHero";
import { AllAppartmentContent } from "./AllContent";
import { apartments } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { useGetApartments } from "@/lib/public/useGetApartments";
import { Apartment } from "@/lib/types/apartment";

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

  const apartmentsFormated = apartments.filter((a) => {
    const FilteredCity = !filters.city || a.city === filters.city;
    const FilteredType = !filters.type || a.type === filters.type;
    const FilteredPrice =
      !filters.price ||
      (filters.price === "under-50000" && a.price < 50000) ||
      (filters.price === "50000-100000" &&
        a.price >= 50000 &&
        a.price <= 100000) ||
      (filters.price === "100000-150000" &&
        a.price > 100000 &&
        a.price <= 150000) ||
      (filters.price === "over-150000" && a.price > 150000);
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

  const { data } = useGetApartments();
  console.log({ data: data });
  return (
    <div className="flex flex-col gap-10 md:gap-20 container-x">
      <AllAppartmentHero
        filter={filters}
        clearFilter={() => ClearFilter()}
        updateFilter={(key, val) => UpdateFilter(key, val)}
      />
      <AllAppartmentContent
        Apartments={data?.data.data ?? ([] as Apartment[])}
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
