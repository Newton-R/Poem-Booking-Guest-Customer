export type HotelAmenity = {
  id: string;
  name: string;
  description: string;
};

export type HotelReview = {
  id: string;
  guestName: string;
  guestInitials: string;
  stayDate: string;
  rating: number;
  message: string;
};

export type RoomCategory =
  | "Standard"
  | "Deluxe"
  | "Suite"
  | "Family"
  | "Villa"
  | "Studio"
  | "Cabin"
  | "Penthouse"
  | "Twin";

export type RoomType = {
  id: string;
  name: string;
  type?: RoomCategory;
  description: string;
  bed: string;
  view: string;
  capacity: number;
  size: number;
  price: number;
  formattedPrice?: string;
  currency: "XAF";
  image: string;
  images?: string[];
  availability: {
    checkIn: string;
    checkOut: string;
  }[];
  amenities: string[];
  featured?: boolean;
  premium?: boolean;
  popular?: boolean;
};

export type Hotel = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  collectionIds: string[];
  city: string;
  region: string;
  address: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  startingPrice: number;
  formattedStartingPrice?: string;
  currency: "XAF";
  amenities: HotelAmenity[];
  rooms: RoomType[];
  checkIn: string;
  checkOut: string;
  policies: string[];
  reviews?: HotelReview[];
  featured?: boolean;
};

export type HotelCollection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  hotelIds: string[];
};

export type BusAmenity =
  | "WiFi"
  | "Charging ports"
  | "Air conditioning"
  | "Refreshments"
  | "Extra legroom";

export type BusOperator = {
  id: string;
  name: string;
  description: string;
  logo: string;
  rating: number;
  amenities: BusAmenity[];
  classes: string[];
  featured?: boolean;
};

export type BusDeparture = {
  id: string;
  operatorId: string;
  originStation?: string;
  destinationStation?: string;
  departureTime: string;
  arrivalTime: string;
  departureDate?: string;
  duration: TravelDuration;
  class: "VIP" | "Classic";
  price: number;
  availableSeats: number;
  amenities: BusAmenity[];
  formattedPrice?: string;
};

export type BusRegion =
  | "Littoral"
  | "Central"
  | "North West"
  | "South West"
  | "North East"
  | "South East";

export type TravelDuration = {
  hours: number;
  minutes: number;
};

export type BusRoute = {
  id: string;
  slug: string;
  origin: string;
  destination: string;
  region: BusRegion;
  originStation: string;
  destinationStation: string;
  duration: TravelDuration;
  formattedDuration?: string;
  distanceKm: number;
  frequency: string;
  image: string;
  departures: BusDeparture[];
  startingPrice?: number;
  formattedStartingPrice?: string;
  featured?: boolean;
};

export type Dish = {
  id: string;
  restaurantId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: "XAF";
  image: string;
  ingredients: string[];
  dietaryTags: string[];
  spicyLevel: "None" | "Mild" | "Medium" | "Hot";
  available: boolean;
  addOns: { name: string; price: number }[];
  formattedPrice?: string;
};

export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  description: string;
  tagline: string;
  category: string;
  categories: string[];
  city: string;
  region: string;
  address: string;
  rating: number;
  reviewCount: number;
  image: string;
  isOpen: boolean;
  deliveryMinutes: string;
  deliveryFee: number;
  formattedDeliveryFee?: string;
  priceRange: "XAF" | "XAF XAF" | "XAF XAF XAF" | "XAF XAF XAF XAF";
  openingHours: { days: string; hours: string }[];
  phone: string;
  email: string;
  dishes: Dish[];
  featured?: boolean;
};
