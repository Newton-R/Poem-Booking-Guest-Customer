// react-pdf only supports PNG/JPG, so images go through a canvas.
// This also converts webp and shrinks big photos to keep the PDF small.
export async function toPngDataUrl(
  src?: string | null,
  maxSize = 400,
): Promise<string | null> {
  if (!src) return null;
  try {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    await img.decode();

    const scale = Math.min(
      1,
      maxSize / Math.max(img.naturalWidth, img.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  } catch {
    return null; // a missing image should never block the download
  }
}
