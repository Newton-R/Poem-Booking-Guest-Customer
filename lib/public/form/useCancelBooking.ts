import { number } from "motion";
import { publicClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { BookingCancellationResponse } from "@/lib/types/payments";

export interface CancelProps {
  ref: string;
  number: string;
}

async function cancelBooking({
  ref,
  number,
}: CancelProps): Promise<BookingCancellationResponse> {
  try {
    const { data } = await publicClient.post<BookingCancellationResponse>(
      `/bookings/${ref}/cancel`,
      {
        phoneNumber: number,
      },
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Something went wrong");
    }
    throw e;
  }
}

export function useCancelBooking() {
  return useMutation({
    mutationKey: ["Cancel_booking"],
    mutationFn: cancelBooking,
  });
}
