"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const courierIcon = L.divIcon({ className: "courier-map-icon", html: "<span aria-hidden='true'>🚴</span>", iconSize: [34, 34], iconAnchor: [17, 17] });
const destinationIcon = L.divIcon({ className: "destination-map-icon", html: "<span aria-hidden='true'>📍</span>", iconSize: [34, 34], iconAnchor: [17, 30] });

export default function TrackingMapInner({ courier, destination }) {
  const center = [(courier.lat + destination.lat) / 2, (courier.lng + destination.lng) / 2];
  return <div className="tracking-map" role="region" aria-label="Map showing courier and delivery destination">
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "360px", width: "100%" }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[courier.lat, courier.lng]} icon={courierIcon}><Popup>{courier.label}</Popup></Marker>
      <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}><Popup>{destination.label}</Popup></Marker>
      <Polyline positions={[[courier.lat, courier.lng], [destination.lat, destination.lng]]} pathOptions={{ color: "#30251f", weight: 4, dashArray: "8 8" }} />
    </MapContainer>
  </div>;
}
