import { isAxiosError } from "axios";
import { publicClient } from "../api";
import { ErrorType } from "../defined_types";
import { useQuery } from "@tanstack/react-query";
import { transportKeys } from "../query-keys/user";

async function getTransportTrips() {
  try {
    const { data } = await publicClient.get("/transport/trips/search");
    return data;
  } catch (e) {
    if (isAxiosError<ErrorType>(e)) {
      throw new Error("Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export function useGetTransport() {
  return useQuery({
    queryFn: getTransportTrips,
    queryKey: transportKeys.all,
  });
}
