import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const DiscoverMore = () => {
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
    <section className="container-x flex flex-col gap-6">
      <h2>Explore Now</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location, i) => (
          <Link
            key={i}
            href={`/regions/${location.capital}`}
            className={cn(
              "text-2xl relative cursor-pointer rounded-2xl overflow-hidden h-90 ",
            )}
          >
            <div className="absolute inset-0 bg-black/30 text-white flex items-end p-6">
              <div className="flex flex-col text-[14px] gap-1.5">
                <span className="text-gray-200">{location.region}</span>
                <span className="font-bold">{location.capital}</span>
                <p className="text-gray-200">{location.description}</p>
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
          </Link>
        ))}
      </div>
    </section>
  );
};
