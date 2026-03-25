interface TreeProps {
  position: [number, number, number];
  height?: number;
  crownColor?: string;
  trunkColor?: string;
}

export function Tree({
  position,
  height = 1.5,
  crownColor = "#4ade80",
  trunkColor = "#92400e",
}: TreeProps) {
  const trunkH = height * 0.35;
  const crownH = height * 0.65;
  return (
    <group position={position}>
      <mesh position={[0, trunkH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, trunkH, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, trunkH + crownH / 2, 0]} castShadow>
        <coneGeometry args={[height * 0.3, crownH, 8]} />
        <meshStandardMaterial color={crownColor} roughness={0.8} />
      </mesh>
    </group>
  );
}
