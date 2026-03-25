export function PoliceVRTrainingScene() {
  return (
    <group>
      {/* VR headset on stand */}
      <group position={[0, 0, 0]}>
        {/* Stand pole */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.05, 1.2, 8]} />
          <meshStandardMaterial color="#374151" metalness={0.5} />
        </mesh>
        {/* Headset */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <boxGeometry args={[0.3, 0.15, 0.2]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 1.3, 0.11]}>
          <planeGeometry args={[0.25, 0.1]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Weapon rack */}
      <group position={[1.2, 0, 0.5]}>
        {/* Shelf */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.8, 0.06, 0.4]} />
          <meshStandardMaterial color="#78716c" metalness={0.3} />
        </mesh>
        {/* Legs */}
        {[-0.35, 0.35].map((x) => (
          <mesh key={x} position={[x, 0.4, 0]} castShadow>
            <boxGeometry args={[0.04, 0.8, 0.04]} />
            <meshStandardMaterial color="#78716c" metalness={0.3} />
          </mesh>
        ))}
        {/* 3D printed weapon replicas (L shapes) */}
        {[-0.2, 0.1].map((x, i) => (
          <group key={i} position={[x, 0.9, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.06, 0.06, 0.25]} />
              <meshStandardMaterial color="#d4d4d8" roughness={0.6} />
            </mesh>
            <mesh position={[0, -0.06, -0.08]} castShadow>
              <boxGeometry args={[0.04, 0.12, 0.04]} />
              <meshStandardMaterial color="#d4d4d8" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Training barriers */}
      {[-0.8, 0.8].map((z) => (
        <group key={z}>
          <mesh position={[-0.6, 0.4, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
          <mesh position={[0.6, 0.4, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
          {/* Tape */}
          <mesh position={[0, 0.7, z]}>
            <boxGeometry args={[1.2, 0.04, 0.01]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
