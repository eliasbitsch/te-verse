import { Text } from "@react-three/drei";

export function VILBuildingScene() {
  return (
    <group>
      {/* Main building */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 3, 2.5]} />
        <meshStandardMaterial color="#a8a29e" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Window rows */}
      {[0.8, 1.5, 2.2].map((y) =>
        [-1, -0.3, 0.4, 1.1].map((x) => (
          <mesh key={`${y}-${x}`} position={[x, y, 1.26]}>
            <planeGeometry args={[0.4, 0.35]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.3} />
          </mesh>
        ))
      )}

      {/* VIL text on facade */}
      <Text
        position={[0, 2.6, 1.27]}
        fontSize={0.35}
        color="#1e40af"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        VIL
      </Text>

      {/* Entrance */}
      <mesh position={[0, 0.5, 1.27]}>
        <planeGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="#44403c" roughness={0.8} />
      </mesh>

      {/* Courtyard in front */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 2.5]} receiveShadow>
        <planeGeometry args={[4, 2]} />
        <meshStandardMaterial color="#d6d3d1" roughness={0.85} />
      </mesh>

      {/* Bench */}
      <group position={[1.2, 0, 2.5]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.8, 0.04, 0.3]} />
          <meshStandardMaterial color="#92400e" roughness={0.8} />
        </mesh>
        {[-0.35, 0.35].map((x) => (
          <mesh key={x} position={[x, 0.12, 0]} castShadow>
            <boxGeometry args={[0.04, 0.24, 0.25]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
