export function CrawlerRobotScene() {
  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.4, 0.4, 0.9]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Top armor plate */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <boxGeometry args={[1.2, 0.08, 0.8]} />
        <meshStandardMaterial color="#b45309" roughness={0.5} />
      </mesh>

      {/* Track left */}
      <group position={[0, 0.15, -0.55]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.25, 0.15]} />
          <meshStandardMaterial color="#1f2937" roughness={0.95} />
        </mesh>
        {/* Track wheels */}
        {[-0.5, 0, 0.5].map((x) => (
          <mesh key={x} position={[x, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 8]} />
            <meshStandardMaterial color="#374151" metalness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Track right */}
      <group position={[0, 0.15, 0.55]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.25, 0.15]} />
          <meshStandardMaterial color="#1f2937" roughness={0.95} />
        </mesh>
        {[-0.5, 0, 0.5].map((x) => (
          <mesh key={x} position={[x, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 8]} />
            <meshStandardMaterial color="#374151" metalness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Sensor mast */}
      <mesh position={[0.4, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
        <meshStandardMaterial color="#374151" metalness={0.5} />
      </mesh>
      {/* Camera head */}
      <mesh position={[0.4, 1.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.12]} />
        <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Camera lens */}
      <mesh position={[0.48, 1.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.03, 8]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>

      {/* Antenna */}
      <mesh position={[-0.3, 0.9, 0.2]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      <mesh position={[-0.3, 1.15, 0.2]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>

      {/* Rough terrain bumps */}
      {[
        [-1.2, 0.05, 0.3],
        [1.0, 0.08, -0.4],
        [-0.8, 0.06, -0.7],
        [0.6, 0.04, 0.8],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.08 + i * 0.02, 6, 6]} />
          <meshStandardMaterial color="#78716c" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}
