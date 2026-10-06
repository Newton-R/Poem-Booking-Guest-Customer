import { publicClient } from "@/lib/api";
import {
  GeneralReviewGuestPayload,
  ReviewGuestResponse,
} from "@/lib/types/reviews";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

async function submitReview(
  payload: GeneralReviewGuestPayload,
): Promise<ReviewGuestResponse> {
  try {
    const { data } = await publicClient.post<ReviewGuestResponse>(
      "/reviews/public",
      payload,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to submit review",
      );
    }
    throw new Error("Failed to submit review");
  }
}

export function useSubmitReview() {
  return useMutation({
    mutationFn: submitReview,
    mutationKey: ["submitReview"],
  });
}
