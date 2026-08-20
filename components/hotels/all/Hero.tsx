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

export type HotelFilters = {
  region: string;
  priceRange: string;
  rating: string;
  collectionId: string;
};

interface FilterBlock {
  onChange?: (filters: HotelFilters) => void;
}

export const AllHotelsHero = ({ onChange }: FilterBlock) => {
  const priceRanges = [
    "under-100000",
    "100000-150000",
    "150000-250000",
    "over-250000",
  ];
  const ratings = ["4.5", "4", "3.5"];
  const collections = [
    "coastal-escapes",
    "city-signatures",
    "nature-retreats",
    "heritage-stays",
  ];
  const [filters, setFilters] = useState<HotelFilters>({
    region: "",
    priceRange: "",
    rating: "",
    collectionId: "",
  });

  const updateFilter = (key: keyof HotelFilters, value: string) => {
    const nextFilters = { ...filters, [key]: value };
    setFilters(nextFilters);
    onChange?.(nextFilters);
  };

  const clearFilters = () => {
    const emptyFilters: HotelFilters = {
      region: "",
      priceRange: "",
      rating: "",
      collectionId: "",
    };
    setFilters(emptyFilters);
    onChange?.(emptyFilters);
  };

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
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Location</span>
          <Combobox
            value={filters.region}
            onInputValueChange={(value) => updateFilter("region", value)}
            items={regions}
          >
            <ComboboxInput className={"h-10"} placeholder="Select a Region" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
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
                  <ComboboxItem key={item} value={item}>
                    {item}+ stars
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <div className="flex flex-col gap-1">
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
        </div>
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
