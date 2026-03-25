import { geoToMap } from "@/lib/geo";

function RiverSegment({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const dx = end[0] - start[0];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);
  const cx = (start[0] + end[0]) / 2;
  const cz = (start[2] + end[2]) / 2;

  return (
    <group>
      {/* Bank */}
      <mesh position={[cx, 0.005, cz]} rotation={[-Math.PI / 2, 0, -angle]}>
        <planeGeometry args={[4, length]} />
        <meshStandardMaterial color="#8b7355" roughness={0.95} />
      </mesh>
      {/* Water */}
      <mesh position={[cx, 0.015, cz]} rotation={[-Math.PI / 2, 0, -angle]}>
        <planeGeometry args={[2.5, length]} />
        <meshStandardMaterial color="#60a5fa" roughness={0.3} metalness={0.1} transparent opacity={0.8} />
      </mesh>
      {/* Shimmer */}
      <mesh position={[cx, 0.025, cz]} rotation={[-Math.PI / 2, 0, -angle]}>
        <planeGeometry args={[1.8, length * 0.9]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.3} roughness={0.1} metalness={0.2} />
      </mesh>
    </group>
  );
}

export function DanubeRiver() {
  // Vienna section
  const viennaStart = geoToMap({ lat: 48.23, lng: 16.30 });
  const viennaEnd = geoToMap({ lat: 48.21, lng: 16.55 });

  // Linz section
  const linzStart = geoToMap({ lat: 48.31, lng: 14.20 });
  const linzEnd = geoToMap({ lat: 48.30, lng: 14.40 });

  return (
    <group>
      <RiverSegment start={viennaStart} end={viennaEnd} />
      <RiverSegment start={linzStart} end={linzEnd} />
    </group>
  );
}
