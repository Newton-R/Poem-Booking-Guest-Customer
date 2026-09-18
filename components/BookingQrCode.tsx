"use client";
import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface StyledQRCodeProps {
  data: string;
  size?: number;
  initials?: string; // e.g. "NN"
}

function generateInitialsLogo(
  initials: string,
  bgColor = "#ffffff",
  textColor = "#0047AB",
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="${bgColor}" stroke="${textColor}" stroke-width="4"/>
      <text x="50" y="50" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, sans-serif" font-weight="bold" font-size="36" fill="${textColor}">
        ${initials}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export const BookingQRCode = ({
  data,
  size = 320,
  initials = "NN",
}: StyledQRCodeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = ""; // clear on re-render

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data,
      margin: 8,
      qrOptions: {
        errorCorrectionLevel: "H", // needed since center is covered
      },
      dotsOptions: {
        type: "dots", // 👈 the rounded-dot look
        color: "#8c5003",
      },
      cornersSquareOptions: {
        type: "dot", // 👈 the circular ring eyes
        color: "#8c5003",
      },
      cornersDotOptions: {
        type: "dot",
        color: "#8c5003",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 8,
        imageSize: 0.25,
      },
      // Option A: use an actual logo image
      image: generateInitialsLogo(initials, "#ffffff", "#8c5003"),
    });

    qrCode.append(ref.current);
  }, [data, size, initials]);

  return <div ref={ref} />;
};
