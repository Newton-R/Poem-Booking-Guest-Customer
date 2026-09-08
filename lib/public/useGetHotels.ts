import { data } from "motion/react-client";
import { isAxiosError } from "axios";
import { ErrorType } from "../defined_types";
import { apiClient, publicClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import { hotelKeys, roomKey } from "../query-keys/user";
import {
  HotelDetailsResponse,
  HotelsResponse,
  RoomsAvailabilityParams,
} from "../types/hotels";

async function fetchHotels(): Promise<HotelsResponse> {
  try {
    const { data } = await publicClient.get<HotelsResponse>("/hotels");
    return data;
  } catch (e) {
    if (isAxiosError<ErrorType>(e)) {
      throw new Error(e.message ?? "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

async function fetchHotelDetails(id: string): Promise<HotelDetailsResponse> {
  try {
    const { data } = await publicClient.get(`/hotels/${id}`);

    return data;
  } catch (e) {
    if (isAxiosError<ErrorType>(e)) {
      throw new Error(e.message ?? "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export function useGetHotelsDetail(id: string) {
  return useQuery({
    queryFn: () => fetchHotelDetails(id),
    queryKey: hotelKeys.detail(id),
    enabled: !!id,
  });
}

export function useGetHotels() {
  return useQuery({
    queryFn: fetchHotels,
    queryKey: ["hotels"],
  });
}

export async function getHotelsAvailability(
  id: string,
  config: RoomsAvailabilityParams,
) {
  try {
    const { data } = await apiClient.get(
      `/hotels/${id}/availability?checkIn=${config.checkIn}&checkOut=${config.checkOut}&adults=${config.adults}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError<ErrorType>(e)) {
      console.log({ error: e });
      throw new Error(e.message);
    }
    throw new Error("Something went wrong");
  }
}

export function useGetHotelsAvailability(
  id: string,
  config: RoomsAvailabilityParams,
) {
  return useQuery({
    queryKey: hotelKeys.details(),
    queryFn: () => getHotelsAvailability(id, config),
  });
}

async function getRoomDetails(hotelid: string, roomId: string) {
  try {
    const { data } = await publicClient.get(
      `/hotels/${hotelid}/room-types/${roomId}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError<ErrorType>(e)) {
      throw new Error(e.message);
    }
    throw new Error("Something went wrong");
  }
}

export function useGetRoomDetails(hotelId: string, roomId: string) {
  return useQuery({
    queryFn: () => getRoomDetails(hotelId, roomId),
    queryKey: roomKey.detail(roomId),
  });
}
