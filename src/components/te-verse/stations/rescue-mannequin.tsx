export function RescueMannequinScene() {
  return (
    <group>
      {/* Green mannequin - lying down */}
      <group position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        {/* Body */}
        <mesh castShadow>
          <capsuleGeometry args={[0.15, 0.5, 8, 12]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
        {/* Arms */}
        {[-0.18, 0.18].map((z) => (
          <mesh key={z} position={[0, 0.1, z]} castShadow>
            <capsuleGeometry args={[0.05, 0.3, 6, 8]} />
            <meshStandardMaterial color="#22c55e" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Stretcher */}
      <group position={[1.2, 0, 0]}>
        {/* Platform */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[1.2, 0.04, 0.5]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.7} />
        </mesh>
        {/* Handles */}
        {[-0.65, 0.65].map((x) => (
          <mesh key={x} position={[x, 0.25, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.5} />
          </mesh>
        ))}
        {/* Legs */}
        {[
          [-0.4, 0.12, -0.2],
          [-0.4, 0.12, 0.2],
          [0.4, 0.12, -0.2],
          [0.4, 0.12, 0.2],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.24, 6]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* First aid box */}
      <group position={[-1, 0, 0.5]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.3, 0.25, 0.2]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        {/* White cross */}
        <mesh position={[0, 0.15, 0.105]}>
          <planeGeometry args={[0.06, 0.15]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.15, 0.105]}>
          <planeGeometry args={[0.15, 0.06]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}
