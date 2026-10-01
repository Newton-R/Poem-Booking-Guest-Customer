"use client";

import { useState } from "react";

import { toPngDataUrl } from "@/lib/pdf-images";
import { generateQrPngDataUrl } from "@/lib/qr-style";
import type { TransportBookingData } from "@/lib/types/booking_data";
import { Button } from "@/components/ui/button";

const PLATFORM_NAME = "POEM"; // <- your platform name
const PLATFORM_LOGO = "/logo.png"; // <- PNG or JPG in /public

export function DownloadTransportGuestReceipt({
  booking,
}: {
  booking: TransportBookingData;
}) {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    try {
      setLoading(true);

      const [{ pdf }, { TransportGuestReceiptPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/receiptTemplates/guestTransport"), // your real path
      ]);

      const [qrDataUrl, logo] = await Promise.all([
        generateQrPngDataUrl(booking.qrToken, "PB"),
        toPngDataUrl(PLATFORM_LOGO),
      ]);

      const blob = await pdf(
        <TransportGuestReceiptPdf
          booking={booking}
          platform={{ name: PLATFORM_NAME, logo }}
          qrDataUrl={qrDataUrl}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket-receipt-${booking.bookingReference}.pdf`;
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
      className="w-full h-10"
      variant="outline"
      onClick={download}
      disabled={loading}
    >
      {loading ? "Preparing PDF..." : "Download receipt"}
    </Button>
  );
}
