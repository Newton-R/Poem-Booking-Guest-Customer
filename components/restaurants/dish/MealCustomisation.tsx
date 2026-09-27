"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/data";
import { adon, Dish } from "@/lib/types";
import { RestaurantMenuItem } from "@/lib/types/restaurant";
import { useCartStore } from "@/lib/useCart";
import { Minus, Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import { toast } from "sonner";

export interface CartItem {
  dish: RestaurantMenuItem;
  quantity: number;
  adons?: adon[] | null;
  specifications?: string;
  price: string;
}

export const MealCustomisation = ({ dish }: { dish: RestaurantMenuItem }) => {
  const [MealData, setMeal] = useState<CartItem>({
    dish: dish,
    quantity: 1,
    adons: null,
    specifications: "",
    price: "",
  });

  const totalAdonsPrice = MealData.adons?.reduce(
    (sum, addon) => sum + Number(addon.price),
    0,
  );

  const MealPrice = totalAdonsPrice
    ? MealData.dish.priceXaf + totalAdonsPrice
    : MealData.dish.priceXaf;

  const { addItem } = useCartStore();

  const handleAddtoCart = () => {
    try {
      // if (MealData.quantity > 0) {
      //   addItem(
      //     MealData.dish,
      //     String(MealPrice * MealData.quantity),
      //     MealData.adons,
      //     MealData.specifications,
      //     MealData.quantity,
      //   );
      //   toast.success(`${MealData.dish.name} added to cart 🎉`);
      // } else {
      //   toast.error("Quantity must be greater than 0");
      // }
    } catch (e) {
      toast.error("Error adding item to cart");
    }
  };

  const handleAddAdons = (
    e: React.ChangeEvent<HTMLInputElement>,
    adon: adon,
  ) => {
    const { checked } = e.target;
    setMeal((prev) => ({
      ...prev,
      adons: checked
        ? [...(prev.adons ?? []), adon]
        : MealData.adons?.filter((a) => a.name !== adon.name),
    }));
  };

  const handleSpecification = (value: string) => {
    setMeal((prev) => ({ ...prev, specifications: value }));
  };

  const addQuantity = () => {
    setMeal((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };
  const decreaseQuantity = () => {
    if (MealData.quantity > 0) {
      setMeal((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
    } else {
      return;
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-3">
        <span className="text-[14px] font-bold">Customize your order</span>
        <div className="flex flex-col gap-4 text-xs">
          {/* <div className="flex flex-col gap-0.5">
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
          </div> */}
          <div className="flex flex-col">
            <span className="text-muted-foreground font-bold mb-2">
              Add Sides
            </span>
            {/* <div className="flex flex-col gap-2">
              {dish.addOns.map((adon, i) => (
                <div
                  key={i}
                  className="border border-border rounded-md p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <Input
                      type="checkbox"
                      checked={
                        MealData.adons
                          ? MealData.adons.some((a) => a.name === adon.name)
                          : false
                      }
                      onChange={(e) => handleAddAdons(e, adon)}
                      id="check"
                      className="w-4 h-4"
                    />
                    <label htmlFor="">{adon.name}</label>
                  </div>
                  <span className="text-primary">+{adon.price} XAF</span>
                </div>
              ))}
            </div> */}
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground font-bold mb-2">
              Special instruction
            </span>
            <Textarea
              value={MealData.specifications}
              onChange={(e) => handleSpecification(e.target.value)}
              placeholder="Any allergies or preferences?"
              className="h-10 w-full bg-white"
            ></Textarea>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <div className="p-4 rounded-md bg-blue-50 flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <Button size={"icon-sm"} onClick={() => decreaseQuantity()}>
                  <HugeiconsIcon icon={Minus} size={20} />
                </Button>
                <span className="text-xl">{MealData.quantity}</span>
                <Button size={"icon-sm"} onClick={() => addQuantity()}>
                  <HugeiconsIcon icon={Plus} size={20} />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Subtotal:</span>
                <span className="text-primary text-xl">
                  {formatPrice(MealPrice * MealData.quantity)}
                </span>
              </div>
            </div>
            <Button
              onClick={() => handleAddtoCart()}
              className={"p-6 w-full text-[16px]"}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
