import { HotelFilters } from "@/components/hotels/all/Hero";

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "currentUser"] as const,
};

export const cityKeys = {
  all: ["cities"] as const,
  currentCity: () => [...cityKeys.all, "city"] as const,
};

export const hotelKeys = {
  all: ["hotels"] as const,
  lists: () => [...hotelKeys.all, "list"] as const,
  list: (filters: HotelFilters) => [...hotelKeys.lists(), filters] as const,
  details: () => [...hotelKeys.all, "detail"] as const,
  detail: (id: string) => [...hotelKeys.details(), id] as const,
  reviews: (id: string) => [...hotelKeys.detail(id), "reviews"] as const,
};

export const roomKey = {
  all: ["hotels"] as const,
  details: () => [...roomKey.all, "detail"] as const,
  detail: (id: string) => [...roomKey.details(), id] as const,
};

export const apartmentKeys = {
  all: ["apartments"] as const,
  lists: () => [...apartmentKeys.all, "list"] as const,
  list: (filters: HotelFilters) => [...apartmentKeys.lists(), filters] as const,
  details: () => [...apartmentKeys.all, "detail"] as const,
  detail: (id: string) => [...apartmentKeys.details(), id] as const,
  reviews: (id: string) => [...apartmentKeys.detail(id), "reviews"] as const,
};

export const transportKeys = {
  all: ["transport"] as const,
  lists: () => [...transportKeys.all, "list"] as const,
  list: (filters: HotelFilters) => [...transportKeys.lists(), filters] as const,
  details: () => [...transportKeys.all, "detail"] as const,
  detail: (id: string) => [...transportKeys.details(), id] as const,
  reviews: (id: string) => [...transportKeys.detail(id), "reviews"] as const,
};
