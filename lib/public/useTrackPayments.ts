// hooks/useTrackPayment.ts
import { PaymentStatus, PaymentStatusData } from "../types/payments";
import { usePaymentEvents } from "./usePaymentEvents";
import { usePaymentStatus } from "./usePaymentStatus";


const FINAL_STATUSES: PaymentStatus[] = ["successful", "failed", "reversed"];
const isFinal = (s?: PaymentStatus) => !!s && FINAL_STATUSES.includes(s);


export function useTrackPayment(ref: string) {
  const { data: sseData, connectionError } = usePaymentEvents(ref);

  // only poll if SSE isn't connected/working — avoids double-fetching normally
  const {
    data: pollData,
    isLoading,
    refetch,
  } = usePaymentStatus(ref, {
    enabled: connectionError,
  });

  const polled: PaymentStatusData | null = pollData?.data ?? null;

  // a final status from either source wins, otherwise use whatever we have
  const status: PaymentStatusData | null =
    (isFinal(sseData?.paymentStatus) ? sseData : null) ??
    (isFinal(polled?.paymentStatus) ? polled : null) ??
    sseData ??
    polled;
  return { status, isLoading: !status && isLoading, refetch };
}
