import { buses } from "./../data";
import { BusAmenity } from "../types";
import { number } from "motion";

export interface AgencyRouteTrip {
  arrivalTime: string;
  basePrice: string;
  bus: AgencyBus;
  busId: string;
  createdAt: string;
  currency: string;
  departureTime: string;
  id: string;
  routeId: string;
  status: string;
  updatedAt: string;
}

export interface GetTripSeatsResponse {
  data: {
    seats: {
      columnNumber: number;
      id: string;
      price: string;
      rowNumber: 1;
      seatNumber: string;
      seatType: string;
      status: string;
    }[];
  };
}

export interface AgencyBus {
  agencyId: string;
  amenities: string[];
  busType: "vip" | "classic";
  createdAt: string;
  id: string;
  imageUrl: string;
  plateNumber: string;
  seatCapacity: number;
  seats: {
    busId: string;
    columnNumber: number;
    createdAt: string;
    id: string;
    rowNumber: number;
    seatNumber: string;
    seatType: string;
  }[];
  status: string;
  updatedAt: string;
}

export interface AgencyRoute {
  agencyId: string;
  createdAt: string;
  destinationCityId: string;
  distanceKm: string;
  estimatedDurationMinutes: string;
  id: string;
  imageUrl: string;
  originCityId: string;
  status: string;
  trips: AgencyRouteTrip[];
}

export interface Agency {
  basePrice: string;
  id: string;
  imageUrl: string;
  name: string;
  buses: AgencyBus[];
  createdAt: string;
  providerId: "da17562e-143c-44cf-a177-7b147e28887d";
  routes: AgencyRoute[];
  status: string;
}

export interface AgencyRegion {
  region: string;
  city: string;
}

export interface AgencyGetResponse {
  data: Agency[];
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface Bus {
  amenities: string[];
  arrivalTime: string;
  busId: string;
  busType: "vip" | "classic";
  departureTime: string;
  destination: string;
  id: string;
  image: string;
  origin: string;
  ticketPrice: number;
}

export interface AgencyTrip {
  branch: AgencyRegion;
  buses: Bus[];
}

export interface AgencyDetail {
  availableRegions: AgencyRegion[];
  basePrice: number;
  id: string;
  imageUrl: string;
  name: string;
  status: string;
  trips: {
    branch: AgencyRegion;
    buses: Bus[];
  }[];
}

export interface AgencyDetailResponse {
  data: AgencyDetail;
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface BusSeat {
  columnNumber: number;
  id: string;
  rowNumber: number;
  seatNumber: string;
  seatType: string;
}

export interface BusDetailData {
  agencyId: string;
  agencyName: string;
  amenities: BusAmenity[];
  arrivalTime: string;
  busType: "classic" | "vip";
  departureTime: string;
  destination: string;
  id: string;
  imageUrl: string;
  origin: string;
  plateNumber: string;
  seatCapacity: number;
  seats: BusSeat[];
  status: string;
  ticketPrice: string;
}

export interface BusDetailResponse {
  data: BusDetailData;
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface TransportGuestPayLoad {
  email: string;
  fullName: string;
  idDocumentNumber: string;
  idDocumentType: string;
  phoneNumber: string;
}

export interface TransportInfoGuestResponse {
  data: {
    createdAt: string;
    email: string;
    fullName: string;
    id: string;
    idDocumentNumber: string;
    idDocumentType: string;
    phoneNumber: string;
  };
}

export interface TransportPaymentInitiationPayload {
  bookingType: "transport";
  guestCustomerId: string;
  items: [
    {
      itemType: "bus_ticket";
      itemId: string;
      startDatetime: Date;
      quantity: number;
      guests: {
        fullName: string;
        phoneNumber: string;
        seatNumber: string;
      }[];
    },
  ];
}

export interface TransportCustomerPaymentInitiationPayload {
  bookingType: "transport";
  items: [
    {
      itemType: "bus_ticket";
      itemId: string;
      startDatetime: Date;
      quantity: number;
      guests?: {
        fullName: string;
        phoneNumber: string;
        seatNumber: string;
      }[];
    },
  ];
}

export interface TransportBookingResponseItem {
  bookingId: string;
  createdAt: string;
  endDatetime: string;
  guests: string[];
  id: string;
  itemId: string;
  itemType: string;
  providerId: string;
  quantity: string;
  roomAssignments: string[];
  startDatetime: string;
  status: string;
  totalPrice: string;
  unitPrice: string;
}

export interface TransportBookingResponseLock {
  bookingId: string;
  createdAt: string;
  expiresAt: string;
  id: string;
  lockType: string;
  lockedEntityId: string;
  quantity: number;
  status: string;
}

export interface TransportBookingResponseData {
  bookingReference: string;
  bookingStatus: string;
  bookingType: "apartment";
  cancellationFee: string;
  checkedInAt: string;
  checkedInBy: string;
  checkinOtp: string;
  checkinOtpAttempts: string;
  createdAt: string;
  currency: string;
  customerId: string;
  deletedAt: string;
  discountAmount: string;
  escrowAmount: string;
  finalAmount: string;
  guestCustomerId: string;
  id: string;
  items: TransportBookingResponseItem[];
  locks: TransportBookingResponseLock[];
  qrToken: string;
  totalAmount: string;
  updatedAt: string;
}

export interface TransportBookingResponse {
  data: TransportBookingResponseData;
  statusCode: number;
  success: boolean;
  timestamp: string;
}
