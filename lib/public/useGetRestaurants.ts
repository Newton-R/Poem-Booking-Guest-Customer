import { data } from "motion/react-client";
import { isAxiosError } from "axios";
import { publicClient } from "../api";
import { useQuery } from "@tanstack/react-query";
import { restaurantKeys } from "../query-keys/user";
import {
  DeliveryQuoteResponse,
  RestaurantDetailsResponse,
  RestaurantsResponse,
} from "../types/restaurant";

// categorise

async function getRestaurantCategories() {
  try {
    const { data } = await publicClient.get("/restaurants/categories");
    return data;
  } catch (e) {
    throw e;
  }
}

export function useGetRestaurantCategories() {
  return useQuery({
    queryFn: getRestaurantCategories,
    queryKey: ["restaurant_categories"],
  });
}

// check delivery possibility

async function checkDeliverability(
  restaurantId: string,
  latitude: string,
  longitude: string,
): Promise<DeliveryQuoteResponse> {
  try {
    const { data } = await publicClient.get<DeliveryQuoteResponse>(
      `/restaurants/${restaurantId}/delivery-quote?latitude=${latitude}&longitude=${longitude}`,
    );
    return data;
  } catch (e) {
    throw e;
  }
}

export function useCheckDeliveryData(
  restaurantId: string,
  latitude: string,
  longitude: string,
) {
  return useQuery({
    queryKey: ["delivery_data", restaurantId, latitude, longitude],
    queryFn: () => checkDeliverability(restaurantId, latitude, longitude),
    enabled: Boolean(restaurantId && latitude && longitude),
  });
}

// search by dish
async function searchByDish(dish: string) {
  try {
    const { data } = await publicClient.get(`/restaurants/dishes?q=${dish}`);
    return data;
  } catch (e) {
    throw e;
  }
}

export function useSearchByDish(dish: string) {
  return useQuery({
    queryFn: () => searchByDish(dish),
    queryKey: [`${dish}_search`],
  });
}

// Get restaurants

async function getRestaurants(): Promise<RestaurantsResponse> {
  try {
    const { data } =
      await publicClient.get<RestaurantsResponse>("/restaurants");
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Something went wrong");
    }
    throw e;
  }
}

export function useGetAllRestaurants() {
  return useQuery({
    queryFn: getRestaurants,
    queryKey: restaurantKeys.all,
  });
}

async function getRestaurantDetails(
  restaurantId: string,
): Promise<RestaurantDetailsResponse> {
  try {
    const { data } = await publicClient.get<RestaurantDetailsResponse>(
      `/restaurants/${restaurantId}`,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message ?? "Something went wrong");
    }
    throw e;
  }
}

export function useGetRestaurantDetails(restaurantId: string) {
  return useQuery({
    queryKey: restaurantKeys.detail(restaurantId),
    queryFn: () => getRestaurantDetails(restaurantId),
  });
}
