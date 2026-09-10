import { data } from "motion/react-client";
import { isAxiosError } from "axios";
import { publicClient } from "../api";
import { ErrorType } from "../defined_types";
import { useQuery } from "@tanstack/react-query";
import { transportKeys } from "../query-keys/user";
import { TransportRouteResponse } from "../types/transport";

async function getTransportRoutes(): Promise<TransportRouteResponse> {
  try {
    const { data } =
      await publicClient.get<TransportRouteResponse>("/transport/routes");
    return data;
  } catch (e) {
    if (isAxiosError<ErrorType>(e)) {
      throw new Error("Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export function useGetTransportRoutes() {
  return useQuery({
    queryFn: getTransportRoutes,
    queryKey: transportKeys.all,
  });
}

async function getRouteDetail(routeId: string) {
  try {
    const { data } = await publicClient.get(`/transport/routes/${routeId}`);
    console.log({ transport_data: data });
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    }
    throw new Error("Something went wrong");
  }
}

export function useGetRouteDetail(routeId: string) {
  return useQuery({
    queryFn: () => getRouteDetail(routeId),
    queryKey: transportKeys.detail(routeId),
  });
}
