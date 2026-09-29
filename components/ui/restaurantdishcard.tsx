"use client";
import React from "react";
import { Button } from "./button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plus } from "@hugeicons/core-free-icons";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Dish } from "@/lib/types";
import { RestaurantMenuItem } from "@/lib/types/restaurant";
import { formatPrice } from "@/lib/data";

export const DishCard = ({ Dish }: { Dish: RestaurantMenuItem }) => {
  const pathname = usePathname();
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL + Dish.imageUrl;
  return (
    <div className="w-full flex overflow-hidden h-80 flex-col gap-3">
      <div className="w-full flex flex-1 overflow-hidden rounded-2xl gap-2">
        <img
          src={imgUrl}
          className="w-full h-full object-cover"
          width={500}
          height={500}
          alt="image"
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-col text-[14px] gap-0.5">
          <span className="text-primary font-bold"></span>
          <Link href={"/"}>
            <Button className={"font-bold text-[14px] px-0"} variant={"link"}>
              {Dish.name}
            </Button>
          </Link>
          <p>{Dish.description}</p>
        </div>
        <div className="w-full justify-between mt-2 flex items-center">
          <span className="text-primary text-xs">
            {formatPrice(Dish.priceXaf)}
          </span>
          <Link href={`/restaurants/${param.id}/${Dish.id}`}>
            <Button className={"text-xs p-1 px-3 rounded-md"}>
              <HugeiconsIcon icon={Plus} size={18} />
              ADD TO CART
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
