import { isAxiosError } from "axios";
import { apiClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import { ReferralResponse } from "../types/referral";

async function getReferalCode(): Promise<ReferralResponse> {
  try {
    const { data } = await apiClient.get<ReferralResponse>("/referrals/me");
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.message ?? "Error getting referal code");
    }
    throw e;
  }
}

export function useGetReferalCode() {
  return useQuery({
    queryFn: getReferalCode,
    queryKey: ["referalCode"],
  });
}
