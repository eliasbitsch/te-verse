import { useMapStore } from "@/hooks/use-map-store";
import { locations } from "@/config/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, MapPin } from "lucide-react";

export function MapOverlayControls() {
  const { zoomLevel, focusedLocation, focusedStation, transitionState, focusLocation, resetView } =
    useMapStore();
  const isFlying = transitionState !== "idle";

  return (
    <>
      {/* Top bar with navigation */}
      <div className="absolute top-16 left-4 z-10 flex flex-col gap-2">
        {/* Back / Reset */}
        {zoomLevel !== "overview" && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetView}
            className="bg-background/80 backdrop-blur-sm gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Overview
          </Button>
        )}

        {/* Current focus info */}
        {focusedLocation && (
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
            <div className="font-semibold text-sm text-foreground">
              {focusedLocation.name}
            </div>
            {focusedStation && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {focusedStation.name}
              </div>
            )}
            {focusedLocation.stations.length > 1 && !focusedStation && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {focusedLocation.stations.length} stations
              </div>
            )}
          </div>
        )}
      </div>

      {/* Location quick-nav */}
      <div className="absolute top-16 right-4 z-10 flex flex-col gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={resetView}
          className="bg-background/80 backdrop-blur-sm"
          title="Reset view"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        {locations.map((loc) => (
          <Button
            key={loc.id}
            variant={focusedLocation?.id === loc.id ? "default" : "outline"}
            size="sm"
            onClick={() => focusLocation(loc)}
            className="bg-background/80 backdrop-blur-sm gap-1.5 justify-start"
          >
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{loc.name.split(" ")[0]}</span>
            <Badge variant="secondary" className="text-[10px] px-1 py-0">
              {loc.stations.length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Flight indicator */}
      {isFlying && focusedLocation && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-foreground bg-background/80 backdrop-blur-md px-6 py-3 rounded-xl border border-border shadow-lg">
          <div className="text-sm font-medium animate-pulse">
            Flying to {focusedLocation.name}...
          </div>
        </div>
      )}

      {/* Controls hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-sm text-muted-foreground bg-background/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
        Scroll to zoom · Drag to pan · Right-drag to rotate · Click a station
      </div>
    </>
  );
}
