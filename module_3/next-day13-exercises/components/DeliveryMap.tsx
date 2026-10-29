'use client';
import { useEffect, useRef } from 'react';
export default function DeliveryMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    node.dataset.view = 'courier-and-destination-fitted';
    return () => { delete node.dataset.view; };
  }, []);
  return <div ref={mapRef} className="delivery-map" aria-label="Schematic delivery map showing courier and delivery destination fitted in the same view">
    <svg viewBox="0 0 720 300" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">Courier and delivery destination</title><desc id="map-desc">A schematic Addis Ababa street map. Both courier and delivery markers are visible in the fitted view.</desc>
      <rect width="720" height="300" rx="12" className="map-ground" />
      {[35,95,155,215,275,335,395,455,515,575,635,695].map(x=><path key={`v${x}`} d={`M ${x} 0 L ${x-30} 300`} className="map-road"/>)}
      {[35,95,155,215,275].map(y=><path key={`h${y}`} d={`M 0 ${y} L 720 ${y+12}`} className="map-road"/>)}
      <path d="M 70 250 C 190 200, 230 130, 345 150 S 510 235, 630 60" className="route-line"/>
      <g transform="translate(180 196)"><circle r="21" className="marker-ring courier-ring"/><circle r="13" className="courier-marker"/><text y="4" textAnchor="middle" className="marker-glyph">C</text><text y="39" textAnchor="middle" className="map-label">Courier</text></g>
      <g transform="translate(600 85)"><circle r="21" className="marker-ring destination-ring"/><path d="M0 -13 C-8 -13 -13 -7 -13 0 C-13 9 0 18 0 18 S13 9 13 0 C13 -7 8 -13 0 -13Z" className="destination-marker"/><circle cy="0" r="4" className="marker-hole"/><text y="39" textAnchor="middle" className="map-label">Delivery</text></g>
    </svg>
    <p><strong>Route:</strong> Courier near Kazanchis → delivery in Bole. Both markers are shown in the fitted view.</p>
  </div>;
}
