// hooks/usePaymentEvents.ts
import { useEffect, useRef, useState } from "react";
import { PaymentStatusData } from "../types/payments";

export function usePaymentEvents(ref: string) {
  const [data, setData] = useState<PaymentStatusData | null>(null);
  const [connectionError, setConnectionError] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!ref) return;

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/public/events/${ref}`;
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener("status", (event: MessageEvent) => {
      try {
        const parsed: PaymentStatusData = JSON.parse(event.data);
        setData(parsed);

        const isFinal = ["successful", "failed", "reversed"].includes(
          parsed.paymentStatus,
        );
        if (isFinal) {
          eventSource.close();
        }
      } catch {
        setConnectionError(true);
      }
    });

    eventSource.onerror = () => {
      setConnectionError(true);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [ref]);

  return { data, connectionError };
}
