import { apiClient } from "@/lib/api";
import { ProfileFormValues } from "@/lib/types/user";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function updateProfile(payload: ProfileFormValues): Promise<void> {
  try {
    const { data } = await apiClient.put("auth/me", payload);
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(
        e.response?.data?.message ||
          "An error occurred while updating the profile.",
      );
    }
    throw e;
  }
}

export function useProfileUpdate() {
  return useMutation({
    mutationFn: updateProfile,
    mutationKey: ["updateProfile"],
  });
}
