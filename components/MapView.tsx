"use client";

import dynamic from "next/dynamic";
import type { Place } from "./OpenMapView";

const OpenMapView = dynamic(() => import("./OpenMapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-125 w-full items-center justify-center text-sm text-muted-foreground">
      Loading map…
    </div>
  ),
});

export default function MapView({ lat, lng, label }: Place) {
  return (
    <div className="h-full min-h-64 w-full overflow-hidden rounded-lg">
      <OpenMapView lat={lat} lng={lng} label={label} />
    </div>
  );
}
