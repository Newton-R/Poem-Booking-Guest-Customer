export interface Agency {
  createdAt: string;
  id: string;
  name: string;
  providerId: string;
  status: string;
  updatedAt: string;
}

export interface TransportRoute {
  agency: Agency;
  agencyId: string;
  createdAt: string;
  destinationCity: string;
  destinationCityId: string;
  distanceKm: string;
  originRegion: string;
  startingPrice: number;
  destinationRegion: string;
  imageUrl: string;
  estimatedDurationMinutes: string;
  id: string;
  originCity: string;
  originCityId: string;
  status: string;
}

export interface TransportRouteResponse {
  data: {
    data: TransportRoute[];
  };
  limit: number;
  page: number;
  total: number;
}

export interface BusSeat {
  busId: string;
  columnNumber: number;
  createdAt: string;
  id: string;
  rowNumber: number;
  seatNumber: string;
  seatType: string;
}

export interface TransportBus {
  agencyId: string;
  busType: string;
  createdAt: string;
  id: string;
  plateNumber: string;
  seatCapacity: number;
  seats: BusSeat[];
  status: string;
  updatedAt: string;
}

export interface ScheduledTrips {
  arrivalTime: string;
  basePrice: string;
  bus: TransportBus;
  busId: string;
  createdAt: string;
  currency: string;
  departureTime: string;
  id: string;
  routeId: string;
  status: string;
  updatedAt: string;
}

export interface TransportRouteDetail {
  agency: Agency;
  buses: TransportBus[];
  createdAt: string;
  destinationCity: string;
  destinationCityId: string;
  destinationRegion: string;
  distanceKm: number;
  estimatedDurationMinutes: number;
  id: string;
  imageUrl: string;
  originCity: string;
  originCityId: string;
  originRegion: string;
  scheduledTrips: ScheduledTrips[];
  startingPrice: number;
  status: string;
}

export interface TransportDetailsResponse {
  data: TransportRouteDetail;
  statusCode: number;
  success: boolean;
  timestamp: string;
}
