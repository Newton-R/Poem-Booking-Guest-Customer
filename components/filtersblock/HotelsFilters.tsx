import { Location, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { regions } from "@/lib/data";
import Link from "next/link";
import { Button } from "../ui/button";
import { useGetCities } from "@/lib/public/useCitiesAmeneties";
import { City } from "../hotels/all/Hero";
import { Skeleton } from "../ui/skeleton";
interface HotelsFiltes {
  location: string;
  price_range: string;
  rating: string;
}
export const HotelsFilters = () => {
  const priceRanges = ["Under-18000", "18000-25000", "Over-25000"];
  const ratings = [5, "4.5", "4", "3.5"];
  const [filter, setFilter] = useState<HotelsFiltes>({
    location: "",
    price_range: "",
    rating: "",
  });

  const { data, isLoading: citiesLoading } = useGetCities();
  const cities: City[] | undefined = data?.data.map((data) => ({
    value: data.id,
    label: data.name,
  }));
  const selectedCity = cities?.find((city) => city.value === filter.location);

  const updateFilter = (key: keyof HotelsFiltes, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full text-[14px] grid grid-cols-1 md:grid-cols-4 items-end gap-6">
      <div className="flex flex-col gap-1">
        <span className="font-bold flex gap-1 items-center">
          <HugeiconsIcon icon={Location} size={12} />
          City
        </span>
        {citiesLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Combobox
            value={selectedCity ?? null}
            onValueChange={(val) => updateFilter("location", val?.value ?? "")}
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
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Price Range</span>
        <Combobox
          value={filter.price_range}
          onInputValueChange={(value) => updateFilter("price_range", value)}
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
          value={filter.rating}
          onInputValueChange={(value) => updateFilter("rating", value)}
          items={ratings}
        >
          <ComboboxInput className={"h-10"} placeholder="Select a rating" />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}+ stars
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <Link
        className="w-full "
        href={`/hotels/all?location=${filter.location}&priceRange=${filter.price_range}&rating=${filter.rating}`}
      >
        <Button disabled={!filter} className={"h-10 w-full flex-1 p-4 px-6"}>
          Search
          <HugeiconsIcon icon={Search} size={18} />
        </Button>
      </Link>
    </div>
  );
};
