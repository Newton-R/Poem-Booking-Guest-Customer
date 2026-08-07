import Image from "next/image";
import React from "react";

export const CollectionCard = () => {
  return (
    <div className="rounded-2xl overflow-hidden h-100 relative">
      <Image
        src={"/default.png"}
        width={200}
        height={250}
        className="w-full h-full"
        alt="Img"
      />
      <div className="absolute inset-0 bg-black/40 flex items-end">
        <div className="flex flex-col gap-1 h-fit p-6">
          <span className="text-xs p-1 px-2 w-fit rounded-full bg-primary text-black ">
            DOUALA
          </span>
          <span className="font-bold text-white text-xl">
            Business Excelence
          </span>
          <p className="text-xs text-gray-100">
            Productivity stays at Akwa and Bonanjo hubs.
          </p>
        </div>
      </div>
    </div>
  );
};
