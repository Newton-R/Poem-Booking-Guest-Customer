import { GuestData } from "./booking";

export interface GuestBookingDetailResponseItem {
  bookingId: string;
  createdAt: string;
  endDatetime: string;
  guests: string[];
  id: string;
  itemId: string;
  itemType: "apartment" | "hotel";
  providerId: string;
  quantity: number;
  roomAssignments: string[];
  startDatetime: string;
  status: string;
  totalPrice: string;
  unitPrice: string;
}

export interface GuestBookingDetailsResponseData {
  bookingReference: string;
  bookingStatus: "confirmed" | "pending" | "failed";
  bookingType: string;
  cancellationFee: string;
  checkedInAt: string;
  checkedInBy: string;
  checkinOtp: string;
  checkinOtpAttempts: number;
  createdAt: string;
  currency: string;
  customerId: string;
  deletedAt: string;
  discountAmount: string;
  escrowAmount: string;
  finalAmount: string;
  guestCustomer: GuestData;
  guestCustomerId: string;
  id: string;
  items: GuestBookingDetailResponseItem[];
  qrToken: string;
  totalAmount: string;
  updatedAt: string;
}

export interface GuestBookingDetailsResponse {
  data: GuestBookingDetailsResponseData;
  statusCode: number;
  success: boolean;
  timestamp: string;
}
