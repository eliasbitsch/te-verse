import type React from "react";
import { CityBlock } from "./city-block";
import { Tree } from "./tree";

function generateTreeRing(
  count: number,
  radius: number,
  offset: [number, number] = [0, 0]
): [number, number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return [
      Math.cos(angle) * radius + offset[0] + (Math.sin(i * 7) * 0.8),
      0,
      Math.sin(angle) * radius + offset[1] + (Math.cos(i * 11) * 0.8),
    ] as [number, number, number];
  });
}

// AIT and VIL are only ~12 units apart (both in Vienna).
// CityBlocks must stay small and directional to avoid overlap.
function AITContext() {
  const trees = generateTreeRing(12, 8);
  return (
    <group>
      {/* Blocks away from VIL (north, east, west — VIL is roughly to the south) */}
      <CityBlock position={[10, 0, -6]} size={[5, 5]} buildingCount={6} maxHeight={3} style="urban" seed={101} />
      <CityBlock position={[-10, 0, -4]} size={[5, 5]} buildingCount={6} maxHeight={3.5} style="urban" seed={102} />
      <CityBlock position={[0, 0, -10]} size={[5, 5]} buildingCount={5} maxHeight={4} style="urban" seed={103} />
      <CityBlock position={[10, 0, 4]} size={[4, 4]} buildingCount={4} maxHeight={2.5} style="urban" seed={104} />

      {/* Parking lot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8, 0.07, -8]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#6b7280" roughness={0.9} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[6.5 + i * 0.6, 0.08, -8]}>
          <planeGeometry args={[0.04, 1.5]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
      ))}

      {trees.map((pos, i) => (
        <Tree key={i} position={pos} height={1 + (i % 3) * 0.3} />
      ))}
    </group>
  );
}

function VILContext() {
  const trees = generateTreeRing(8, 6);
  return (
    <group>
      {/* Blocks away from AIT (south, west — AIT is to the north) */}
      <CityBlock position={[-7, 0, 3]} size={[4, 4]} buildingCount={5} maxHeight={3} style="urban" seed={201} />
      <CityBlock position={[7, 0, 4]} size={[4, 4]} buildingCount={5} maxHeight={3.5} style="urban" seed={202} />
      <CityBlock position={[0, 0, 8]} size={[4, 4]} buildingCount={4} maxHeight={2.5} style="urban" seed={203} />

      {trees.map((pos, i) => (
        <Tree key={i} position={pos} height={1.2 + (i % 2) * 0.3} />
      ))}
    </group>
  );
}

function VoestalpineContext() {
  return (
    <group>
      <CityBlock position={[18, 0, -6]} size={[8, 8]} buildingCount={6} maxHeight={2.5} style="industrial" seed={301} />
      <CityBlock position={[-16, 0, 8]} size={[8, 8]} buildingCount={5} maxHeight={3} style="industrial" seed={302} />
      <CityBlock position={[0, 0, -18]} size={[8, 6]} buildingCount={4} maxHeight={2} style="industrial" seed={303} />

      {/* Concrete yard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.07, 12]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.9} />
      </mesh>

      {/* Rail lines */}
      {[-1, 0, 1].map((z) => (
        <group key={z}>
          {[-0.3, 0.3].map((offset) => (
            <mesh key={offset} position={[0, 0.08, 16 + z * 2.5 + offset]} receiveShadow>
              <boxGeometry args={[25, 0.04, 0.06]} />
              <meshStandardMaterial color="#374151" metalness={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      {generateTreeRing(6, 20).map((pos, i) => (
        <Tree key={i} position={pos} height={1.5} crownColor="#65a30d" />
      ))}
    </group>
  );
}

function SeibersdorfContext() {
  const trees = generateTreeRing(10, 12);
  return (
    <group>
      <CityBlock position={[10, 0, 0]} size={[5, 5]} buildingCount={4} maxHeight={2} style="suburban" seed={401} />
      <CityBlock position={[-10, 0, 4]} size={[5, 5]} buildingCount={3} maxHeight={1.5} style="suburban" seed={402} />

      {/* Fields */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8, 0.05, -10]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#86efac" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8, 0.05, -12]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#6ee7b7" roughness={0.95} />
      </mesh>

      {trees.map((pos, i) => (
        <Tree key={i} position={pos} height={1.2 + (i % 3) * 0.2} />
      ))}
    </group>
  );
}

const CONTEXT_MAP: Record<string, () => React.ReactNode> = {
  "ait-giefinggasse": () => <AITContext />,
  "vil-gusshausstrasse": () => <VILContext />,
  "voestalpine-linz": () => <VoestalpineContext />,
  "seibersdorf": () => <SeibersdorfContext />,
};

interface CityContextProps {
  locationId: string;
}

export function CityContext({ locationId }: CityContextProps) {
  const factory = CONTEXT_MAP[locationId];
  if (!factory) return null;
  return factory();
}
