import { number } from "motion";
import { publicClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

interface CancelProps {
  ref: string;
  number: string;
}

async function cancelBooking({ ref, number }: CancelProps): Promise<any> {
  try {
    const { data } = await publicClient.post(`/bookings/${ref}/cancel`, {
      phoneNumber: number,
    });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Something went wrong");
    }
    throw e;
  }
}

export function useCancelBooking(ref: string, number: string) {
  return useMutation({
    mutationKey: ["Cancel_booking"],
    mutationFn: cancelBooking,
  });
}
