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
  rating: number;
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

export interface RestaurantReview {
  authorName: string;
  comment: string;
  createdAt: string;
  id: string;
  orderNumber: string;
  providerRespondedAt: string;
  providerResponse: string;
  rating: number;
  reviewStatus: string;
}

export interface RestaurantWeeklySchedule {
  closeTime: string;
  day: string;
  dayOfWeek: string;
  isClosed: boolean;
  openTime: string;
  overnight: boolean;
}

export type RestaurantDetails = Restaurant & {
  menu: RestaurantMenu[];
  reviewCount: number;
  weeklyHours: RestaurantWeeklySchedule[];
  ratingStats: {
    distribution: {
      stars: number;
      count: number;
    }[];
  };
  reviewsPreview: RestaurantReview[];
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

export interface DeliveryQuote {
  restaurantId: string;
  acceptingOrders: boolean;
  unavailableReason: string;
  nextOpeningAt: string;
  deliveryRadiusKm: number;
  restaurantLatitude: number;
  restaurantLongitude: number;
  distanceKm: number;
  radiusVerified: boolean;
  withinDeliveryRadius: boolean;
  deliveryFeeXaf: number;
  estimatedDriveMinutes: number;
  deliverable: boolean;
}

export interface DeliveryQuoteResponse {
  success: true;
  statusCode: 200;
  data: DeliveryQuote;
  timestamp: "2026-09-26T15:02:29.924Z";
}
