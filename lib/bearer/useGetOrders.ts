import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api";

async function getOrderTrackData(orderRef: string) {
  try {
    const { data } = await apiClient.get(`/orders/${orderRef}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export function useGetOrder(orderRef: string) {
  return useQuery({
    queryKey: ["order_details", `order_${orderRef}`],
    queryFn: () => getOrderTrackData(orderRef),
  });
}
