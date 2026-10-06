export interface GeneralReviewGuestPayload {
  serviceType: string;
  targetId: string;
  rating: number;
  comment: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface ReviewGuestResponse {
  success: true;
  statusCode: 201;
  data: {
    id: string;
    serviceType: "hotel" | "apartment" | "restaurant";
    rating: number;
    stars: number;
    comment: string;
    reviewStatus: "pending";
    createdAt: string;
    isGuest: boolean;
    customer: { id: string; name: string; isGuest: boolean };
    target: {
      id: string;
      name: string;
    };
    business: {
      providerId: string;
      name: string;
    };
  };
  timestamp: string;
}
