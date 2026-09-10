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
