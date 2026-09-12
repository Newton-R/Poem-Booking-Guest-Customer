import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { regions } from "@/lib/data";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetCities } from "@/lib/public/useCitiesAmeneties";
import { Skeleton } from "@/components/ui/skeleton";

export type HotelFilters = {
  region: string;
  priceRange: string;
  rating: string;
  collectionId: string;
};

interface FilterBlock {
  onChange?: (filters: HotelFilters) => void;
  updateFilter: (key: keyof HotelFilters, value: string) => void;
  filters: HotelFilters;
  clearFilters: () => void;
}

export interface City {
  value: string;
  label: string;
}

export const AllHotelsHero = ({
  onChange,
  updateFilter,
  filters,
  clearFilters,
}: FilterBlock) => {
  const priceRanges = ["Under-18000", "18000-25000", "Over-25000"];
  const ratings = [5, "4.5", "4", "3.5"];
  const collections = [
    "coastal-escapes",
    "city-signatures",
    "nature-retreats",
    "heritage-stays",
  ];
  const searchParams = useSearchParams();
  const { data, isLoading: citiesLoading } = useGetCities();
  const cities: City[] | undefined = data?.data.map((data) => ({
    value: data.id,
    label: data.name,
  }));
  const selectedCity = cities?.find((city) => city.value === filters.region);

  return (
    <div className="mt-(--nav-height) w-full py-8 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl text-secondary-foreground font-bold">
          All Hotels
        </h1>
        <p className="text-muted-foreground w-full md:w-[50%]">
          Discover the finest stays across Cameroon's business hubs and coastal
          retreats. From metropolitan luxury to serene seaside getaways.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end py-6 border-y border-border mt-7">
        {citiesLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Location</span>
            <Combobox
              value={selectedCity ?? null}
              onValueChange={(value) =>
                updateFilter("region", value?.value ?? "")
              }
              items={cities}
            >
              <ComboboxInput className={"h-10"} placeholder="Select a Region" />
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
        )}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Price Range</span>
          <Combobox
            value={filters.priceRange}
            onInputValueChange={(value) => updateFilter("priceRange", value)}
            items={priceRanges}
          >
            <ComboboxInput
              className={"h-10"}
              placeholder="Select a price range"
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item.replaceAll("-", " ")}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Rating</span>
          <Combobox
            value={filters.rating}
            onInputValueChange={(value) => updateFilter("rating", value)}
            items={ratings}
          >
            <ComboboxInput className={"h-10"} placeholder="Select a rating" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={Number(item)}>
                    {item}+ stars
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        {/* <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Collections</span>
          <Combobox
            value={filters.collectionId}
            onInputValueChange={(value) => updateFilter("collectionId", value)}
            items={collections}
          >
            <ComboboxInput
              className={"h-10"}
              placeholder="Select a collection"
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item.replaceAll("-", " ")}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div> */}
        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={clearFilters}
        >
          Clear all filters
        </Button>
      </div>
    </div>
  );
};
