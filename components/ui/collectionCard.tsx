import { HotelCollection } from "@/lib/types";
import SafeImage from "@/components/ui/safe-image";
import React from "react";

export const CollectionCard = ({
  collection,
}: {
  collection: HotelCollection;
}) => {
  return (
    <div className="rounded-2xl overflow-hidden h-100 relative">
      <SafeImage
        src={collection.image}
        width={200}
        height={250}
        className="w-full h-full"
        alt={collection.name}
      />
      <div className="absolute inset-0 bg-black/40 flex items-end">
        <div className="flex flex-col gap-1 h-fit p-6">
          {/* <span className="text-xs p-1 px-2 w-fit rounded-full bg-primary text-black ">
           
          </span> */}
          <span className="font-bold text-white text-xl">
            {collection.name}
          </span>
          <p className="text-xs text-gray-100">{collection.description}</p>
        </div>
      </div>
    </div>
  );
};
