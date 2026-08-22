import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowBigRight,
  ArrowDown,
  ArrowDown01,
  ArrowRight,
} from "@hugeicons/core-free-icons";
import { CollectionCard } from "../ui/collectionCard";
import { hotelCollections } from "@/lib/data";

export const CollectionsSection = () => {
  return (
    <section className="flex flex-col gap-6 container-x">
      <div className="w-full justify-between flex items-end">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-primary">CURATED CATEGORIES</span>
          <h2>Stay Your Way</h2>
        </div>
        <Link href={"/"} className="cursor-pointer">
          <Button variant={"link"}>
            View all collections <HugeiconsIcon icon={ArrowRight} size={20} />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelCollections.map((collection, i) => (
          <CollectionCard collection={collection} key={i} />
        ))}
      </div>
      {/* <Button
        className={"p-6 px-8 rounded-full w-fit mx-auto text-[14px]"}
        variant={"outline"}
      >
        Show More <HugeiconsIcon icon={ArrowDown} />
      </Button> */}
    </section>
  );
};
