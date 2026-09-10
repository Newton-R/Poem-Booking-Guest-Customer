"use client";
import { ArrowRight01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { HotelsFilters } from "../filtersblock/HotelsFilters";

export const HeroMain = () => {
  return (
    <section className="w-full flex items-center justify-center text-white h-screen md:h-[calc(600px+var(--nav-height))] bg-[url('/default.png')] bg-cover relative">
      <div className="absolute inset-0 bg-black/40">
        <div className="w-full h-full mt-[calc(var(--mobile-nav-height)-40px)] lg:mt-(--nav-height) container-x flex flex-col justify-center">
          <div className="flex flex-col gap-6 text-start w-full md:max-w-[50%]">
            <h1 className="text-6xl flex flex-col gap-2 font-bold">
              <span className="text-white font-bold">The Sahelian Beauty</span>
            </h1>
            <p className="text-gray-100">
              Curated comfort across the nation from the mist of Mount Cameroon
              to the vibrant street of Douala. Explore Cameroon in one place.
            </p>
            <Link href={"/hotels/all"}>
              <Button className="p-6 w-40 flex items-center gap-2 ">
                Explore Hotels <HugeiconsIcon icon={ArrowRight01FreeIcons} />
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-fit mt-8 shadow-md p-4 text-black bg-white rounded-2xl border border-border flex flex-col">
            <HotelsFilters />
          </div>
        </div>
      </div>
    </section>
  );
};
