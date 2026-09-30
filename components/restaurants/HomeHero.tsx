import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { Button } from "../ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";

type RestaurantFilters = {
  cuisine: string;
  rating: string;
  delivery: string;
  openOnly: boolean;
};

export const RestaurantsHomeHero = ({
  query,
  onQueryChange,
  filters,
  onFilterChange,
  onClearFilters,
  cuisines,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  filters: RestaurantFilters;
  onFilterChange: <Key extends keyof RestaurantFilters>(
    key: Key,
    value: RestaurantFilters[Key],
  ) => void;
  onClearFilters: () => void;
  cuisines: string[];
}) => {
  const ratings = ["4.5", "4", "3"];
  const deliveryTimes = ["30", "45", "60"];
  return (
    <div className="bg-bg-mute/40 mt-(--mobile-nav-height) md:mt-[calc(var(--nav-height))] py-30">
      <div className="container-x flex flex-col items-center justify-center gap-4">
        <span className="font-bold text-xs">
          The flavors of Cameroon, delivered.
        </span>
        <span className="text-xl">
          Discover culinary excellence across the nation, curated for your
          palate.
        </span>
        <form
          className="w-full max-w-xl gap-4 rounded-full shadow-md flex items-center bg-blue-50 p-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <HugeiconsIcon
            icon={Search}
            size={20}
            className="text-muted-foreground"
          />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="bg-none border-none outline-0 flex-1 ring-0"
            placeholder="Search for restaurants, cuisines or dishes..."
            aria-label="Search restaurants, cuisines or dishes"
          />
          <Button
            type="submit"
            className={
              "rounded-full bg-secondary-foreground hover:bg-secondary-foreground/90 p-2 px-4 "
            }
          >
            Find Food
          </Button>
        </form>
        {/* <div className="grid grid-cols-2 w-full md:grid-cols-3 mx-auto gap-4 mt-2 items-center justify-center">
          <Combobox
            value={filters.cuisine}
            onValueChange={(value) => onFilterChange("cuisine", value ?? "")}
            items={cuisines}
          >
            <ComboboxInput
              className={"h-10 min-w-30 bg-white"}
              placeholder="Cuisine"
            />
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
          <Combobox
            value={filters.rating}
            onValueChange={(value) => onFilterChange("rating", value ?? "")}
            items={ratings}
          >
            <ComboboxInput
              className={"h-10 min-w-30 bg-white"}
              placeholder="Rating"
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
          <Combobox
            value={filters.delivery}
            onValueChange={(value) => onFilterChange("delivery", value ?? "")}
            items={deliveryTimes}
          >
            <ComboboxInput
              className="h-10 min-w-36 bg-white"
              placeholder="Delivery time"
            />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    Under {item} min
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <label className="flex items-center gap-2 text-xs whitespace-nowrap">
            <input
              type="checkbox"
              checked={filters.openOnly}
              onChange={(event) =>
                onFilterChange("openOnly", event.target.checked)
              }
            />
            Open now
          </label>
          <Button
            type="button"
            variant="outline"
            className={"p-5"}
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </div> */}
      </div>
    </div>
  );
};
