import { ArrowRight, Calendar, Location } from "@hugeicons/core-free-icons";
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
import { usePathname } from "next/navigation";
import { regions } from "@/lib/data";
import { DatePickerDemo } from "../ui/date-picker";
import Link from "next/link";
import { Button } from "../ui/button";
import { useGetCities } from "@/lib/public/useCitiesAmeneties";
import { Skeleton } from "../ui/skeleton";

interface BusFilter {
  origin: string;
  destination: string;
  departure: string;
}

export const BusFilter = () => {
  const [filter, setFilter] = useState({
    origin: "",
    destination: "",
    departure: "",
  });
  const { data, isLoading: citiesLoading } = useGetCities();
  const cities = data?.data.map((data) => ({
    value: data.id,
    label: data.name,
  }));
  console.log({ cities: cities });

  const pathname = usePathname();

  const UpdateFilter = (key: keyof BusFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-bold flex gap-1 items-center">
          <HugeiconsIcon icon={Location} size={12} />
          Origin
        </span>
        {citiesLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Combobox
            disabled={citiesLoading}
            onInputValueChange={(val) => UpdateFilter("origin", val)}
            items={cities}
          >
            <ComboboxInput className={"h-10"} placeholder="Select an origin" />
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
          <HugeiconsIcon icon={Location} size={12} />
          Destination
        </span>
        {citiesLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Combobox
            disabled={citiesLoading}
            onInputValueChange={(val) => UpdateFilter("destination", val)}
            items={cities}
          >
            <ComboboxInput
              className={"h-10"}
              placeholder="Select an destination"
            />
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
          <HugeiconsIcon icon={Calendar} size={12} />
          Departure
        </span>
        <DatePickerDemo
          onChange={(e) => UpdateFilter("departure", String(e))}
        />
      </div>
      <Link
        href={
          pathname === "/"
            ? `/buses/all?origin=${filter.origin}&departure=${filter.departure}&destination=${filter.destination}`
            : `${pathname}/all?origin=${filter.origin}&departure=${filter.departure}&destination=${filter.destination}`
        }
      >
        <Button
          disabled={
            !filter.departure && !filter.destination && !filter.departure
          }
          className={" p-5 w-full"}
        >
          Find Best Routes <HugeiconsIcon icon={ArrowRight} size={20} />
        </Button>
      </Link>
    </div>
  );
};
