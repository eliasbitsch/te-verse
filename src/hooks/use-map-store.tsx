import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Station, Location } from "@/types/project";

type ZoomLevel = "overview" | "location" | "station";
type TransitionState = "idle" | "zooming-out" | "flying" | "zooming-in";

interface MapStoreContext {
  focusedLocation: Location | null;
  focusedStation: Station | null;
  previousLocation: Location | null;
  zoomLevel: ZoomLevel;
  transitionState: TransitionState;
  focusLocation: (location: Location) => void;
  focusStation: (station: Station, location: Location) => void;
  resetView: () => void;
  setTransitionState: (state: TransitionState) => void;
}

const MapStoreCtx = createContext<MapStoreContext | null>(null);

export function MapStoreProvider({ children }: { children: ReactNode }) {
  const [focusedLocation, setFocusedLocation] = useState<Location | null>(null);
  const [focusedStation, setFocusedStation] = useState<Station | null>(null);
  const [previousLocation, setPreviousLocation] = useState<Location | null>(null);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("overview");
  const [transitionState, setTransitionState] = useState<TransitionState>("idle");

  const focusLocation = useCallback((location: Location) => {
    setFocusedLocation((prev) => {
      // Cross-location transition → trigger rocket zoom
      if (prev && prev.id !== location.id) {
        setPreviousLocation(prev);
        setTransitionState("zooming-out");
      }
      return location;
    });
    setFocusedStation(null);
    setZoomLevel("location");
  }, []);

  const focusStation = useCallback((station: Station, location: Location) => {
    setFocusedLocation(location);
    setFocusedStation(station);
    setZoomLevel("station");
  }, []);

  const resetView = useCallback(() => {
    setFocusedLocation(null);
    setFocusedStation(null);
    setPreviousLocation(null);
    setZoomLevel("overview");
    setTransitionState("idle");
  }, []);

  return (
    <MapStoreCtx.Provider
      value={{
        focusedLocation,
        focusedStation,
        previousLocation,
        zoomLevel,
        transitionState,
        focusLocation,
        focusStation,
        resetView,
        setTransitionState,
      }}
    >
      {children}
    </MapStoreCtx.Provider>
  );
}

export function useMapStore() {
  const ctx = useContext(MapStoreCtx);
  if (!ctx) throw new Error("useMapStore must be used within MapStoreProvider");
  return ctx;
}
