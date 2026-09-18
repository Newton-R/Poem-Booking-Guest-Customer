import { apiClient } from "@/lib/api";
import {
  HotelPaymentInitiationResponse,
  HotelPaymentIntiationPayload,
} from "@/lib/types/payments";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function initiateHotelBookingPayment(
  payload: HotelPaymentIntiationPayload,
): Promise<HotelPaymentInitiationResponse> {
  try {
    const { data } = await apiClient.post<HotelPaymentInitiationResponse>(
      "/payments/initiate",
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

export function useInitiateCustomerBookingPayment() {
  return useMutation({
    mutationFn: initiateHotelBookingPayment,
    mutationKey: ["hotel_payment"],
  });
}
