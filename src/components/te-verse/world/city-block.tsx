import { useMemo } from "react";

type CityStyle = "urban" | "industrial" | "suburban";

const PALETTES: Record<CityStyle, string[]> = {
  urban: ["#9ca3af", "#d6d3d1", "#bfdbfe", "#e5e7eb", "#a8a29e"],
  industrial: ["#4b5563", "#78716c", "#6b7280", "#57534e", "#374151"],
  suburban: ["#fafaf9", "#e7e5e4", "#fef3c7", "#d6d3d1", "#f5f5f4"],
};

// Simple seeded pseudo-random
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface CityBlockProps {
  position: [number, number, number];
  size?: [number, number];
  buildingCount?: number;
  maxHeight?: number;
  style?: CityStyle;
  seed?: number;
}

export function CityBlock({
  position,
  size = [6, 6],
  buildingCount = 8,
  maxHeight = 3,
  style = "urban",
  seed = 42,
}: CityBlockProps) {
  const palette = PALETTES[style];

  const buildings = useMemo(() => {
    const r = seededRandom(seed);
    const result = [];
    const cols = Math.ceil(Math.sqrt(buildingCount));
    const cellW = size[0] / cols;
    const cellD = size[1] / cols;

    for (let i = 0; i < buildingCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const w = cellW * (0.5 + r() * 0.4);
      const d = cellD * (0.5 + r() * 0.4);
      const h = 0.5 + r() * (maxHeight - 0.5);
      const color = palette[Math.floor(r() * palette.length)];
      const x = -size[0] / 2 + col * cellW + cellW / 2 + (r() - 0.5) * 0.3;
      const z = -size[1] / 2 + row * cellD + cellD / 2 + (r() - 0.5) * 0.3;

      result.push({ x, z, w, d, h, color, hasRoof: r() > 0.6 });
    }
    return result;
  }, [seed, buildingCount, size, maxHeight, palette]);

  return (
    <group position={position}>
      {buildings.map((b, i) => (
        <group key={i}>
          {/* Building body */}
          <mesh position={[b.x, b.h / 2, b.z]} castShadow receiveShadow>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial color={b.color} roughness={0.75} />
          </mesh>
          {/* Roof detail */}
          {b.hasRoof && (
            <mesh position={[b.x, b.h + 0.08, b.z]} castShadow>
              <boxGeometry args={[b.w * 0.6, 0.15, b.d * 0.6]} />
              <meshStandardMaterial color="#6b7280" roughness={0.7} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
