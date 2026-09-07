import { data } from "motion/react-client";
import { isAxiosError } from "axios";
import { publicClient } from "../api";
import { ErrorType } from "../defined_types";
import { useQuery } from "@tanstack/react-query";
import { apartmentKeys } from "../query-keys/user";
import { ApartmentDetailResponse, ApartmentResponse } from "../types/apartment";

async function getApartments(): Promise<ApartmentResponse> {
  try {
    const { data } = await publicClient.get<ApartmentResponse>("/apartments");
    return data;
  } catch (e) {
    if (isAxiosError<ErrorType>(e)) {
      throw new Error(e.message);
    }
    throw new Error("Something went wrong");
  }
}

export function useGetApartments() {
  return useQuery({
    queryFn: getApartments,
    queryKey: apartmentKeys.all,
  });
}

async function getApartmentDetails(
  id: string,
): Promise<ApartmentDetailResponse> {
  try {
    const { data } = await publicClient.get<ApartmentDetailResponse>(
      `/apartments/${id}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError<ErrorType>(e)) {
      throw new Error(e.message);
    }
    throw new Error("Something went wrong");
  }
}

export function useGetApartmentDetails(id: string) {
  return useQuery({
    queryFn: () => getApartmentDetails(id),
    queryKey: apartmentKeys.detail(id),
  });
}
