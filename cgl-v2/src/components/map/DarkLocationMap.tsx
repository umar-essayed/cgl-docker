'use client';

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

interface DarkLocationMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  lang?: string;
}

export default function DarkLocationMap({
  lat = 21.5231047,
  lng = 39.177774,
  zoom = 17,
}: DarkLocationMapProps = {}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Initialize Map Once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    // Dynamically import Leaflet on client side
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: zoom,
        zoomControl: false,
        scrollWheelZoom: false,
        // Disable single-finger drag on mobile so user doesn't get trapped while scrolling the page!
        dragging: !L.Browser.mobile,
      });

      mapInstanceRef.current = map;

      // Clean OpenStreetMap tiles with CSS dark filter (100% free, permanent, zero watermarks)
      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      L.tileLayer(tileUrl, {
        attribution: '&copy; OpenStreetMap contributors',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19,
        className: 'cgl-dark-tiles',
      }).addTo(map);

      // Custom CGL Pin with brand pulse
      const pinHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;">
          <div style="position: absolute; width: 38px; height: 38px; border-radius: 50%; background: var(--cgl-primary, #3b76b3); opacity: 0.35; animation: pulse 2s cubic-bezier(0.4, 0, 1) infinite;"></div>
          <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--cgl-primary, #3b76b3); border: 3px solid #000000; box-shadow: 0 0 16px var(--cgl-primary, rgba(59, 118, 179, 0.85)); display: flex; align-items: center; justify-content: center;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #000000;"></div>
          </div>
        </div>
      `;

      const customPin = L.divIcon({
        className: 'cgl-custom-marker',
        html: pinHtml,
        iconSize: [42, 42],
        iconAnchor: [21, 21],
      });

      L.marker([lat, lng], { icon: customPin }).addTo(map);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full bg-[#000000] isolate z-0"
    />
  );
}
