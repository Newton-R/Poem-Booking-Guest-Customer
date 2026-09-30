import { ArrowRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import SafeImage from "@/components/ui/safe-image";

const CollectionsCard = ({ index }: { index: number }) => {
  return (
    <div
      className={cn(
        "h-40 rounded-2xl relative overflow-hidden",
        index === 0
          ? "col-span-1 md:col-span-3"
          : index === 1 || index === 2
            ? "grid-cols-1"
            : "",
      )}
    >
      {" "}
      <div className="bg-black/40 absolute p-6 inset-0 flex flex-col gap-1 text-white justify-end">
        <span className="text-white bg-primary text-xs w-fit p-1 px-2 rounded-full">
          Business
        </span>
        <div className="flex flex-col">
          <span className="font-bold text-xl mt-1.5">
            Yaoundé Business Suites
          </span>
          <p className="opacity-80 text-[14px]">
            Stay productive with dedicated workspaces and high-speed
            connectivity.
          </p>
        </div>
      </div>
      <SafeImage
        src={"/default.png"}
        alt=""
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const AppartmentCollections = () => {
  return (
    <section className="container-x flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-primary uppercase">Top Rated</span>
        <div className="w-full flex flex-col gap-4 justify-between items-end md:flex-row">
          <div className="flex flex-col gap-1">
            <h2>Featured Collections</h2>
            <p className="text-[14px] text-muted-foreground">
              Hand-picked furnished apartments designed for the modern business
              traveler and luxury vacationer.
            </p>
          </div>
          <Link href={"/"}>
            <Button variant={"link"}>
              View All Collections <HugeiconsIcon icon={ArrowRight} size={20} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        <CollectionsCard index={0} />
      </div>
    </section>
  );
};
