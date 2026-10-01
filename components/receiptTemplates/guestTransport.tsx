import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import type { TransportBookingData } from "@/lib/types/booking_data";

export type TransportGuestReceiptPdfProps = {
  booking: TransportBookingData;
  platform: { name: string; logo?: string | null };
  qrDataUrl?: string | null;
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

const formatDuration = (minutes?: number) => {
  if (!minutes && minutes !== 0) return "-";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m > 0 ? `${m}m` : ""}`.trim();
};

const colors = {
  primary: "#92400e",
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

  // Agency
  agencyCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginTop: 24,
  },
  agencyName: { fontSize: 13, fontFamily: "Helvetica-Bold" },
  agencyService: { fontSize: 9, color: colors.muted, marginTop: 3 },

  // Route
  routeCard: {
    backgroundColor: colors.mutedBg,
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
  },
  routeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  routeTime: { fontSize: 16, fontFamily: "Helvetica-Bold" },
  routeCity: { fontFamily: "Helvetica-Bold", marginTop: 2 },
  routeMiddle: {
    flex: 1,
    alignItems: "center",
    paddingTop: 6,
    paddingHorizontal: 12,
  },
  routeLine: { height: 1, backgroundColor: "#9ca3af", width: "100%" },
  routeMeta: { fontSize: 8, color: colors.primary, marginTop: 4 },
  routeDate: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  // Reference
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

  // Passengers
  passengerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  passengerType: {
    fontSize: 8,
    color: colors.muted,
    marginTop: 2,
    textTransform: "capitalize",
  },
  seat: {
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  // Details
  detailsGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 20 },
  detailCell: { width: "50%", marginBottom: 14 },

  // OTP
  otpBox: {
    alignItems: "center",
    backgroundColor: colors.mutedBg,
    borderRadius: 12,
    padding: 16,
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

export function TransportGuestReceiptPdf({
  booking,
  platform,
  qrDataUrl,
}: TransportGuestReceiptPdfProps) {
  const {
    bookingReference,
    bookingStatus,
    finalAmount,
    discountAmount,
    currency,
    createdAt,
    guestCustomer,
    checkinOtp,
  } = booking;

  const item = booking.items[0];
  const guests = item?.guests ?? [];
  const service = item?.service;
  const transport = service?.transport;
  const status = statusColors[bookingStatus] ?? fallbackStatus;

  return (
    <Document
      title={`Ticket receipt ${bookingReference}`}
      author={platform.name}
    >
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
                Thank you for travelling with {platform.name}. Keep this receipt
                for boarding.
              </Text>
            </View>
            {qrDataUrl ? <Image src={qrDataUrl} style={s.qr} /> : null}
          </View>

          {/* Agency */}
          <View style={s.agencyCard} wrap={false}>
            <Text style={s.agencyName}>{transport?.agencyName ?? "-"}</Text>
            {service?.name ? (
              <Text style={s.agencyService}>{service.name}</Text>
            ) : null}
          </View>

          {/* Route */}
          <View style={s.routeCard} wrap={false}>
            <View style={s.routeRow}>
              <View>
                <Text style={s.routeTime}>
                  {safeFormat(service?.startDatetime, "hh:mm a")}
                </Text>
                <Text style={s.routeCity}>{transport?.originCity ?? "-"}</Text>
              </View>
              <View style={s.routeMiddle}>
                <View style={s.routeLine} />
                <Text style={s.routeMeta}>
                  {formatDuration(transport?.estimatedDurationMinutes)} -{" "}
                  {transport?.distanceKm ?? "-"}
                  km
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={s.routeTime}>
                  {safeFormat(service?.arrivalTime, "hh:mm a")}
                </Text>
                <Text style={s.routeCity}>
                  {transport?.destinationCity ?? "-"}
                </Text>
              </View>
            </View>
            <Text style={s.routeDate}>
              {safeFormat(service?.startDatetime, "EEE, dd MMM yyyy")}
            </Text>
          </View>

          {/* Reference */}
          <View style={s.referenceRow} wrap={false}>
            <Text style={s.label}>BOOKING REFERENCE</Text>
            <Text style={s.referenceValue}>{bookingReference}</Text>
          </View>

          {/* Passengers: a row never splits across pages */}
          <Text style={[s.label, { marginTop: 18 }]}>
            PASSENGER(S) & SEAT(S)
          </Text>
          {guests.map((guest) => (
            <View key={guest.id} style={s.passengerRow} wrap={false}>
              <View>
                <Text style={s.bold}>{guest.fullName}</Text>
                <Text style={s.passengerType}>{guest.passengerType}</Text>
              </View>
              <Text style={s.seat}>Seat {guest.seatNumber}</Text>
            </View>
          ))}

          {/* Details */}
          <View style={s.detailsGrid} wrap={false}>
            <View style={s.detailCell}>
              <Text style={s.label}>BOOKED BY</Text>
              <Text style={s.bold}>{guestCustomer?.fullName ?? "-"}</Text>
            </View>
            <View style={s.detailCell}>
              <Text style={s.label}>PHONE NUMBER</Text>
              <Text style={s.bold}>
                {guestCustomer?.phoneNumber ??
                  String(booking.customerPhoneNumber ?? "-")}
              </Text>
            </View>
            <View style={s.detailCell}>
              <Text style={s.label}>BOOKED ON</Text>
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
            Present this receipt or your booking reference and OTP at the
            terminal 30 minutes before departure.
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
