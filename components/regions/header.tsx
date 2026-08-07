import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export const HeaderContent = () => {
  const locations = [
    {
      className: "col-span-2",
      img: "/default.png",
      region: "LITTORAL REGION",
      capital: "Douala",
      description: "The economic heart of Cameroon.",
    },
    {
      className: "col-span-1",
      img: "/default.png",
      region: "LITTORAL REGION",
      capital: "Douala",
      description: "The economic heart of Cameroon.",
    },
    {
      className: "col-span-3",
      img: "/default.png",
      region: "LITTORAL REGION",
      capital: "Douala",
      description: "The economic heart of Cameroon.",
      link: "/",
    },
    {
      className: "col-span-3",
      img: "/default.png",
      region: "LITTORAL REGION",
      capital: "Douala",
      description: "The economic heart of Cameroon.",
      link: "/",
    },
  ];
  return (
    <section className="flex container-x flex-col mt-40 gap-6">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-bold text-primary">
          THE HEART OF AFRICA
        </span>
        <h2>Explore All Regions</h2>
        <div className="w-[60%]">
          <p className="text-[14px] text-muted-foreground">
            From the mist-shrouded peaks of Mount Cameroon to the vibrant
            coastal rhythm of the Atlantic, discover the diverse landscapes and
            rich cultural heritage of Cameroon’s ten unique regions.
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6">
        {locations.map((location, i) => (
          <div
            className={cn(
              "text-2xl relative rounded-2xl overflow-hidden h-90 ",
              location.className,
            )}
          >
            <div className="absolute inset-0 bg-black/30 text-white flex items-end p-6">
              <div className="flex flex-col text-[14px] gap-1.5">
                <span className="text-gray-200">{location.region}</span>
                <span className="font-bold">{location.capital}</span>
                <p className="text-gray-200">{location.description}</p>
                {location.link && (
                  <Button
                    className={
                      "p-6 px-8 rounded-full text-[14px] bg-white text-black"
                    }
                  >
                    Explore Now
                  </Button>
                )}
              </div>
            </div>
            <Image
              alt="Img"
              src={location.img}
              key={i}
              width={400}
              height={400}
              className="w-full h-full object-cover "
            />
          </div>
        ))}
      </div>
    </section>
  );
};
