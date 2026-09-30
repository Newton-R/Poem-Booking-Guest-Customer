import { data } from "motion/react-client";
import {
  OrderInitiationDataResponse,
  RestaurantCustomerOrderPayload,
} from "@/lib/types/restaurant";
import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export async function makeOrder(
  payload: RestaurantCustomerOrderPayload,
): Promise<OrderInitiationDataResponse> {
  try {
    const { data } = await apiClient.post<OrderInitiationDataResponse>(
      "/orders",
      payload,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Something went wrong");
    }
    throw e;
  }
}

export function useMakeCustomerOrder() {
  return useMutation({
    mutationFn: makeOrder,
    mutationKey: ["customer_restaurant_order"],
  });
}
