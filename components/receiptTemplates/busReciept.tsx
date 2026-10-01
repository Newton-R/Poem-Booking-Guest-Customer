import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import type {
  GuestBookingDetailsResponseData,
  TransportBookingItem,
} from "@/lib/types/booking_data";

export type BusReceiptPdfProps = {
  booking: GuestBookingDetailsResponseData;
  platform: { name: string; logo?: string | null };
  qrDataUrl?: string | null;
};

// Own formatter: Intl can output special space characters the built-in PDF fonts can't render
const money = (n: number | string, currency = "XAF") =>
  `${currency} ${Math.round(Number(n) || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

// Never let one bad date crash the whole PDF
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
    alignItems: "flex-end",
  },
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: { fontSize: 20, fontFamily: "Helvetica-Bold" },
  thanks: { fontSize: 10, color: colors.muted, marginTop: 4 },
  qr: { width: 90, height: 90 },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoCell: { width: "50%", marginBottom: 16 },
  label: {
    fontSize: 8,
    color: colors.muted,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  bold: { fontFamily: "Helvetica-Bold" },
  big: { fontSize: 14, fontFamily: "Helvetica-Bold" },

  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    marginTop: 24,
  },
  tripCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    padding: 16,
    paddingBottom: 4,
    marginTop: 8,
  },
  tripCell: { width: "50%", marginBottom: 12 },

  passengerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
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

  amounts: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.dark,
    color: "#ffffff",
    borderRadius: 12,
    padding: 18,
    marginTop: 6,
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

export function BusReceiptPdf({
  booking,
  platform,
  qrDataUrl,
}: BusReceiptPdfProps) {
  const {
    bookingReference,
    bookingStatus,
    finalAmount,
    totalAmount,
    discountAmount,
    currency,
  } = booking;

  const item =
    booking.bookingType === "transport"
      ? booking.items[0]
      : ({} as TransportBookingItem);
  const { guests, service } = item;
  const { transport } = service;
  const status = statusColors[bookingStatus] ?? fallbackStatus;

  return (
    <Document title={`Bus receipt ${bookingReference}`} author={platform.name}>
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
              <Text
                style={[
                  s.badge,
                  { backgroundColor: status.bg, color: status.text },
                ]}
              >
                {bookingStatus}
              </Text>
              <Text style={s.title}>Electronic Booking Receipt</Text>
              <Text style={s.thanks}>
                Thank you for travelling with {platform.name}
              </Text>
            </View>
            {qrDataUrl ? <Image src={qrDataUrl} style={s.qr} /> : null}
          </View>

          {/* Info grid */}
          <View style={s.infoGrid}>
            <View style={s.infoCell}>
              <Text style={s.label}>RECEIPT NUMBER</Text>
              <Text style={s.big}>{bookingReference}</Text>
            </View>
            <View style={s.infoCell}>
              <Text style={s.label}>OTP</Text>
              <Text style={s.big}>{booking.checkinOtp}</Text>
            </View>
            <View style={s.infoCell}>
              <Text style={s.label}>DATE OF ISSUE</Text>
              <Text>{safeFormat(booking.createdAt, "MMM dd, yyyy")}</Text>
            </View>
            <View style={s.infoCell}>
              <Text style={s.label}>PHONE NUMBER</Text>
              <Text>{booking.customerPhoneNumber}</Text>
            </View>
          </View>

          {/* Trip summary */}
          <Text style={s.sectionTitle}>Trip Summary</Text>
          <View style={s.tripCard} wrap={false}>
            <View style={s.tripCell}>
              <Text style={s.label}>AGENCY</Text>
              <Text style={s.bold}>{transport.agencyName}</Text>
            </View>
            <View style={s.tripCell}>
              <Text style={s.label}>ROUTE</Text>
              <Text style={s.bold}>
                {transport.originCity} to {transport.destinationCity}
              </Text>
            </View>
            <View style={s.tripCell}>
              <Text style={s.label}>DEPARTURE DATE</Text>
              <Text style={s.bold}>
                {safeFormat(service.startDatetime, "MMM dd, yyyy")}
              </Text>
            </View>
            <View style={s.tripCell}>
              <Text style={s.label}>DEPARTURE TIME</Text>
              <Text style={s.bold}>
                {safeFormat(service.departureTime, "hh:mm a")}
              </Text>
            </View>
          </View>

          {/* Passengers: a row never splits across pages */}
          {guests.map((guest) => (
            <View key={guest.id} style={s.passengerRow} wrap={false}>
              <View>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>
                  {guest.fullName}
                </Text>
                <Text style={s.passengerType}>{guest.passengerType}</Text>
              </View>
              <Text style={s.seat}>Seat {guest.seatNumber}</Text>
            </View>
          ))}

          {/* Amounts */}
          <View style={s.amounts} wrap={false}>
            <View style={s.amountRow}>
              <Text style={{ color: colors.muted }}>Ticket Amount</Text>
              <Text>{money(totalAmount, currency)}</Text>
            </View>
            {Number(discountAmount) > 0 && (
              <View style={s.amountRow}>
                <Text style={{ color: colors.muted }}>Discount</Text>
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
            Please present this electronic receipt or a printed copy at the
            terminal 30 minutes before departure.
          </Text>
        </View>

        {/* Footer with page numbers */}
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
