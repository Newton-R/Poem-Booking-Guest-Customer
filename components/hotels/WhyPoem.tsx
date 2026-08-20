import { BadgeCheck, Money, Star } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import React from "react";

export const WhyPoem = () => {
  const feats = [
    {
      icon: BadgeCheck,
      head: "Verified Amenities",
      describe:
        "Every hotel is personally visited and vetted for AC, Wi-Fi speed, and safety standards.",
    },
    {
      icon: Money,
      head: "Best Price Guarantee",
      describe:
        "We partner directly with owners to ensure you get the lowest rates available in XAF.",
    },
    {
      icon: BadgeCheck,
      head: "Local Expertise",
      describe:
        "24/7 concierge support based in Yaoundé, fluent in both French and English.",
    },
  ];
  return (
    <section className="container-x grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="text-[12px] text-primary">WHY POEM?</span>
        <h2>The Standard for Hospitality in Cameroon.</h2>
        <div className="flex flex-col mt-4 gap-6">
          {feats.map((feat, i) => (
            <div className="flex gap-2 items-start" key={i}>
              <div className="w-10 h-10 bg-secondary-foreground rounded-md text-secondary-foreground flex items-center justify-center">
                <HugeiconsIcon
                  icon={feat.icon}
                  size={24}
                  className="fill-white"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">{feat.head}</span>
                <p className="text-muted-foreground">{feat.describe}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 h-112.5 rounded-2xl  relative">
        <Image
          src={"/restau.jpg"}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-2xl"
          alt="image"
        />
        <div className="absolute p-4 border text-[14px] flex w-60 flex-col text-black gap-2 rounded-2xl -bottom-10 -left-10 border-white bg-white/40 backdrop-blur-[3px]">
          <div className="flex gap-2">
            <div className="flex gap-1 items-center text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon
                  icon={Star}
                  size={18}
                  key={i}
                  className="fill-primary"
                />
              ))}
            </div>
            <span className="font-bold">4.9/5</span>
          </div>
          <p className="text-[12px] ">
            "The only platform where 'high-speed internet' actually means
            high-speed internet. Exceptional service!"
          </p>
          <span className="text-[12px] font-bold">
            — Jean-Paul E., Business Traveler
          </span>
        </div>
      </div>
    </section>
  );
};
