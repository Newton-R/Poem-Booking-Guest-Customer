import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api";
import { UserResponseData } from "../types/user";
import { isAxiosError } from "axios";
import { authKeys } from "../query-keys/user";
import { useTokens } from "../useTokens";

async function fetchCurrentUser(): Promise<UserResponseData> {
  try {
    const { data } = await apiClient.get<UserResponseData>("/auth/me");
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(
        e.response?.data.message ?? "Error fetching profile data",
      );
    }
    throw e;
  }
}

export function useGetUserData() {
  const tokens = useTokens((state) => state.tokens);

  return useQuery({
    queryFn: fetchCurrentUser,
    queryKey: authKeys.currentUser(),
    enabled: Boolean(tokens?.accessToken),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
