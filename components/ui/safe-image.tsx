"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type SafeImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: ImageProps["src"] | null;
  alt: string;
  fallbackSrc?: ImageProps["src"];
};

const isInvalid = (src: SafeImageProps["src"]) =>
  src == null ||
  (typeof src === "string" &&
    (src.trim().length === 0 || /(null|undefined)$/i.test(src)));

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/images/fallback.png",
  onError,
  ...props
}: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

  useEffect(() => {
    setFailedSrc(null);
  }, [src]);

  const validSrc = isInvalid(src) ? undefined : src;
  const imageSrc: ImageProps["src"] =
    validSrc == null || failedSrc === validSrc ? fallbackSrc : validSrc;

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={(event) => {
        onError?.(event);
        setFailedSrc(validSrc ?? null);
      }}
    />
  );
}
