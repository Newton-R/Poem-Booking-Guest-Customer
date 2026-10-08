import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api";
import { RewardResponse } from "../types/referral";

async function getRewards({
  page = 1,
}: {
  pageSize?: number;
  page?: number;
}): Promise<RewardResponse> {
  const url = page
    ? `/rewards/me?pageSize=20&page=${page}`
    : `/rewards/me?pageSize=20`;
  try {
    const { data } = await apiClient.get<RewardResponse>(url);
    return data;
  } catch (e) {
    throw e;
  }
}

export function useGetRewards({ page = 1 }: { page?: number }) {
  return useQuery({
    queryKey: ["projects", page],
    queryFn: () => getRewards({ page: page }),
    placeholderData: keepPreviousData,
  });
}
