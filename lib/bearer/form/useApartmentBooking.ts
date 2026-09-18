import { apiClient } from "@/lib/api";
import {
  ApartmentBookingPayload,
  ApartmentBookingResponse,
  ApartmentCustomerBookingPayload,
} from "@/lib/types/apartmentbooking";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function initiateApartmentBooking(
  payload: ApartmentCustomerBookingPayload,
): Promise<ApartmentBookingResponse> {
  try {
    const { data } = await apiClient.post<ApartmentBookingResponse>(
      "/bookings",
      payload,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data?.message || "Something went wrong");
    }
    throw e;
  }
}

export function useInitiateCustomerApartmentBooking() {
  return useMutation({
    mutationFn: initiateApartmentBooking,
    mutationKey: ["initiate_apartment_booking"],
  });
}
