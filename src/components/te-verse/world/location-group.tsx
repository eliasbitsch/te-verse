import { useState } from "react";
import { Text, Billboard } from "@react-three/drei";
import type { Location } from "@/types/project";
import { useMapStore } from "@/hooks/use-map-store";
import { StationScene } from "./station-scene";
import { CityContext } from "./city-context";

interface LocationGroupProps {
  location: Location;
}

export function LocationGroup({ location }: LocationGroupProps) {
  const { focusLocation } = useMapStore();
  const [hovered, setHovered] = useState(false);

  // AIT has 12 stations spread over ~48 units, others are smaller
  const campusSize = location.stations.length > 5 ? 55 : 20;

  return (
    <group position={location.mapPosition}>
      {/* Invisible hit area for click detection (OSM tiles are the visual ground) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.04, 0]}
        onClick={(e) => {
          e.stopPropagation();
          focusLocation(location);
        }}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <planeGeometry args={[campusSize, campusSize]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      {/* Hover highlight ring */}
      {hovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
          <ringGeometry args={[campusSize / 2 - 0.5, campusSize / 2 + 0.5, 48]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={1}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Location name label */}
      <Billboard position={[0, 15, 0]}>
        <Text
          fontSize={2.5}
          color="#1f2937"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.08}
          outlineColor="#ffffff"
          fontWeight="bold"
        >
          {location.name}
        </Text>
      </Billboard>

      {/* Description subtitle */}
      <Billboard position={[0, 12, 0]}>
        <Text
          fontSize={1}
          color="#6b7280"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#ffffff"
        >
          {location.description}
        </Text>
      </Billboard>

      {/* City context (surrounding buildings, trees, etc.) */}
      <CityContext locationId={location.id} />

      {/* Render all stations */}
      {location.stations.map((station) => (
        <StationScene key={station.id} station={station} location={location} />
      ))}
    </group>
  );
}
