import { locations } from "@/config/projects";

function RoadSegment({
  from,
  to,
  width = 1.5,
}: {
  from: [number, number];
  to: [number, number];
  width?: number;
}) {
  const dx = to[0] - from[0];
  const dz = to[1] - from[1];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);
  const cx = (from[0] + to[0]) / 2;
  const cz = (from[1] + to[1]) / 2;

  const dashCount = Math.max(1, Math.floor(length / 3));

  return (
    <group>
      <mesh position={[cx, 0.01, cz]} rotation={[0, angle, 0]} receiveShadow>
        <boxGeometry args={[width, 0.06, length]} />
        <meshStandardMaterial color="#4b5563" roughness={0.95} />
      </mesh>
      {Array.from({ length: dashCount }, (_, i) => {
        const t = (i * 3 + 1.5) / length;
        if (t > 1) return null;
        const px = from[0] + dx * t;
        const pz = from[1] + dz * t;
        return (
          <mesh key={i} position={[px, 0.05, pz]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.1, 0.02, 1]} />
            <meshStandardMaterial color="#e5e7eb" />
          </mesh>
        );
      })}
    </group>
  );
}

function TrafficLight({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 3, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.5} />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      {[
        { y: 3.0, color: "#ef4444", intensity: 0.8 },
        { y: 2.8, color: "#eab308", intensity: 0.3 },
        { y: 2.6, color: "#22c55e", intensity: 0.3 },
      ].map(({ y, color, intensity }) => (
        <mesh key={y} position={[0, y, 0.11]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} />
        </mesh>
      ))}
    </group>
  );
}

function StreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 4, 8]} />
        <meshStandardMaterial color="#6b7280" metalness={0.6} />
      </mesh>
      <mesh position={[0.4, 3.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
        <meshStandardMaterial color="#6b7280" metalness={0.6} />
      </mesh>
      <mesh position={[0.7, 3.9, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#fef3c7" emissive="#fde68a" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function ZebraCrossing({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, 0.03, (i - 2.5) * 0.35]} receiveShadow>
          <boxGeometry args={[2, 0.02, 0.2]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
      ))}
    </group>
  );
}

function interpolateLamps(
  from: [number, number],
  to: [number, number],
  count: number,
  offset = 1.5
): [number, number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const t = (i + 1) / (count + 1);
    return [
      from[0] + (to[0] - from[0]) * t + offset,
      0,
      from[1] + (to[1] - from[1]) * t,
    ] as [number, number, number];
  });
}

export function RoadNetwork() {
  const ait = locations.find((l) => l.id === "ait-giefinggasse")!;
  const vil = locations.find((l) => l.id === "vil-gusshausstrasse")!;
  const seibersdorf = locations.find((l) => l.id === "seibersdorf")!;
  const voest = locations.find((l) => l.id === "voestalpine-linz")!;

  const pos = (loc: typeof ait): [number, number] => [loc.mapPosition[0], loc.mapPosition[2]];

  const aitP = pos(ait);
  const vilP = pos(vil);
  const seiP = pos(seibersdorf);
  const voestP = pos(voest);

  // A1 motorway waypoints: Linz → midpoint → Vienna (gentle curve)
  const mid1: [number, number] = [
    voestP[0] + (aitP[0] - voestP[0]) * 0.33,
    voestP[1] + (aitP[1] - voestP[1]) * 0.33 - 3,
  ];
  const mid2: [number, number] = [
    voestP[0] + (aitP[0] - voestP[0]) * 0.66,
    voestP[1] + (aitP[1] - voestP[1]) * 0.66 + 2,
  ];

  // Midpoint for Vienna→Seibersdorf
  const midSei: [number, number] = [
    (aitP[0] + seiP[0]) / 2,
    (aitP[1] + seiP[1]) / 2,
  ];

  return (
    <group>
      {/* A1: Linz → Vienna (via waypoints) */}
      <RoadSegment from={voestP} to={mid1} width={2} />
      <RoadSegment from={mid1} to={mid2} width={2} />
      <RoadSegment from={mid2} to={aitP} width={2} />

      {/* AIT ↔ VIL (inner Vienna) */}
      <RoadSegment from={aitP} to={vilP} />

      {/* Vienna → Seibersdorf */}
      <RoadSegment from={aitP} to={midSei} />
      <RoadSegment from={midSei} to={seiP} />

      {/* Zebra crossings */}
      <ZebraCrossing position={[ait.mapPosition[0] + 1, 0, ait.mapPosition[2]]} rotation={0.5} />
      <ZebraCrossing position={[vil.mapPosition[0] + 1, 0, vil.mapPosition[2]]} rotation={-0.3} />
      <ZebraCrossing position={[voest.mapPosition[0] + 1, 0, voest.mapPosition[2]]} rotation={0.2} />

      {/* Traffic lights */}
      <TrafficLight position={[ait.mapPosition[0] - 1, 0, ait.mapPosition[2] - 1]} />
      <TrafficLight position={[vil.mapPosition[0] - 1, 0, vil.mapPosition[2] + 1]} />
      <TrafficLight position={[voest.mapPosition[0] - 1, 0, voest.mapPosition[2] - 1]} />

      {/* Street lamps along A1 */}
      {interpolateLamps(voestP, aitP, 6, 2).map((p, i) => (
        <StreetLamp key={`a1-${i}`} position={p} />
      ))}
      {/* Street lamps AIT↔VIL */}
      {interpolateLamps(aitP, vilP, 2).map((p, i) => (
        <StreetLamp key={`av-${i}`} position={p} />
      ))}
      {/* Street lamps Vienna→Seibersdorf */}
      {interpolateLamps(aitP, seiP, 3).map((p, i) => (
        <StreetLamp key={`as-${i}`} position={p} />
      ))}
    </group>
  );
}
