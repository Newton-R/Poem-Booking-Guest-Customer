interface ApartmentImage {
  apartment_id: string;
  created_at: string;
  id: string;
  image_url: string;
  is_primary: boolean;
}

interface AppartmentPolicy {
  apartment_id: string;
  cancellation_policy: string;
  check_in_policy: string;
  created_at: string;
  house_rules: string;
  security_deposit_amount: string;
  updated_at: string;
}

export interface Apartment {
  address: string;
  apartment_type: string;
  avg_rating: string;
  base_price_per_night: string;
  bathrooms: number;
  bedrooms: number;
  branch_id: number;
  city_id: string;
  created_at: string;
  currency: string;
  deleted_at: string;
  description: string;
  id: string;
  images: ApartmentImage[];
  latitude: string;
  longitude: string;
  max_guests: number;
  provider_id: string;
  review_count: number;
  status: string;
  title: string;
  updated_at: string;
}

export interface ApartmentResponse {
  data: {
    data: Apartment[];
  };
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface ApartmentDetail {
  address: string;
  apartment_type: string;
  avg_rating: number;
  base_price_per_night: number;
  bathrooms: number;
  bedrooms: number;
  branch_id: string;
  city_id: string;
  created_at: string;
  currency: string;
  deleted_at: string;
  description: string;
  id: string;
  images: ApartmentImage[];
  latitude: string;
  longitude: string;
  max_guests: string;
  policy: AppartmentPolicy;
  provider_id: string;
  review_count: number;
  status: string;
  title: string;
  updated_at: string;
}

export interface ApartmentDetailResponse {
  data: ApartmentDetail;
  statusCode: number;
  success: boolean;
  timestamp: string;
}
