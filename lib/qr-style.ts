import type { Options } from "qr-code-styling";

export const QR_COLOR = "#8c5003";

export function generateInitialsLogo(
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

export function getQrOptions({
  data,
  size,
  initials,
}: {
  data: string;
  size: number;
  initials: string;
}): Options {
  return {
    width: size,
    height: size,
    type: "svg",
    data,
    margin: 8,
    qrOptions: { errorCorrectionLevel: "H" },
    dotsOptions: { type: "dots", color: QR_COLOR },
    cornersSquareOptions: { type: "dot", color: QR_COLOR },
    cornersDotOptions: { type: "dot", color: QR_COLOR },
    backgroundOptions: { color: "#ffffff" },
    imageOptions: { crossOrigin: "anonymous", margin: 8, imageSize: 0.25 },
    image: generateInitialsLogo(initials, "#ffffff", QR_COLOR),
  };
}

// PNG data URL for the PDF (react-pdf can't render SVG)
export async function generateQrPngDataUrl(
  data: string,
  initials = "PB",
  size = 600, // large on purpose: it's shown at 90pt, so this stays sharp
): Promise<string | null> {
  try {
    const { default: QRCodeStyling } = await import("qr-code-styling");
    const qr = new QRCodeStyling({
      ...getQrOptions({ data, size, initials }),
      type: "canvas",
    });

    const blob = (await qr.getRawData("png")) as Blob | null;
    if (!blob) return null;

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null; // a QR failure should never block the download
  }
}
