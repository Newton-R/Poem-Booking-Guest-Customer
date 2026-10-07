import { useQuery } from "@tanstack/react-query";
import { publicClient } from "../api";
import { RefundPolicyResponse } from "../types/refund";
import { isAxiosError } from "axios";

async function getRefundPolicy(): Promise<RefundPolicyResponse> {
  try {
    const { data } = await publicClient.get<RefundPolicyResponse>(
      "/platform-policies/public",
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        `Failed to fetch refund policy: ${error.response?.data?.message || error.message}`,
      );
    }
    throw new Error(`Failed to fetch refund policy}`);
  }
}

export function useGetRefundPolicy() {
  return useQuery({
    queryKey: ["refundPolicy"],
    queryFn: getRefundPolicy,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
