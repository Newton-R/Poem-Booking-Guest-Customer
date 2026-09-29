"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export type Place = {
  lat: number;
  lng: number;
  label?: string;
};

const locationIcon = L.icon({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapViewport({ lat, lng }: Place) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 14);
    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(map.getContainer());
    map.invalidateSize();

    return () => resizeObserver.disconnect();
  }, [lat, lng, map]);

  return null;
}

export default function OpenMapView({ lat, lng, label }: Place) {
  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return (
      <div className="flex h-full min-h-64 items-center justify-center bg-muted text-sm text-muted-foreground">
        Map coordinates are unavailable.
      </div>
    );
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom
      className="h-full min-h-64 w-full"
    >
      <MapViewport lat={lat} lng={lng} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={locationIcon}>
        {label && <Popup>{label}</Popup>}
      </Marker>
    </MapContainer>
  );
}
