export interface ApartmentGuestPayload {
  fullName: string;
  phoneNumber: string;
  email: string;
  idDocumentType: string;
  idDocumentNumber: string;
}

export interface ApartmentBookingGuestInfo {
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  idDocumentNumber: string;
  idDocumentType: string;
  phoneNumber: string;
}

export interface ApartmentBookingGuestInfoResponse {
  data: ApartmentBookingGuestInfo;
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface ApartmentBookingItem {
  itemType: string;
  itemId: string;
  startDatetime: string;
  endDatetime: string;
  quantity: number;
}

export interface ApartmentBookingPayload {
  bookingType: "apartment";
  guestCustomerId: string;
  items: ApartmentBookingItem[];
}

export interface ApartmentBookingResponseItem {
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

export interface ApartmentBookingResponseLock {
  bookingId: string;
  createdAt: string;
  expiresAt: string;
  id: string;
  lockType: string;
  lockedEntityId: string;
  quantity: number;
  status: string;
}

export interface ApartmentBookingResponseData {
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
  items: ApartmentBookingResponseLock[];
  locks: ApartmentBookingResponseLock[];
  qrToken: string;
  totalAmount: string;
  updatedAt: string;
}

export interface ApartmentBookingResponse {
  data: ApartmentBookingResponseData;
  statusCode: number;
  success: boolean;
  timestamp: string;
}
