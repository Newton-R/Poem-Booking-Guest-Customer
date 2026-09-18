import { data } from "motion/react-client";
import { apiClient, publicClient } from "@/lib/api";
import { ErrorType } from "@/lib/defined_types";
import {
  BookingInitiatePayload,
  BookingInitiationResponse,
  CustomerBookingInitiatePayload,
} from "@/lib/types/booking";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

async function InitiateBooking(
  payload: CustomerBookingInitiatePayload,
): Promise<BookingInitiationResponse> {
  try {
    const { data } = await apiClient.post<BookingInitiationResponse>(
      "/bookings",
      payload,
    );
    return data;
  } catch (e) {
    console.log({ error: e });
    if (isAxiosError(e)) {
      throw new Error(e.response?.data?.message ?? "Failed to create booking");
    }
    throw new Error("Something went wrong");
  }
}

export function useInitiateCustomerHotelBooking() {
  return useMutation({
    mutationFn: InitiateBooking,
    mutationKey: ["Hotel_Booking"],
  });
}
