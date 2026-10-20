"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const LeafletMap = dynamic(() => import("./TrackingMapInner"), {
  ssr: false,
  loading: () => <div className="tracking-map map-loading" role="status">Loading delivery map…</div>,
});

export default function TrackingMap({ courier, destination }) {
  return <LeafletMap courier={courier} destination={destination} />;
}
