import { number } from "motion";

export interface HotelImage {
  createdAt: string;
  hotelId: string;
  id: string;
  imageUrl: string;
  isPrimary: boolean;
}

export interface RoomsAvailabilityParams {
  adults: string;
  checkIn: string;
  checkOut: string;
  roomtype: string;
}

export interface HotelReviews {
  comment: string;
  created_at: string;
  customerName: string;
  id: string;
  rating: number;
}

export interface HotelPolicy {
  cancellationPolicy: string;
  checkInPolicy: string;
  childPolicy: string;
  createdAt: string;
  hotelId: string;
  id: string;
  petPolicy: string;
  updatedAt: string;
}

export interface RoomTypes {
  basePrice: string;
  createdAt: string;
  currency: string;
  description: string;
  hotelId: string;
  id: string;
  maxAdults: number;
  maxChildren: number;
  imageUrl: string;
  name: string;
  status: string;
  totalRooms: number;
  updatedAt: string;
}

export interface HotelAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface HotelDetail {
  address: string;
  avgRating: string;
  branchId: string;
  checkInTime: string;
  checkOutTime: string;
  cityId: string;
  createdAt: string;
  deletedAt: string;
  description: string;
  id: string;
  images: HotelImage[];
  amenities: HotelAmenity[];
  minPrice: number;
  latitude: number;
  reviews: HotelReviews[];
  longitude: number;
  name: string;
  policy: HotelPolicy;
  providerId: string;
  reviewCount: string;
  roomTypes: RoomTypes[];
  starRating: number;
  status: string;
  updatedAt: string;
}

export interface HotelDetailsResponse {
  data: HotelDetail;
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface Hotel {
  address: string;
  avgRating: number;
  branchId: string;
  checkInTime: string;
  checkOutTime: string;
  cityId: string;
  createdAt: string;
  deletedAt: string;
  description: string;
  id: string;
  images: HotelImage[];
  latitude: number;
  longitude: number;
  name: string;
  providerId: string;
  reviewCount: number;
  isFeatured: boolean;
  starRating: number;
  minPrice: number;
  status: string;
  updatedAt: string;
}

export interface HotelsResponse {
  data: { data: Hotel[]; total: number; page: number; limit: number };
  statusCode: 200;
  success: boolean;
  timestamp: string;
}

export interface HotelRoomDetail {
  areaSqm: string;
  basePrice: string;
  bedType: string;
  createdAt: string;
  currency: string;
  description: string;
  hotelId: string;
  id: string;
  imageUrl: string;
  images: HotelImage[];
  lengthM: string;
  maxAdults: number;
  maxChildren: string;
  name: string;
  status: string;
  totalRooms: number;
  updatedAt: string;
  widthM: string;
}

export interface RoomDetailsResponse {
  data: HotelRoomDetail;
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface RoomAvailable {
  availableRooms: number;
  basePrice: number;
  name: string;
  priceForStay: number;
  roomTypeId: string;
}

export interface RoomAvailabilityResponse {
  data: RoomAvailable[];
  statusCode: number;
  success: string;
  timestamp: string;
}
