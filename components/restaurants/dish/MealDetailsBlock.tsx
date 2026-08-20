"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DishCard } from "@/components/ui/restaurantdishcard";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  ChickenThighsIcon,
  Minus,
  Plus,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const MealDetailsBlock = () => {
  const router = useRouter();
  const ingredients = [
    {
      icon: ChickenThighsIcon,
      label: "Farm Chicken",
    },
  ];
  return (
    <main className="container-x flex flex-col gap-20 mt-[calc(var(--nav-height)+10px)]">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
        <div className="col-span-3 flex flex-col gap-5">
          <div className=" h-100">
            <Image
              src={"/restau.jpg"}
              width={400}
              height={400}
              className="w-full rounded-2xl h-full object-cover"
              alt="Meal Picture"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[14px] font-bold">Description</span>
            <p className="text-xs text-muted-foreground">
              "DG" stands for "Directeur Général" the CEO's chicken.
              Traditionally served to VIPs, our signature version elevates this
              Cameroonian classic with organic free-range chicken, slow-roasted
              plantains, and a secret blend of twelve heritage spices simmered
              in a rich tomato reduction.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[14px] font-bold">Ingredients</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex p-2 justify-center items-center text-xs gap-2 bg-white text-muted-foreground border border-bo rounded-md"
                >
                  <HugeiconsIcon
                    icon={ChickenThighsIcon}
                    size={18}
                    className="text-primary"
                  />
                  <span>Farm Chicken</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex flex-col gap-1 pb-4 border-b border-border">
            <h1 className="text-3xl font-bold">Poulet DG Signature</h1>
            <span className="text-primary">12,000 XAF</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <span className="text-[14px] font-bold">
                Customize your order
              </span>
              <div className="flex flex-col gap-4 text-xs">
                <div className="flex flex-col gap-0.5">
                  <label className="text-xs text-muted-foreground font-bold">
                    Extra spice level
                  </label>
                  <div className="flex gap-2 text-[14px]">
                    <div className="flex items-center gap-1">
                      <Input type="radio" id="none" />
                      <label htmlFor="none">None</label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Input type="radio" id="mild" />
                      <label htmlFor="mild">Mild</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-bold mb-2">
                    Add Sides
                  </span>
                  <div className="border border-border rounded-md p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Input type="checkbox" id="check" className="w-4 h-4" />
                      <label htmlFor="">Extra Plantains</label>
                    </div>
                    <span className="text-primary">+1,500 XAF</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-bold mb-2">
                    Special instruction
                  </span>
                  <Textarea
                    placeholder="Any allergies or preferences?"
                    className="h-10 w-full bg-white"
                  ></Textarea>
                </div>
                <div className="flex flex-col gap-4 mt-6">
                  <div className="p-4 rounded-md bg-blue-50 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <Button size={"icon-sm"}>
                        <HugeiconsIcon icon={Minus} size={20} />
                      </Button>
                      <span className="text-xl">2</span>
                      <Button size={"icon-sm"}>
                        <HugeiconsIcon icon={Plus} size={20} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Subtotal:
                      </span>
                      <span className="text-primary text-xl">12,500 XAF</span>
                    </div>
                  </div>
                  <Button className={"p-6 w-full text-[16px]"}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <h2>From the same Kitchen</h2>
            <p className="text-muted-foreground text-[14px]">
              Complete your feast with these favorites
            </p>
          </div>

          <Button onClick={() => router.back()} variant={"link"}>
            View full menu
            <HugeiconsIcon icon={ArrowRight} size={20} />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <DishCard key={i} />
          ))}
        </div>
      </section>
    </main>
  );
};
