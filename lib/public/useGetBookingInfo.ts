import { data } from "motion/react-client";
import { publicClient } from "../api";
import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { GuestBookingDetailsResponse } from "../types/booking_data";

async function getBokingInfo(
  paymentRef: string,
  phoneNumber: string,
): Promise<GuestBookingDetailsResponse> {
  try {
    const { data } = await publicClient.get<GuestBookingDetailsResponse>(
      `/bookings/${paymentRef}?phoneNumber=${phoneNumber}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      console.log({ er: e });
      throw new Error(e.response?.data.message ?? "Something wen wrong");
    }
    throw e;
  }
}

export function useGetGuestBookingDetails(
  bookingId: string,
  phoneNumber: string,
) {
  return useQuery({
    queryKey: [`booking_data_${bookingId}`],
    queryFn: () => getBokingInfo(bookingId, phoneNumber),
  });
}
