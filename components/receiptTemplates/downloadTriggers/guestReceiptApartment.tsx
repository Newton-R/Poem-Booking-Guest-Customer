"use client";

import { useState } from "react";
import { toPngDataUrl } from "@/lib/pdf-images";
import { generateQrPngDataUrl } from "@/lib/qr-style";
import type { GuestBookingDetailsResponseData } from "@/lib/types/booking_data";
import { Button } from "@/components/ui/button";

const PLATFORM_NAME = "POEM Booking"; // <- your platform name
const PLATFORM_LOGO = "/logo.png"; // <- PNG or JPG in /public

export function DownloadGuestReceipt({
  booking,
}: {
  booking: GuestBookingDetailsResponseData;
}) {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    try {
      setLoading(true);

      const [{ pdf }, { GuestReceiptPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/receiptTemplates/guestBooking"), // your real path
      ]);

      const imagePath = booking.items[0]?.serviceImageUrl;
      const imageUrl = imagePath
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL ?? ""}${imagePath}`
        : null;

      const [qrDataUrl, logo, propertyImage] = await Promise.all([
        generateQrPngDataUrl(booking.qrToken, "PB"),
        toPngDataUrl(PLATFORM_LOGO),
        toPngDataUrl(imageUrl),
      ]);

      const blob = await pdf(
        <GuestReceiptPdf
          booking={booking}
          platform={{ name: PLATFORM_NAME, logo }}
          qrDataUrl={qrDataUrl}
          propertyImage={propertyImage}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${booking.bookingReference}.pdf`;
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
