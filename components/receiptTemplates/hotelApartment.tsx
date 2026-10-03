import { GuestBookingDetailsResponseData } from "@/lib/types/booking_data";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { format, differenceInDays } from "date-fns";

export type ReceiptPlatform = {
  name: string;
  logo?: string | null; // PNG/JPG data URL, see the download helper below
};

export type BookingReceiptProps = {
  booking: GuestBookingDetailsResponseData;
  platform: ReceiptPlatform;
  customer: { name: string; email: string };
  qrDataUrl?: string | null;
  propertyImage?: string | null; // PNG/JPG data URL
  paymentMethod?: string;
};

// Own formatter: Intl can output special space characters the built-in PDF fonts can't render
const price = (n: number) =>
  `${Math.round(n ?? 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} XAF`;

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
    paddingBottom: 70,
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

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 32,
    paddingBottom: 24,
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
  receiptNoRow: { flexDirection: "row", marginTop: 8, alignItems: "center" },
  label: {
    fontSize: 8,
    color: colors.muted,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  bold: { fontFamily: "Helvetica-Bold" },
  qr: { width: 90, height: 90 },

  // Info grid
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.mutedBg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  infoCell: {
    width: "33.33%",
    padding: 16,
    paddingHorizontal: 32,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  infoCellLast: { width: "33.33%", padding: 16 },
  muted: { color: colors.muted },

  // Reservation
  section: { paddingHorizontal: 32, paddingTop: 24 },
  reservationCard: {
    flexDirection: "row",
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 14,
    objectFit: "cover",
  },
  serviceName: { fontSize: 14, fontFamily: "Helvetica-Bold" },
  roomType: { color: colors.primary, marginTop: 3 },
  metaRow: { flexDirection: "row", marginTop: 8 },
  metaItem: { color: colors.muted, marginRight: 16 },

  // Summary
  summaryCard: {
    backgroundColor: colors.mutedBg,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: { fontSize: 8, color: colors.primary, marginBottom: 3 },
  totalValue: { fontSize: 18, fontFamily: "Helvetica-Bold" },

  // Footer band
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.dark,
    color: "#ffffff",
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerSmall: { fontSize: 8 },
  footerFaded: { fontSize: 8, opacity: 0.6, marginTop: 2 },
});

export function BookingReceiptPdf({
  booking,
  platform,
  customer,
  qrDataUrl,
  propertyImage,
  paymentMethod = "MTN Mobile Money",
}: BookingReceiptProps) {
  const item = booking.items[0];
  const nights = differenceInDays(
    new Date(item.service.endDatetime),
    new Date(item.service.startDatetime),
  );
  const status = statusColors[booking.bookingStatus] ?? fallbackStatus;

  const roomLabel =
    booking.bookingType === "hotel"
      ? item.service.name
      : booking.bookingType === "apartment"
        ? item.service.name
        : null;

  return (
    <Document
      title={`Receipt ${booking.bookingReference}`}
      author={platform.name}
    >
      <Page size="A4" style={s.page}>
        {/* Platform logo + name */}
        <View style={s.platformBar}>
          {platform.logo ? <Image src={platform.logo} style={s.logo} /> : null}
          <Text style={s.platformName}>{platform.name}</Text>
        </View>

        {/* Header */}
        <View style={s.header}>
          <View>
            <View style={s.titleRow}>
              <Text style={s.title}>Payment Receipt</Text>
              <Text
                style={[
                  s.badge,
                  { backgroundColor: status.bg, color: status.text },
                ]}
              >
                {booking.bookingStatus}
              </Text>
            </View>
            <Text style={s.thanks}>
              Thank you for choosing {platform.name} for your stay at{" "}
              {booking.items[0].hotelName}.
            </Text>
            <View style={s.receiptNoRow}>
              <Text style={[s.label, { marginBottom: 0, marginRight: 4 }]}>
                RECEIPT NO:
              </Text>
              <Text style={s.bold}>{booking.bookingReference}</Text>
            </View>
          </View>
          {qrDataUrl ? <Image src={qrDataUrl} style={s.qr} /> : null}
        </View>

        {/* Info grid */}
        <View style={s.infoGrid}>
          <View style={s.infoCell}>
            <Text style={s.label}>DATE OF ISSUE</Text>
            <Text style={s.bold}>
              {format(new Date(booking.createdAt), "EEE, dd MMM yyyy")}
            </Text>
          </View>
          <View style={s.infoCell}>
            <Text style={s.label}>OTP</Text>
            <Text style={s.bold}>{booking.checkinOtp}</Text>
          </View>

          <View style={[s.infoCell]}>
            <Text style={s.label}>PAYMENT METHOD</Text>
            <Text style={s.bold}>{paymentMethod}</Text>
            <Text style={s.muted}>{booking.customerPhoneNumber}</Text>
          </View>
        </View>

        {/* Reservation details */}
        <View style={s.section} wrap={false}>
          <Text style={s.label}>RESERVATION DETAILS</Text>
          <View style={s.reservationCard}>
            {propertyImage ? (
              <Image src={propertyImage} style={s.propertyImage} />
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={s.serviceName}>{item.serviceName}</Text>
              {roomLabel ? <Text style={s.roomType}>{roomLabel}</Text> : null}
              <View style={s.metaRow}>
                <Text style={s.metaItem}>
                  {format(new Date(item.service.startDatetime), "dd MMM yyyy")}{" "}
                  - {format(new Date(item.service.endDatetime), "dd MMM yyyy")}
                </Text>
                <Text style={s.metaItem}>{item.guests.length} Guest(s)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment summary */}
        <View style={s.section} wrap={false}>
          <Text style={s.label}>PAYMENT SUMMARY</Text>
          <View style={s.summaryCard}>
            <View style={s.summaryRow}>
              <Text style={s.muted}>
                Accommodation Subtotal ({nights}{" "}
                {nights === 1 ? "Night" : "Nights"})
              </Text>
              <Text style={s.bold}>{price(Number(item.totalPrice))}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.muted}>Discount Amount</Text>
              <Text style={s.bold}>
                {price(Number(booking.discountAmount))}
              </Text>
            </View>
            <View style={s.totalRow}>
              <View>
                <Text style={s.totalLabel}>TOTAL AMOUNT PAID</Text>
                <Text style={s.totalValue}>
                  {price(Number(booking.totalAmount))}
                </Text>
              </View>
              <Text style={{ fontSize: 8, color: colors.muted }}>
                Payment processed via Secured Gateway
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <View>
            <Text style={s.footerSmall}>
              Need assistance with this booking?
            </Text>
            <Text style={s.footerFaded}>
              Contact {platform.name} Support 24/7
            </Text>
          </View>
          <Text
            style={s.footerFaded}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
