import { Text } from "@react-three/drei";

export function StahlweltMuseumScene() {
  return (
    <group>
      {/* Main building — tall curved steel/glass structure */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 5, 3]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Glass facade front */}
      <mesh position={[0, 3, 1.52]}>
        <planeGeometry args={[3.6, 4]} />
        <meshPhysicalMaterial
          color="#bfdbfe"
          transmission={0.4}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Glass facade side */}
      <mesh position={[2.02, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.6, 4]} />
        <meshPhysicalMaterial
          color="#bfdbfe"
          transmission={0.3}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Steel cladding panels — horizontal strips */}
      {[1, 2, 3, 4].map((row) => (
        <mesh key={row} position={[-2.02, row + 0.5, 0]}>
          <planeGeometry args={[0.01, 0.3]} />
          <meshStandardMaterial color={row % 2 ? "#64748b" : "#94a3b8"} metalness={0.6} />
        </mesh>
      ))}

      {/* Projecting wing — 15m overhang */}
      <mesh position={[0, 4.5, 2.5]} castShadow>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Entrance plaza */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 2.5]} receiveShadow>
        <planeGeometry args={[5, 2.5]} />
        <meshStandardMaterial color="#d1d5db" roughness={0.85} />
      </mesh>

      {/* Interior glow visible through glass */}
      <mesh position={[0, 2, 1.2]}>
        <boxGeometry args={[3, 3, 0.5]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.15}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* voestalpine sign */}
      <Text
        position={[0, 4.8, 1.53]}
        fontSize={0.3}
        color="#1e3a5f"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        voestalpine
      </Text>

      {/* Entrance doors */}
      <mesh position={[0, 0.6, 1.53]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial color="#374151" roughness={0.6} />
      </mesh>
    </group>
  );
}
