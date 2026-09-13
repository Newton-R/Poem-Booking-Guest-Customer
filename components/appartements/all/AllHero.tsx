import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { ApartmentPriceRanges } from "@/lib/data";
import React from "react";
import { ApartmentFilter } from "./AllAppartmentBlock";
import { Skeleton } from "@/components/ui/skeleton";
import { Apartment } from "@/lib/types/apartment";
import { useGetCities } from "@/lib/public/useCitiesAmeneties";
import { City } from "@/components/hotels/all/Hero";

export const AllAppartmentHero = ({
  updateFilter,
  filter,
  clearFilter,
  apartments,
  apartmentLoading,
}: {
  updateFilter: (key: keyof ApartmentFilter, value: string) => void;
  filter: ApartmentFilter;
  clearFilter: () => void;
  apartments: Apartment[];
  apartmentLoading: boolean;
}) => {
  const { data: fetchedCities, isLoading: citiesLoading } = useGetCities();
  const cities: City[] | undefined = fetchedCities?.data?.map((data) => ({
    value: data.id,
    label: data.name,
  }));
  const selectedCity = cities?.find((city) => city.value === filter.city);

  const apartmentTypes = apartments.map(
    (apartment) => apartment.apartment_type,
  );

  return (
    <div className="lg:mt-(--nav-height) mt-(--mobile-nav-height) w-full py-8 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl text-secondary-foreground font-bold">
          All Apartments
        </h1>
        <p className="text-muted-foreground w-full md:w-[50%]">
          Experience curated luxury living in the heart of Cameroon. Our
          selection of premium apartments offers modern amenities, breathtaking
          views, and the warm hospitality of West Africa.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end py-6 border-y border-border mt-7">
        {citiesLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">City</span>
            <Combobox
              value={selectedCity}
              onValueChange={(value) =>
                updateFilter("city", value?.value ?? "")
              }
              items={cities}
            >
              <ComboboxInput className={"h-10"} placeholder="Select a city" />
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
            value={filter.price}
            onInputValueChange={(value) => updateFilter("price", value ?? "")}
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

        {apartmentLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Type</span>
            <Combobox
              value={filter.type}
              onInputValueChange={(value) => updateFilter("type", value ?? "")}
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
          </div>
        )}
        <Button
          disabled={
            !filter.city && !filter.price && !filter.type ? true : false
          }
          type="button"
          variant="outline"
          className="h-10"
          onClick={clearFilter}
        >
          Clear all filters
        </Button>
      </div>
    </div>
  );
};
