"use client";

import { useState } from "react";

import { generateQrPngDataUrl } from "@/lib/qr-style";
import type { GuestBookingDetailsResponseData } from "@/lib/types/booking_data";
import { Button } from "@/components/ui/button";
import { toPngDataUrl } from "@/lib/pdf-images";

const PLATFORM_NAME = "POEM Booking"; // <- your platform name
const PLATFORM_LOGO = "/logo.png"; // <- PNG or JPG in /public

export function DownloadBusReceipt({
  booking,
}: {
  booking: GuestBookingDetailsResponseData;
}) {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    try {
      setLoading(true);

      const [{ pdf }, { BusReceiptPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/receiptTemplates/busReciept"), // your real path
      ]);

      const [qrDataUrl, logo] = await Promise.all([
        generateQrPngDataUrl(booking.qrToken, "PB"),
        toPngDataUrl(PLATFORM_LOGO),
      ]);

      const blob = await pdf(
        <BusReceiptPdf
          booking={booking}
          platform={{ name: PLATFORM_NAME, logo }}
          qrDataUrl={qrDataUrl}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bus-receipt-${booking.bookingReference}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Receipt generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="p-6 rounded-md flex-1"
      onClick={download}
      disabled={loading}
    >
      {loading ? "Preparing PDF..." : "Download PDF"}
    </Button>
  );
}
