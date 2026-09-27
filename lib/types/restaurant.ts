export interface Restaurant {
  acceptingOrders: string;
  address: string;
  city: string;
  coverUrl: string;
  createdAt: string;
  deliveryRadiusKm: number;
  description: string;
  email: string;
  id: string;
  isOpen: boolean;
  latitude: string;
  logoUrl: string;
  longitude: string;
  name: string;
  nextOpeningAt: string;
  openNow: boolean;
  phone: string;
  scheduleUnrestricted: boolean;
  status: "active";
  todayHours: { openTime: string; closeTime: string; isClosed: boolean };
  unavailableReason: "outside_hours";
}

export interface RestaurantsResponse {
  data: Restaurant[];
}

export interface RestaurantMenuItem {
  categoryId: string;
  description: string;
  id: string;
  imageUrl: string;
  isFeatured: boolean;
  name: string;
  prepMinutes: number;
  priceXaf: number;
  version: number;
}

export interface RestaurantMenu {
  availableItemCount: number;
  displayOrder: string;
  id: string;
  items: RestaurantMenuItem[];
  name: string;
}

export type RestaurantDetails = Restaurant & {
  menu: RestaurantMenu[];
  todayHours: {
    closeTime: string;
    isClosed: boolean;
    openTime: string;
  };
  categories: {
    availableItemCount: number;
    displayOrder: number;
    id: string;
    name: string;
  }[];
};

export interface RestaurantDetailsResponse {
  data: RestaurantDetails;
}

export interface RestaurantGuestOrderPayload {
  restaurantId: string;
  fulfillmentType: "delivery";
  items: [{ menuItemId: string; quantity: number }];
  deliveryAddress: {
    label: string;
    addressLine: string;
    city: string;
    latitude: number;
    longitude: number;
    instructions: string;
  };
  guest: { name: string; phone: string };
  specialInstructions: string;
}

export interface RestaurantCustomerOrderPayload {
  restaurantId: string;
  fulfillmentType: "delivery";
  items: [{ menuItemId: string; quantity: number }];
  deliveryAddress: {
    label: string;
    addressLine: string;
    city: string;
    latitude: number;
    longitude: number;
    instructions: string;
  };
  specialInstructions: string;
}
