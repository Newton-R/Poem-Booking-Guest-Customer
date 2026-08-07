import {
  ArrowRight01FreeIcons,
  Bed,
  Building01Icon,
  Bus01FreeIcons,
  Calendar,
  DotFreeIcons,
  Location,
  People,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";

export const HeroMain = () => {
  return (
    <section className="w-full flex items-center justify-center text-white h-[calc(600px+var(--nav-height))] bg-[url('/default.png')] bg-cover relative">
      <div className="absolute inset-0 bg-black/40">
        <div className="w-full h-[600px] mt-(--nav-height) container-x border-b border-border flex flex-col justify-center">
          <div className="flex flex-col gap-6 text-start w-full max-w-[50%]">
            <h1 className="text-6xl flex flex-col gap-2 font-bold">
              <span className="text-white font-bold">The Sahelian Beauty</span>
            </h1>
            <p className="text-gray-100">
              Curated comfort across the nation from the mist of Mount Cameroon
              to the vibrant street of Douala. Explore Cameroon in one place.
            </p>
            <Button className="p-6 w-40 flex items-center gap-2 ">
              Explore Hotels <HugeiconsIcon icon={ArrowRight01FreeIcons} />
            </Button>
          </div>

          <div className="w-full md:w-[85%] mt-8 shadow-md text-black bg-white rounded-2xl border border-border flex flex-col">
            <div className="w-full text-[14px] p-4 border-b border-border flex flex-row items-center">
              <span className="flex items-center gap-2 px-2">
                <HugeiconsIcon icon={Bed} size={18} />
                Hotels
              </span>
              <span className="flex items-center px-2 gap-2">
                <HugeiconsIcon icon={Building01Icon} size={18} />
                Appartments
              </span>
              <span className="flex items-center px-2 gap-2">
                <HugeiconsIcon icon={Bus01FreeIcons} size={18} />
                Buses
              </span>
            </div>
            <div className="w-full text-[14px] p-4 justify-between flex items-center">
              <div className="flex flex-col gap-1">
                <span className="font-bold flex gap-1 items-center">
                  <HugeiconsIcon icon={Location} size={12} />
                  Location
                </span>
                <p className="text-muted-foreground">
                  Where are you heading to?
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold flex gap-1 items-center">
                  <HugeiconsIcon icon={Calendar} size={12} />
                  Dates
                </span>
                <p className="text-muted-foreground">Check in - Check out</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold flex gap-1 items-center">
                  <HugeiconsIcon icon={People} size={12} />
                  Guests
                </span>
                <p className="text-muted-foreground">2 Adults, 1 room</p>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
