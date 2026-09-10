import { number } from "motion";

export interface GuestHotelFormBookingData {
  fullName: string;
  phoneNumber: string;
  email: string;
  idDocumentType: string;
  idDocumentNumber: string;
}

export interface GuestData {
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  idDocumentNumber: string;
  idDocumentType: string;
  phoneNumber: string;
}

export interface GuestBookingInfoResponse {
  data: GuestData;
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface BookingItem {
  itemType: "hotel_room" | "apartment" | "bus_ticket";
  itemId: string;
  startDatetime: string;
  endDatetime: string;
  quantity: number;
  guests: [{ fullName: string; passengerType: "adult" | "child" }];
}

export interface BookingInitiatePayload {
  bookingType: "hotel" | "apartment" | "transport" | "mixed";
  guestCustomerId: string;
  promoCode?: string;
  idempotencyKey: string;
  items: BookingItem[];
}

// Response types

export interface BookingResponseGuest {
  bookingItemId: string;
  createdAt: string;
  fullName: string;
  id: string;
  idDocumentNumber: string;
  passengerType: string;
  phoneNumber: string;
  seatNumber: string;
}

export interface BookingResponseRoom {
  createdAt: string;
  floor: string;
  hotelId: string;
  id: string;
  roomNumber: string;
  roomTypeId: string;
  status: string;
  updatedAt: string;
}

export interface RoomAssignments {
  assignmentDate: string;
  bookingItemId: string;
  createdAt: string;
  id: string;
  room: BookingResponseRoom[];
  roomId: string;
  status: string;
  updatedAt: string;
}

export interface BookingResponseItem {
  bookingId: string;
  createdAt: string;
  endDatetime: string;
  guests: BookingResponseGuest[];
  id: string;
  itemId: string;
  itemType: string;
  providerId: string;
  quantity: number;
  roomAssignments: RoomAssignments[];
  startDatetime: string;
  status: string;
  totalPrice: string;
  unitPrice: string;
}

export interface BookingResponseLock {
  bookingId: string;
  createdAt: string;
  expiresAt: string;
  id: string;
  lockType: string;
  lockedEntityId: string;
  quantity: number;
  status: string;
}

export interface BookingInitiationData {
  bookingReference: string;
  bookingStatus:
    | "pending_payment"
    | "confirmed"
    | "cancelled"
    | "completed"
    | "refunded"
    | "failed"
    | "checked_in";
  bookingType: string;
  cancellationFee: string;
  checkedInAt: string;
  checkedInBy: string;
  checkinOtp: string;
  checkinOtpAttempts: string;
  createdAt: string;
  currency: string;
  customerId: string;
  deletedAt: string;
  discountAmount: number;
  escrowAmount: string;
  finalAmount: number;
  guestCustomerId: string;
  id: string;
  items: BookingResponseItem[];
  locks: BookingResponseLock[];
  qrToken: string;
  totalAmount: number;
  updatedAt: string;
}

export interface BookingInitiationResponse {
  data: BookingInitiationData;
  statusCode: number;
  success: boolean;
  timestamp: string;
}
