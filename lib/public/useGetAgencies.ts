import { data } from "motion/react-client";
import { useQuery } from "@tanstack/react-query";
import { publicClient } from "../api";
import { Message } from "./../../components/home/Message";
import { isAxiosError } from "axios";
import { transportKeys } from "../query-keys/user";
import {
  AgencyDetailResponse,
  AgencyGetResponse,
  BusDetailResponse,
  GetTripSeatsResponse,
} from "../types/agency";

async function getAgencies(): Promise<AgencyGetResponse> {
  try {
    const { data } = await publicClient.get<AgencyGetResponse>(
      "/transport/overview",
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.Message ?? "Something went wrong");
    }
    throw e;
  }
}

export function useGetAgencies() {
  return useQuery({
    queryKey: transportKeys.all,
    queryFn: getAgencies,
  });
}

async function agencyDetails(agencyId: string): Promise<AgencyDetailResponse> {
  try {
    const { data } = await publicClient.get<AgencyDetailResponse>(
      `/transport/agencies/${agencyId}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Something went wrong");
    }
    throw e;
  }
}

export function useGetAgencyDetails(agencyId: string) {
  return useQuery({
    queryFn: () => agencyDetails(agencyId),
    queryKey: transportKeys.detail(agencyId),
  });
}

async function getBusdetail(busId: string): Promise<BusDetailResponse> {
  try {
    const { data } = await publicClient.get<BusDetailResponse>(
      `/transport/buses/${busId}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    }
    throw e;
  }
}

export function useGetBusDetails(busId: string) {
  return useQuery({
    queryFn: () => getBusdetail(busId),
    queryKey: transportKeys.detail(busId),
  });
}

async function getTrip({
  originCity,
  destinationCity,
  travelDate,
  agencyId,
}: {
  originCity: string;
  destinationCity: string;
  travelDate: string;
  agencyId: string;
}) {
  try {
    const { data } = await publicClient.get(
      `/transport/trips/search?originCityId=${originCity}&destinationCityId=${destinationCity}&departureDate=${travelDate}$agencyId=${agencyId}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.messae);
    }
    throw e;
  }
}

export function useGetTrip({
  originCity,
  destinationCity,
  travelDate,
  agencyId,
}: {
  originCity: string;
  destinationCity: string;
  travelDate: string;
  agencyId: string;
}) {
  return useQuery({
    queryFn: () =>
      getTrip({ originCity, destinationCity, travelDate, agencyId }),
    queryKey: [`transport_trips_${agencyId}`],
  });
}

async function getBusSeats(id: string): Promise<GetTripSeatsResponse> {
  try {
    const { data } = await publicClient.get<GetTripSeatsResponse>(
      `transport/trips/${id}/seats`,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    }
    throw e;
  }
}

export function useGetBusSeats(id: string) {
  return useQuery({
    queryKey: ["bus_seat"],
    queryFn: () => getBusSeats(id),
  });
}
