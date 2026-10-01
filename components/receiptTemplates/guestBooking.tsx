import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import type { GuestBookingDetailsResponseData } from "@/lib/types/booking_data";

export type GuestReceiptPdfProps = {
  booking: GuestBookingDetailsResponseData;
  platform: { name: string; logo?: string | null };
  qrDataUrl?: string | null;
  propertyImage?: string | null; // PNG/JPG data URL
};

// Own formatter: Intl can output special space characters the built-in PDF fonts can't render
const money = (n: number | string, currency = "XAF") =>
  `${currency} ${Math.round(Number(n) || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

// A bad date should never crash the whole PDF
const safeFormat = (
  value: string | Date | undefined | null,
  pattern: string,
) => {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "-" : format(d, pattern);
};

const colors = {
  primary: "#92400e",
  primarySoft: "#fef3e2",
  dark: "#1e293b",
  muted: "#64748b",
  border: "#e2e8f0",
  mutedBg: "#f8fafc",
};

const statusColors: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: "#dcfce7", text: "#16a34a" },
  pending: { bg: "#fef9c3", text: "#ca8a04" },
  completed: { bg: "#f3e8ff", text: "#9333ea" },
};
const fallbackStatus = { bg: "#fee2e2", text: "#dc2626" };

const s = StyleSheet.create({
  page: {
    fontSize: 10,
    color: colors.dark,
    fontFamily: "Helvetica",
    paddingBottom: 60,
  },

  // Platform bar
  platformBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: { width: 32, height: 32, marginRight: 10, objectFit: "contain" },
  platformName: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },

  body: { paddingHorizontal: 32, paddingTop: 24 },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleRow: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 20, fontFamily: "Helvetica-Bold" },
  badge: {
    marginLeft: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "capitalize",
  },
  thanks: { fontSize: 9, color: colors.muted, marginTop: 4, maxWidth: 300 },
  qr: { width: 90, height: 90 },

  label: {
    fontSize: 8,
    color: colors.muted,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  bold: { fontFamily: "Helvetica-Bold" },
  muted: { color: colors.muted },

  // Property card
  propertyCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginTop: 24,
  },
  propertyImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    objectFit: "cover",
  },
  propertyName: { fontSize: 13, fontFamily: "Helvetica-Bold" },
  propertyMeta: { fontSize: 9, color: colors.muted, marginTop: 3 },

  // Reference + details
  referenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  referenceValue: { fontSize: 13, fontFamily: "Helvetica-Bold" },

  detailsGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 18 },
  detailCell: { width: "50%", marginBottom: 16 },

  // OTP
  otpBox: {
    alignItems: "center",
    backgroundColor: colors.mutedBg,
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
  },
  otpValue: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 4,
    marginTop: 4,
  },

  // Total
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.dark,
    color: "#ffffff",
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
  },
  totalLabel: { fontSize: 8, opacity: 0.8, marginBottom: 4 },
  totalValue: { fontSize: 20, fontFamily: "Helvetica-Bold" },

  notice: {
    marginTop: 18,
    fontSize: 9,
    color: colors.muted,
    textAlign: "center",
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: colors.muted,
  },
});

export function GuestReceiptPdf({
  booking,
  platform,
  qrDataUrl,
  propertyImage,
}: GuestReceiptPdfProps) {
  const {
    bookingReference,
    bookingStatus,
    bookingType,
    checkinOtp,
    finalAmount,
    discountAmount,
    currency,
    createdAt,
    guestCustomer,
  } = booking;

  const item = booking.items[0];
  const status = statusColors[bookingStatus] ?? fallbackStatus;

  const propertyName =
    bookingType === "hotel" ? item?.service?.name : item?.service?.name;
  const address = item?.service?.location?.address;
  const rating =
    bookingType === "hotel"
      ? `${Number((item?.service as { hotel?: { starRating?: number | string | null } } | undefined)?.hotel?.starRating ?? 0).toFixed(1)} stars`
      : item?.service?.kind;

  return (
    <Document title={`Receipt ${bookingReference}`} author={platform.name}>
      <Page size="A4" style={s.page}>
        {/* Platform logo + name */}
        <View style={s.platformBar}>
          {platform.logo ? <Image src={platform.logo} style={s.logo} /> : null}
          <Text style={s.platformName}>{platform.name}</Text>
        </View>

        <View style={s.body}>
          {/* Header */}
          <View style={s.header}>
            <View>
              <View style={s.titleRow}>
                <Text style={s.title}>Booking Receipt</Text>
                <Text
                  style={[
                    s.badge,
                    { backgroundColor: status.bg, color: status.text },
                  ]}
                >
                  {bookingStatus}
                </Text>
              </View>
              <Text style={s.thanks}>
                Thank you for booking with {platform.name}. Keep this receipt
                for check-in.
              </Text>
            </View>
            {qrDataUrl ? <Image src={qrDataUrl} style={s.qr} /> : null}
          </View>

          {/* Property */}
          <View style={s.propertyCard} wrap={false}>
            {propertyImage ? (
              <Image src={propertyImage} style={s.propertyImage} />
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={s.propertyName}>{propertyName ?? "-"}</Text>
              {address ? <Text style={s.propertyMeta}>{address}</Text> : null}
              {rating ? (
                <Text style={[s.propertyMeta, { textTransform: "capitalize" }]}>
                  {rating}
                </Text>
              ) : null}
            </View>
          </View>

          {/* Reference */}
          <View style={s.referenceRow} wrap={false}>
            <Text style={s.label}>BOOKING REFERENCE</Text>
            <Text style={s.referenceValue}>{bookingReference}</Text>
          </View>

          {/* Details */}
          <View style={s.detailsGrid} wrap={false}>
            <View style={s.detailCell}>
              <Text style={s.label}>GUEST</Text>
              <Text style={s.bold}>{guestCustomer?.fullName ?? "-"}</Text>
            </View>
            <View style={s.detailCell}>
              <Text style={s.label}>PHONE NUMBER</Text>
              <Text style={s.bold}>{guestCustomer?.phoneNumber ?? "-"}</Text>
            </View>
            <View style={s.detailCell}>
              <Text style={s.label}>TYPE</Text>
              <Text style={[s.bold, { textTransform: "capitalize" }]}>
                {bookingType}
              </Text>
            </View>
            <View style={s.detailCell}>
              <Text style={s.label}>DATE OF ISSUE</Text>
              <Text style={s.bold}>
                {safeFormat(createdAt, "EEE, dd MMM yyyy")}
              </Text>
            </View>
          </View>

          {/* OTP */}
          <View style={s.otpBox} wrap={false}>
            <Text style={s.label}>CHECK-IN OTP</Text>
            <Text style={s.otpValue}>{checkinOtp}</Text>
          </View>

          {/* Amount */}
          <View wrap={false}>
            {Number(discountAmount) > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 18,
                }}
              >
                <Text style={s.muted}>Discount</Text>
                <Text style={{ color: "#16a34a" }}>
                  -{money(discountAmount, currency)}
                </Text>
              </View>
            )}
            <View style={s.totalBox}>
              <View>
                <Text style={s.totalLabel}>TOTAL AMOUNT PAID</Text>
                <Text style={s.totalValue}>{money(finalAmount, currency)}</Text>
              </View>
            </View>
          </View>

          <Text style={s.notice}>
            Present this receipt or your booking reference and OTP at check-in.
          </Text>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text>Need help? Contact {platform.name} Support.</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
