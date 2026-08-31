"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus, ExternalLink, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

export interface MapLocationItem {
  name: string;
  city?: string;
  latitude: number;
  longitude: number;
  isPrimary?: boolean;
}

interface SriLankaDarkMapProps {
  locations?: MapLocationItem[];
}

export function SriLankaDarkMap({ locations }: SriLankaDarkMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showTwoFingerOverlay, setShowTwoFingerOverlay] = useState(false);
  const overlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const defaultLocation: MapLocationItem = {
    name: "Galle Face Green",
    city: "Colombo 03",
    latitude: 6.9237882,
    longitude: 79.8449324,
    isPrimary: true,
  };

  const activeLocations =
    locations && locations.length > 0 ? locations : [defaultLocation];
  const primaryLoc =
    activeLocations.find((l) => l.isPrimary) || activeLocations[0];

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${primaryLoc.latitude},${primaryLoc.longitude}`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainerRef.current || mapInstanceRef.current)
      return;

    // Dynamically import Leaflet on client side
    import("leaflet").then((L) => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const isMobile =
        typeof window !== "undefined" &&
        (window.innerWidth < 768 || L.Browser.mobile);

      const centerCoords: [number, number] = [
        primaryLoc.latitude,
        primaryLoc.longitude,
      ];

      // Initialize Leaflet Map: Disable single-finger drag on mobile to allow page scrolling
      const map = L.map(mapContainerRef.current, {
        center: centerCoords,
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        dragging: !isMobile,
        scrollWheelZoom: false,
        touchZoom: true,
      });

      mapInstanceRef.current = map;

      // Handle 2-finger touch gesture for mobile map panning
      if (isMobile && mapContainerRef.current) {
        const container = mapContainerRef.current;

        const handleTouchStart = (e: TouchEvent) => {
          if (e.touches.length === 1) {
            // Single finger: allow page scroll and show hint overlay
            map.dragging.disable();
            setShowTwoFingerOverlay(true);
            if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
            overlayTimerRef.current = setTimeout(() => {
              setShowTwoFingerOverlay(false);
            }, 1800);
          } else if (e.touches.length >= 2) {
            // Two fingers: enable map drag
            setShowTwoFingerOverlay(false);
            map.dragging.enable();
          }
        };

        const handleTouchEnd = (e: TouchEvent) => {
          if (e.touches.length < 2) {
            map.dragging.disable();
          }
        };

        container.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        container.addEventListener("touchend", handleTouchEnd, {
          passive: true,
        });
      }

      // Add CartoDB Dark Matter Tile Layer with API Key
      const cartoApiKey =
        process.env.NEXT_PUBLIC_CARTO_API_KEY ||
        "cb1_2n67_1_5439ee4a67277643b69e3bae";

      L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${cartoApiKey}`,
        {
          maxZoom: 19,
          subdomains: "abcd",
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(map);

      // Render markers for ALL locations in database
      activeLocations.forEach((loc) => {
        const markerCoords: [number, number] = [loc.latitude, loc.longitude];

        const customIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `
            <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
              <div style="position: absolute; width: 24px; height: 24px; border-radius: 50%; background: ${
                loc.isPrimary
                  ? "rgba(37, 99, 235, 0.4)"
                  : "rgba(56, 189, 248, 0.3)"
              }; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              <div style="position: absolute; width: 12px; height: 12px; border-radius: 50%; background: ${
                loc.isPrimary ? "#2563eb" : "#38bdf8"
              }; border: 2px solid #ffffff; box-shadow: 0 0 10px ${
                loc.isPrimary ? "#2563eb" : "#38bdf8"
              };"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker(markerCoords, { icon: customIcon }).addTo(map);

        if (loc.name) {
          const accentColor = loc.isPrimary ? "#3b82f6" : "#38bdf8";
          marker.bindTooltip(
            `
            <div style="
              display: inline-flex;
              align-items: center;
              gap: 8px;
              background: rgba(8, 12, 20, 0.92);
              backdrop-filter: blur(8px);
              border: 1px solid ${loc.isPrimary ? "rgba(59, 130, 246, 0.6)" : "rgba(56, 189, 248, 0.4)"};
              padding: 4px 10px;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7), 0 0 12px ${loc.isPrimary ? "rgba(59, 130, 246, 0.25)" : "rgba(56, 189, 248, 0.25)"};
              white-space: nowrap;
              pointer-events: none;
            ">
              <span style="
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: ${accentColor};
                box-shadow: 0 0 8px ${accentColor};
                flex-shrink: 0;
              "></span>
              <span style="
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 11px;
                font-weight: 700;
                color: #f8fafc;
                text-transform: uppercase;
                letter-spacing: 0.06em;
              ">
                ${loc.name} ${
                  loc.city
                    ? `<span style="color: #94a3b8; font-weight: 500; font-size: 10px;">(${loc.city})</span>`
                    : ""
                }
              </span>
            </div>
            `,
            {
              permanent: true,
              direction: "top",
              offset: [0, -12],
              className: "custom-leaflet-tooltip",
            },
          );
        }
      });
    });

    return () => {
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted, activeLocations, primaryLoc]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapInstanceRef.current as any).zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapInstanceRef.current as any).zoomOut();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[440px] bg-[#090b10] border border-border/60 overflow-hidden select-none touch-pan-y">
      {/* Extended Bleeding Hairline Guide Lines */}
      <div className="absolute -left-8 -right-8 top-0 border-t border-border/60 pointer-events-none z-20" />
      <div className="absolute -left-8 -right-8 bottom-0 border-b border-border/60 pointer-events-none z-20" />
      <div className="absolute -top-8 -bottom-8 left-0 border-l border-border/60 pointer-events-none z-20" />
      <div className="absolute -top-8 -bottom-8 right-0 border-r border-border/60 pointer-events-none z-20" />

      {/* Two-finger Touch Hint Overlay on Mobile */}
      {showTwoFingerOverlay && (
        <div className="absolute inset-0 z-30 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity pointer-events-none">
          <p className="text-white text-xs font-mono font-bold uppercase tracking-wider bg-slate-900/90 border border-slate-700 px-4 py-2 text-center shadow-lg">
            Use two fingers to move the map
          </p>
        </div>
      )}

      {/* Leaflet Map Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[380px] md:min-h-[440px] z-10 touch-pan-y"
      />

      {/* Open Direct in Google Maps Button (Bottom Left Corner) */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 z-30 inline-flex items-center gap-2 border border-border/60 bg-background/90 backdrop-blur-md px-3 py-1.5 text-xs font-mono font-bold uppercase text-foreground hover:bg-muted/30 transition-colors shadow-sm cursor-pointer"
      >
        <Navigation className="size-3.5 text-primary shrink-0" />
        <span>Open in Google Maps</span>
        <ExternalLink className="size-3 text-muted-foreground shrink-0" />
      </a>

      {/* Custom Theme Zoom Controls (Bottom Right Corner) */}
      <div className="absolute bottom-4 right-4 z-30 flex flex-col border border-border/60 divide-y divide-border/60 bg-background/90 backdrop-blur-md">
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 hover:bg-muted/20 text-foreground transition-colors cursor-pointer"
          title="Zoom In"
        >
          <Plus className="size-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 hover:bg-muted/20 text-foreground transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="size-4" />
        </button>
      </div>
    </div>
  );
}
