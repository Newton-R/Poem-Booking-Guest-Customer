// hooks/useTrackPayment.ts
import { usePaymentEvents } from "./usePaymentEvents";
import { usePaymentStatus } from "./usePaymentStatus";

export function useTrackPayment(ref: string) {
  const { data: sseData, connectionError } = usePaymentEvents(ref);

  // only poll if SSE isn't connected/working — avoids double-fetching normally
  const { data: pollData, isLoading } = usePaymentStatus(ref, {
    enabled: connectionError,
  });

  const status = sseData ?? pollData?.data ?? null;

  return { status, isLoading: !status && isLoading };
}
