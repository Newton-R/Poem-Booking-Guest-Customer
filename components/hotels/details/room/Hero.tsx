import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Location, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const RoomDetailsHero = () => {
  const hotelImages = [
    {
      img: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "col-span-2 row-span-2",
    },
    {
      img: "https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "col-span-1 row-span-1",
    },
    {
      img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "col-span-1 row-span-1",
    },
    {
      img: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "col-span-2 row-span-1",
    },
  ];
  return (
    <div className=" grid grid-rows-2 container-x hero border-none gap-2  grid-cols-4 relative">
      {/* <div className="absolute top-0 left-0 w-full h-full  flex items-end p-6 bg-black/60 z-10">
        <div className="container-x flex flex-col gap-2 justify-end">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-2">
              <div>
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HugeiconsIcon
                      icon={Star}
                      key={i}
                      size={18}
                      className="text-yellow-400 fill-yellow-400 text-[14px]"
                    />
                  ))}
                </span>
              </div>
              <span className="text-4xl font-bold text-white">
                The Hilton yaounde
              </span>
              <span className="flex items-center gap-2 text-white">
                <HugeiconsIcon icon={Location} size={18} />
                <span>Yaounde, Cameroon</span>
              </span>
            </div>
            <div className="flex gap-2 text-white ">
              <Button className={"p-4 px-5 rounded-full"}>
                View all Photos
              </Button>
            </div>
          </div>
        </div>
      </div> */}
      {hotelImages.map((image, index) => (
        <div
          key={index}
          className={cn("rounded-2xl overflow-hidden", image.className)}
        >
          <img
            src={image.img}
            alt={`Hotel ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};
