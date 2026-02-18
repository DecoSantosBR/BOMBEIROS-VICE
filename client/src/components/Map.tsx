/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: typeof google;
  }
}

// --------------------------------------------------
// Runtime base URL (robusto para Railway/Vercel/etc)
// --------------------------------------------------
const FORGE_BASE_URL = window.location.origin;

// ⚠️ NÃO permitir chave vazia
const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;

if (!API_KEY) {
  console.error("❌ VITE_FRONTEND_FORGE_API_KEY is not defined");
}

const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;

// --------------------------------------------------
// Google Maps loader (blindado)
// --------------------------------------------------
function loadMapScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // ✅ já carregado → não carregar de novo
      if (window.google?.maps) {
        resolve();
        return;
      }

      // 🚨 falha clara se não houver chave
      if (!API_KEY) {
        reject(new Error("Google Maps API key is missing"));
        return;
      }

      const existing = document.querySelector<HTMLScriptElement>(
        'script[data-google-maps="true"]'
      );

      // ✅ evita inserir duas vezes
      if (existing) {
        existing.addEventListener("load", () => resolve());
        return;
      }

      const script = document.createElement("script");
      script.src =
        `${MAPS_PROXY_URL}/maps/api/js` +
        `?key=${encodeURIComponent(API_KEY)}` +
        `&v=weekly&libraries=marker,places,geocoding,geometry`;

      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("data-google-maps", "true");

      script.onload = () => resolve();

      script.onerror = () => {
        reject(new Error("Failed to load Google Maps script"));
      };

      document.head.appendChild(script);
    } catch (err) {
      reject(err);
    }
  });
}

// --------------------------------------------------
// Props
// --------------------------------------------------
interface MapViewProps {
  className?: string;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

// --------------------------------------------------
// Component
// --------------------------------------------------
export function MapView({
  className,
  initialCenter = { lat: 37.7749, lng: -122.4194 },
  initialZoom = 12,
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  const init = usePersistFn(async () => {
    try {
      await loadMapScript();

      if (!mapContainer.current) {
        console.error("❌ Map container not found");
        return;
      }

      if (!window.google?.maps) {
        console.error("❌ Google Maps failed to initialize");
        return;
      }

      map.current = new window.google.maps.Map(mapContainer.current, {
        zoom: initialZoom,
        center: initialCenter,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: true,
        mapId: "DEMO_MAP_ID",
      });

      onMapReady?.(map.current);
    } catch (err) {
      console.error("❌ Map initialization failed:", err);
    }
  });

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div
      ref={mapContainer}
      className={cn("w-full h-[500px]", className)}
    />
  );
}
