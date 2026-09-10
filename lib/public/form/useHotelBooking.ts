import { data } from "motion/react-client";
import { publicClient } from "@/lib/api";
import { ErrorType } from "@/lib/defined_types";
import {
  BookingInitiatePayload,
  BookingInitiationResponse,
  GuestBookingInfoResponse,
  GuestHotelFormBookingData,
} from "@/lib/types/booking";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { HotelPaymentIntiationPayload } from "@/lib/types/payments";

async function submitGuestInfo(
  payload: GuestHotelFormBookingData,
): Promise<GuestBookingInfoResponse> {
  try {
    const { data } = await publicClient.post<GuestBookingInfoResponse>(
      "/bookings/guest-customers",
      payload,
    );
    return data;
  } catch (e) {
    console.log({ error: e });
    if (isAxiosError<ErrorType>(e)) {
      throw new Error(e.message);
    }
    throw new Error("Something went wrong");
  }
}

export function useGuestBookingInfo() {
  return useMutation({
    mutationFn: submitGuestInfo,
    mutationKey: ["guest_data"],
  });
}

async function InitiateBooking(
  payload: BookingInitiatePayload,
): Promise<BookingInitiationResponse> {
  try {
    const { data } = await publicClient.post<BookingInitiationResponse>(
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

export function useInitiateHotelBooking() {
  return useMutation({
    mutationFn: InitiateBooking,
    mutationKey: ["Hotel_Booking"],
  });
}

async function initiateHotelBookingPayment(
  payload: HotelPaymentIntiationPayload,
) {
  try {
    const { data } = await publicClient.post("/payments/initiate", payload);
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    }
    throw e;
  }
}

export function useInitiateHotelPayment() {
  return useMutation({
    mutationFn: initiateHotelBookingPayment,
    mutationKey: ["hotel_payment"],
  });
}
