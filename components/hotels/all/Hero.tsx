import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import React from "react";

export const AllHotelsHero = () => {
  const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

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
          <Combobox items={frameworks}>
            <ComboboxInput
              className={"h-10"}
              placeholder="Select a framework"
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
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Price Range</span>
          <Combobox items={frameworks}>
            <ComboboxInput
              className={"h-10"}
              placeholder="Select a framework"
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
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Rating</span>
          <Combobox items={frameworks}>
            <ComboboxInput
              className={"h-10"}
              placeholder="Select a framework"
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
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Collections</span>
          <Combobox items={frameworks}>
            <ComboboxInput
              className={"h-10"}
              placeholder="Select a framework"
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
        </div>
        <Button
          className={
            "bg-secondary-foreground hover:bg-secondary-foreground/90 p-5"
          }
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
};
