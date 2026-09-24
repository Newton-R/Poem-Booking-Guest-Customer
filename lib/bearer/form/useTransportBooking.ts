import { apiClient, publicClient } from "@/lib/api";
import {
  TransportBookingResponse,
  TransportCustomerPaymentInitiationPayload,
} from "@/lib/types/agency";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function initiateTransportPayment(
  payload: TransportCustomerPaymentInitiationPayload,
) {
  try {
    const { data } = await apiClient.post<TransportBookingResponse>(
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

export function useCustomerTransportPayment() {
  return useMutation({
    mutationFn: initiateTransportPayment,
    mutationKey: ["customer_transport"],
  });
}
