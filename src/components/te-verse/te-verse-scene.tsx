import { locations } from "@/config/projects";
import { EnvironmentSetup } from "./world/environment-setup";
import { Ground } from "./world/ground";
import { OSMGround } from "./world/osm-ground";
import { RoadNetwork } from "./world/road-network";
import { DanubeRiver } from "./world/danube-river";
import { MapLabels } from "./world/map-labels";
import { LocationGroup } from "./world/location-group";
import { MapCameraController } from "./camera/map-camera-controller";
import { FlightArc } from "./camera/flight-arc";

// Shared Vienna tile centered between AIT (48.2225) and VIL (48.1983)
const VIENNA_CENTER = { lat: 48.21, lng: 16.377 };

export function TEVerseScene() {
  const voestalpine = locations.find((l) => l.id === "voestalpine-linz")!;
  const seibersdorf = locations.find((l) => l.id === "seibersdorf")!;

  return (
    <>
      <EnvironmentSetup />
      <Ground />

      {/* Vienna shared OSM tile — covers both AIT and VIL */}
      <OSMGround geo={VIENNA_CENTER} zoom={14} radius={5} />

      {/* voestalpine Linz OSM tile */}
      <OSMGround geo={voestalpine.geo} zoom={14} radius={4} />

      {/* Seibersdorf OSM tile */}
      <OSMGround geo={seibersdorf.geo} zoom={14} radius={3} />

      <RoadNetwork />
      <DanubeRiver />
      <MapLabels />
      <MapCameraController />
      <FlightArc />

      {locations.map((location) => (
        <LocationGroup key={location.id} location={location} />
      ))}
    </>
  );
}
