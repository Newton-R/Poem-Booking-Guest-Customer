import { apiClient, publicClient } from "@/lib/api";
import {
  ApartmentBookingGuestInfoResponse,
  ApartmentBookingPayload,
  ApartmentBookingResponse,
  ApartmentGuestPayload,
} from "@/lib/types/apartmentbooking";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function guestApatmentInfo(
  payload: ApartmentGuestPayload,
): Promise<ApartmentBookingGuestInfoResponse> {
  try {
    const { data } = await publicClient.post<ApartmentBookingGuestInfoResponse>(
      "/bookings/guest-customers",
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

export function useGuestApartmentInfo() {
  return useMutation({
    mutationFn: guestApatmentInfo,
    mutationKey: ["guest_apartment_data"],
  });
}

async function initiateApartmentBooking(
  payload: ApartmentBookingPayload,
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

export function useInitiateApartmentBooking() {
  return useMutation({
    mutationFn: initiateApartmentBooking,
    mutationKey: ["initiate_apartment_booking"],
  });
}
