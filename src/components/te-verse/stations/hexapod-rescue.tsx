export function HexapodRescueScene() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1.2, 0.3, 0.8]} />
        <meshStandardMaterial color="#dc2626" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* 6 Legs - 3 per side */}
      {[-1, 0, 1].map((z) =>
        [-1, 1].map((side) => (
          <group key={`${z}-${side}`} position={[side * 0.6, 0, z * 0.3]}>
            {/* Upper leg */}
            <mesh position={[side * 0.2, 0.45, 0]} rotation={[0, 0, side * 0.4]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
              <meshStandardMaterial color="#374151" metalness={0.5} />
            </mesh>
            {/* Lower leg */}
            <mesh position={[side * 0.35, 0.2, 0]} rotation={[0, 0, -side * 0.5]} castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
              <meshStandardMaterial color="#374151" metalness={0.5} />
            </mesh>
            {/* Joint */}
            <mesh position={[side * 0.3, 0.35, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#6b7280" metalness={0.6} />
            </mesh>
          </group>
        ))
      )}

      {/* Sensor head */}
      <mesh position={[0.7, 0.75, 0]} castShadow>
        <boxGeometry args={[0.2, 0.15, 0.2]} />
        <meshStandardMaterial color="#1f2937" roughness={0.4} />
      </mesh>
      {/* Camera lens */}
      <mesh position={[0.82, 0.75, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.05, 8]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>

      {/* Rubble pile nearby */}
      <group position={[-1.5, 0, 0.5]}>
        {[
          [0, 0.15, 0, 0.5, 0.3, 0.4],
          [0.3, 0.1, -0.2, 0.3, 0.2, 0.35],
          [-0.2, 0.2, 0.15, 0.4, 0.4, 0.3],
          [0.1, 0.35, 0, 0.25, 0.15, 0.2],
        ].map(([x, y, z, w, h, d], i) => (
          <mesh key={i} position={[x, y, z]} rotation={[0.1 * i, 0.3 * i, 0]} castShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color={i % 2 ? "#9ca3af" : "#78716c"} roughness={0.95} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
