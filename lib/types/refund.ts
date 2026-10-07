export interface RefundPolicyData {
  bodyEn: string;
  bodyFr: string;
  key: "refunds" | "cancellations" | "checkin" | "payments";
  sortOrder: number;
  titleEn: string;
  titleFr: string;
}

export interface RefundPolicyResponse {
  data: RefundPolicyData[];
  message: string;
  status: number;
}
