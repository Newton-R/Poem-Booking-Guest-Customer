import React, { useState } from "react";
import { ApartmentFilter } from "../appartements/all/AllAppartmentBlock";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Box, Location, Money, Search } from "@hugeicons/core-free-icons";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { ApartmentPriceRanges } from "@/lib/data";
import Link from "next/link";
import { Button } from "../ui/button";
import { useGetCities } from "@/lib/public/useCitiesAmeneties";
import { City } from "../hotels/all/Hero";
import { Skeleton } from "../ui/skeleton";
import { useGetApartments } from "@/lib/public/useGetApartments";

export const ApartmentFilters = () => {
  const [filter, setFilter] = useState<ApartmentFilter>({
    price: "",
    type: "",
    city: "",
  });

  const pathname = usePathname();

  const UpdateFilter = (key: keyof ApartmentFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const { data, isLoading: CitiesLoading } = useGetCities();
  const cities: City[] | undefined = data?.data.map((data) => ({
    value: data.id,
    label: data.name,
  }));
  const selectedCity = cities?.find((city) => city.value === filter.city);

  const { data: apartments, isLoading: apartmentLoading } = useGetApartments();
  const apartmentTypes = apartments?.data?.data.map(
    (apartment) => apartment.apartment_type,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-bold flex gap-1 items-center">
          <HugeiconsIcon icon={Location} size={12} />
          City
        </span>
        {CitiesLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Combobox
            value={selectedCity}
            onValueChange={(val) => UpdateFilter("city", val?.value ?? "")}
            items={cities}
          >
            <ComboboxInput className={"h-10"} placeholder="Select an city" />
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
        <span className="font-bold flex gap-1 items-center">
          <HugeiconsIcon icon={Box} size={12} />
          Type
        </span>
        {apartmentLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Combobox
            value={filter.type}
            onInputValueChange={(value) => UpdateFilter("type", value ?? "")}
            items={apartmentTypes}
          >
            <ComboboxInput className={"h-10"} placeholder="Select a Type" />
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
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold flex gap-1 items-center">
          <HugeiconsIcon icon={Money} size={12} />
          Price Range
        </span>
        <Combobox
          value={filter.price}
          onInputValueChange={(value) => UpdateFilter("price", value ?? "")}
          items={ApartmentPriceRanges}
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
      <Link
        href={
          pathname === "/"
            ? `/appartment/all?city=${filter.city}&price=${filter.price}&type=${filter.type}`
            : `${pathname}/all?city=${filter.city}&price=${filter.price}&type=${filter.type}`
        }
      >
        <Button
          disabled={
            !filter.city && !filter.price && !filter.type ? true : false
          }
          className={" p-5 w-full"}
        >
          <HugeiconsIcon icon={Search} size={20} /> Search Appartments
        </Button>
      </Link>
    </div>
  );
};
