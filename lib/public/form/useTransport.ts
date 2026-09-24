import { data } from "motion/react-client";
import { publicClient } from "@/lib/api";
import {
  TransportBookingResponse,
  TransportGuestPayLoad,
  TransportInfoGuestResponse,
  TransportPaymentInitiationPayload,
} from "@/lib/types/agency";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function getDataSubmit(
  payload: TransportGuestPayLoad,
): Promise<TransportInfoGuestResponse> {
  try {
    const { data } = await publicClient.post<TransportInfoGuestResponse>(
      "/bookings/guest-customers",
      payload,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    }
    throw e;
  }
}

export function useGetGuestTransportDetails() {
  return useMutation({
    mutationFn: getDataSubmit,
    mutationKey: ["transport_guest_data"],
  });
}

async function initiateTransportPayment(
  payload: TransportPaymentInitiationPayload,
) {
  try {
    const { data } = await publicClient.post<TransportBookingResponse>(
      "/bookings",
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

export function useTransportPaymentInitiate() {
  return useMutation({
    mutationKey: ["transport_payment"],
    mutationFn: initiateTransportPayment,
  });
}
