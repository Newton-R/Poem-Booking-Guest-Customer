import { data } from "motion/react-client";
import { isAxiosError } from "axios";
import { apiClient } from "../api";
import { useQuery } from "@tanstack/react-query";

async function getBookings() {
  try {
    const { data } = await apiClient.get("bookings");
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Error gettin bookings");
    }
    throw e;
  }
}

export function useGetCustomerBookings() {
  return useQuery({
    queryFn: getBookings,
    queryKey: ["customer_bookings"],
  });
}
