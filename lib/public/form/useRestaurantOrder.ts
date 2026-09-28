import { data } from "motion/react-client";
import { RestaurantGuestOrderPayload } from "@/lib/types/restaurant";
import { publicClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export async function makeOrder(payload: RestaurantGuestOrderPayload) {
  try {
    const { data } = await publicClient.post("/orders", payload);
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Something went wrong");
    }
    throw e;
  }
}

export function useMakeOrder() {
  return useMutation({
    mutationFn: makeOrder,
    mutationKey: ["restaurant_order"],
  });
}
