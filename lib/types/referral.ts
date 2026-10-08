export interface Referral {
  id: string;
  refereeName: string;
  refereePhoneMasked: string;
  status: "qualified" | "expired";
  attributedAt: string;
  qualifiedAt: string;
  qualifyingBookingReference: string;
  pointsAwarded: number;
}
export interface ReferralData {
  code: string;
  referralLink: string;
  referrals: Referral[];
  rules: { pointsPerReferral: number; attributionLockDays: number };
  stats: {
    attributed: number;
    qualified: number;
    voided: number;
    expired: number;
    pointsEarned: number;
  };
}

export interface ReferralResponse {
  data: ReferralData;
  message: string;
  status: number;
}

export interface LedgerRowData {
  id: string;
  loyaltyAccountId: string;
  bookingId: string;
  referralId: string;
  transactionType: "redeemed";
  points: number;
  description: string;
  reference: string;
  createdAt: string;
}

export interface RewardData {
  rules: {
    earnMinBookingAmount: number;
    maxPointsBookingPercent: number;
    minPointsSpend: number;
    pointsPerBooking: number;
    pointsToXafRate: number;
  };
  ledger: {
    page: 1;
    pageSize: 20;
    rows: LedgerRowData[];
    total: 0;
  };
  lifetimePoints: number;
  pointsBalance: number;
  tier: string;
}

export interface RewardResponse {
  data: RewardData;
  message: string;
  status: number;
}
