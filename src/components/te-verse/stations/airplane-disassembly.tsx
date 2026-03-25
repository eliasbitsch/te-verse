export function AirplaneDisassemblyScene() {
  return (
    <group>
      {/* Fuselage */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 4, 16]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Cockpit window */}
      <mesh position={[2, 1, 0]}>
        <sphereGeometry args={[0.55, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#93c5fd" transmission={0.3} transparent opacity={0.5} />
      </mesh>

      {/* Attached wing (left) */}
      <mesh position={[0, 0.8, -1.5]} castShadow>
        <boxGeometry args={[2, 0.08, 2.5]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Detached wing (right, on ground) */}
      <mesh position={[1, 0.1, 2]} rotation={[0.1, 0.3, 0]} castShadow>
        <boxGeometry args={[2, 0.08, 2.5]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Tail - vertical stabilizer */}
      <mesh position={[-2, 1.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.06]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Tail - horizontal stabilizer */}
      <mesh position={[-2, 1.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.06, 1.5]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Engine (detached, on ground) */}
      <mesh position={[0.5, 0.3, 2.5]} rotation={[0, 0.2, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.8, 12]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Scaffolding frame */}
      <group position={[0, 0, -0.8]}>
        {/* Vertical poles */}
        {[
          [-1.2, 1.2, 0],
          [1.2, 1.2, 0],
          [-1.2, 1.2, -0.6],
          [1.2, 1.2, -0.6],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 2.4, 6]} />
            <meshStandardMaterial color="#78716c" metalness={0.5} />
          </mesh>
        ))}
        {/* Horizontal bars */}
        {[0.8, 1.6, 2.3].map((y) => (
          <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 2.4, 6]} />
            <meshStandardMaterial color="#78716c" metalness={0.5} />
          </mesh>
        ))}
        {/* Platform */}
        <mesh position={[0, 1.6, -0.3]} castShadow>
          <boxGeometry args={[2.4, 0.04, 0.6]} />
          <meshStandardMaterial color="#a16207" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
