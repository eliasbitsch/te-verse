export function FlexiStylusScene() {
  return (
    <group>
      {/* Robot arm base */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.35, 0.3, 16]} />
        <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Base joint */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#6b7280" metalness={0.6} />
      </mesh>

      {/* Lower arm */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#f97316" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Elbow joint */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#6b7280" metalness={0.6} />
      </mesh>

      {/* Upper arm - angled */}
      <mesh position={[0.25, 1.4, 0]} rotation={[0, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.6, 8]} />
        <meshStandardMaterial color="#f97316" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Wrist joint */}
      <mesh position={[0.45, 1.55, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#6b7280" metalness={0.6} />
      </mesh>

      {/* End effector / stylus tip */}
      <mesh position={[0.55, 1.45, 0]} rotation={[0, 0, 0.5]} castShadow>
        <coneGeometry args={[0.03, 0.2, 8]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.5} />
      </mesh>

      {/* Work table */}
      <mesh position={[0.8, 0.4, 0]} castShadow>
        <boxGeometry args={[0.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#78716c" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Table legs */}
      {[
        [0.5, 0.2, -0.3],
        [1.1, 0.2, -0.3],
        [0.5, 0.2, 0.3],
        [1.1, 0.2, 0.3],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
          <meshStandardMaterial color="#6b7280" metalness={0.4} />
        </mesh>
      ))}

      {/* Casting part on table */}
      <mesh position={[0.75, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.15]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Human figure with stylus controller */}
      <group position={[-0.8, 0, 0.5]}>
        {/* Body */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.4, 8, 12]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.6} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.05, 0]} castShadow>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.6} />
        </mesh>
        {/* Arm holding stylus */}
        <mesh position={[0.15, 0.7, -0.1]} rotation={[0.5, 0, 0.3]} castShadow>
          <capsuleGeometry args={[0.04, 0.25, 6, 8]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.6} />
        </mesh>
        {/* Stylus controller in hand */}
        <mesh position={[0.25, 0.65, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.015, 0.15, 6]} />
          <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
