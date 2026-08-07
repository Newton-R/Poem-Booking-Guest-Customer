import Image from "next/image";
import React from "react";

export const Destinations = () => {
  return (
    <section className="flex container-x flex-col gap-6">
      <div className="w-full flex items-center justify-between">
        <h2>Explore Destinations</h2>
        <span className="text-primary text-xs">View all Regions</span>
      </div>
      <div className="w-full grid gap-6 grid-cols-2">
        <div className="min-h-40 row-span-2 rounded-2xl overflow-hidden">
          <Image
            src={"/default.png"}
            height={300}
            width={400}
            alt="Just an Image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-95 rounded-2xl overflow-hidden">
          <Image
            src={"/default.png"}
            height={300}
            width={400}
            alt="Just an Image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex gap-6">
          <div className="min-h-40 flex-1 rounded-2xl overflow-hidden">
            <Image
              src={"/default.png"}
              height={300}
              width={400}
              alt="Just an Image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-h-40 flex-1 rounded-2xl overflow-hidden">
            <Image
              src={"/default.png"}
              height={300}
              width={400}
              alt="Just an Image"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
