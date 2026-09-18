import { GuestData } from "./booking";

interface AssignmentRoom {
  createdAt: string;
  floor: string;
  hotelId: string;
  id: string;
  roomNumber: string;
  roomTypeId: string;
  status: string;
  updatedAt: string;
}

interface RoomAssignment {
  assignmentDate: string;
  bookingItemId: string;
  createdAt: string;
  id: string;
  room: AssignmentRoom[];
  roomId: string;
  status: string;
  updatedAt: string;
}

interface HotelItemService {
  endDatetime: string;
  hotel: {
    avgRating: string;
    checkInTime: string;
    checkOutTime: string;
    name: string;
    reviewCount: string;
    starRating: string;
  };
  imageUrl: string;
  kind: string;
  location: {
    cityName: "Douala";
    address: "Boulevard de la Liberté, Akwa, Douala";
    latitude: "4.047500";
    longitude: "9.699700";
  };
  name: string;
  roomType: {
    basePrice: string;
    bedType: string;
    currency: string;
    description: string;
    imageUrl: string;
    maxAdults: string;
    maxChildren: string;
    name: string;
    totalRooms: string;
  };
  startDatetime: string;
}

interface ApartmentItemService {
  apartment: {
    apartmentType: "studio";
    avgRating: string;
    basePricePerNight: string;
    bathrooms: number;
    bedrooms: number;
    currency: string;
    maxGuests: number;
    reviewCount: number;
    title: string;
  };
  endDatetime: string;
  imageUrl: string;
  kind: string;
  location: {
    address: string;
    cityName: string;
    latitude: string;
    longitude: string;
  };
  name: string;
  startDatetime: string;
}

type HotelBookingItem = {
  bookingId: string;
  createdAt: string;
  endDatetime: string;
  guests: {
    bookingItemId: string;
    createdAt: string;
    fullName: string;
    id: string;
    idDocumentNumber: string;
    passengerType: string;
    phoneNumber: string;
    seatNumber: string;
  }[];
  id: string;
  hotelName: String;
  itemId: string;
  itemType: "hotel_room";
  providerId: string;
  quantity: number;
  roomTypeName: string;
  roomAssignments: RoomAssignment[];
  startDatetime: string;
  status: string;
  totalPrice: string;
  unitPrice: string;
  service: HotelItemService;
  serviceImageUrl: string;
  serviceName: string;
  serviceType: string;
};

type ApartmentBookingItem = {
  bookingId: string;
  createdAt: string;
  endDatetime: string;
  guests: {
    bookingItemId: string;
    createdAt: string;
    fullName: string;
    id: string;
    idDocumentNumber: string;
    passengerType: string;
    phoneNumber: string;
    seatNumber: string;
  }[];
  id: string;
  hotelName: String;
  itemId: string;
  itemType: "hotel_room";
  providerId: string;
  quantity: number;
  roomTypeName: string;
  roomAssignments: RoomAssignment[];
  startDatetime: string;
  status: string;
  totalPrice: string;
  unitPrice: string;
  service: ApartmentItemService;
  serviceImageUrl: string;
  serviceName: string;
  serviceType: string;
};

type BaseBookingData = {
  bookingReference: string;
  bookingStatus: "confirmed" | "pending" | "failed";
  cancellationFee: string;
  checkedInAt: string;
  checkedInBy: string;
  checkinOtp: string;
  checkinOtpAttempts: number;
  customerPhoneNumber: number;
  createdAt: string;
  currency: string;
  customerId: string;
  deletedAt: string;
  discountAmount: string;
  escrowAmount: string;
  finalAmount: string;
  guestCustomer: GuestData;
  guestCustomerId: string;
  hotelName: string;
  id: string;
  qrToken: string;
  totalAmount: string;
  updatedAt: string;
};

type HotelBookingData = BaseBookingData & {
  bookingType: "hotel";
  items: HotelBookingItem[];
};

type ApartmentBookingData = BaseBookingData & {
  bookingType: "apartment";
  items: ApartmentBookingItem[];
};

export type GuestBookingDetailsResponseData =
  | HotelBookingData
  | ApartmentBookingData;

export interface GuestBookingDetailsResponse {
  data: GuestBookingDetailsResponseData;
  statusCode: number;
  success: boolean;
  timestamp: string;
}
