import { isAxiosError } from "axios";
import { publicClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import { PaymentStatusResponse } from "../types/payments";

async function getLivePaymentStatus(paymentId: string) {
  try {
    const { data } = await publicClient.get(
      `/payments/public/events/${paymentId}`,
    );
    return data;
  } catch (e) {
    console.log({ error: e });
    if (isAxiosError(e)) {
      throw new Error(
        e.response?.data.message ?? "Error getting live payment status",
      );
    }
    throw new Error("Something went wrong");
  }
}

export function useGetLivePaymentStatus(paymentId: string) {
  return useQuery({
    queryKey: ["payment_status"],
    queryFn: () => getLivePaymentStatus(paymentId),
  });
}

async function fetchPaymentStatus(ref: string): Promise<PaymentStatusResponse> {
  const { data } = await publicClient.get<PaymentStatusResponse>(
    `/payments/public/status/${ref}`,
  );
  return data;
}

export function usePaymentStatus(ref: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["payments", "status", ref],
    queryFn: () => fetchPaymentStatus(ref),
    enabled: !!ref && (options?.enabled ?? true),
    // keep polling every 3s ONLY while status is still pending/initiated
    refetchInterval: (query) => {
      const status = query.state.data?.data.paymentStatus;
      const isFinal =
        status === "successful" || status === "failed" || status === "reversed";
      return isFinal ? false : 3000;
    },
  });
}
