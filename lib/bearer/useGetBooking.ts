import { isAxiosError } from "axios";
import { apiClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import {
  GuestBookingDetailsResponse,
  GuestBookingDetailsResponseData,
} from "../types/booking_data";

interface BookingsFetchResponse {
  data: GuestBookingDetailsResponseData[];
  statusCode: number;
  success: boolean;
  timestamp: string;
}

async function getBookings(): Promise<BookingsFetchResponse> {
  try {
    const { data } = await apiClient.get<BookingsFetchResponse>("/bookings");
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Error gettin bookings");
    }
    throw e;
  }
}

export function useGetCustomerBookings() {
  return useQuery({
    queryFn: getBookings,
    queryKey: ["customer_bookings"],
  });
}

async function BookingDetails(
  id: string,
): Promise<GuestBookingDetailsResponse> {
  try {
    const { data } = await apiClient.get<GuestBookingDetailsResponse>(
      `/bookings/${id}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Somehting went wrong");
    }
    throw e;
  }
}

export function useGetCustomerBookingDetails(id: string) {
  return useQuery({
    queryKey: [`booking_detail_${id}`],
    queryFn: () => BookingDetails(id),
  });
}
