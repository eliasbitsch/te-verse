import { Text, Billboard } from "@react-three/drei";
import { geoToMap } from "@/lib/geo";

interface MapLabelProps {
  position: [number, number, number];
  text: string;
  fontSize?: number;
  color?: string;
}

function MapLabel({ position, text, fontSize = 1.2, color = "#374151" }: MapLabelProps) {
  return (
    <Billboard position={position}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#ffffff"
      >
        {text}
      </Text>
    </Billboard>
  );
}

export function MapLabels() {
  const danubeVienna = geoToMap({ lat: 48.225, lng: 16.40 });
  const danubeLinz = geoToMap({ lat: 48.31, lng: 14.30 });
  const floridsdorf = geoToMap({ lat: 48.235, lng: 16.38 });
  const wieden = geoToMap({ lat: 48.19, lng: 16.36 });
  const seiLabel = geoToMap({ lat: 47.97, lng: 16.50 });
  const linzLabel = geoToMap({ lat: 48.32, lng: 14.29 });

  return (
    <group>
      <MapLabel position={[danubeVienna[0], 2, danubeVienna[2]]} text="Donau" fontSize={0.8} color="#2563eb" />
      <MapLabel position={[danubeLinz[0], 2, danubeLinz[2]]} text="Donau" fontSize={0.8} color="#2563eb" />
      <MapLabel position={[floridsdorf[0], 1, floridsdorf[2]]} text="Floridsdorf" fontSize={0.6} color="#6b7280" />
      <MapLabel position={[wieden[0], 1, wieden[2]]} text="Wieden" fontSize={0.6} color="#6b7280" />
      <MapLabel position={[seiLabel[0], 1, seiLabel[2]]} text="Seibersdorf" fontSize={0.6} color="#6b7280" />
      <MapLabel position={[linzLabel[0], 1, linzLabel[2]]} text="Linz" fontSize={0.8} color="#6b7280" />
    </group>
  );
}
