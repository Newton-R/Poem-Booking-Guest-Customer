export interface HotelPaymentIntiationPayload {
  bookingId: string;
  paymentMethod: string;
  phoneNumber: string;
}

interface ResponseData {
  amount: number;
  message: string;
  paymentId: string;
  paymentReference: string;
  providerReference: string;
  ussdCode: string;
}

export interface HotelPaymentInitiationResponse {
  data: ResponseData;
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export type PaymentStatus =
  | "initiated"
  | "pending"
  | "successful"
  | "failed"
  | "reversed";
export type BookingStatus = "pending_payment" | "confirmed" | string;

export interface PaymentStatusData {
  paymentReference: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  bookingId: string;
  amount: number;
  currency: string;
  paidAt: string | null;
  createdAt: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  statusCode: number;
  data: PaymentStatusData;
  timestamp: string;
}
