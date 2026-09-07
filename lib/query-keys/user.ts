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

export const apartmentKeys = {
  all: ["apartments"] as const,
  lists: () => [...apartmentKeys.all, "list"] as const,
  list: (filters: HotelFilters) => [...apartmentKeys.lists(), filters] as const,
  details: () => [...apartmentKeys.all, "detail"] as const,
  detail: (id: string) => [...apartmentKeys.details(), id] as const,
  reviews: (id: string) => [...apartmentKeys.detail(id), "reviews"] as const,
};
