export function SteelCoilCraneScene() {
  return (
    <group>
      {/* Tower base */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.5, 0.6, 1.5]} />
        <meshStandardMaterial color="#6b7280" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Tower pillar */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[0.5, 7, 0.5]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Lattice details on tower */}
      {[2, 3.5, 5, 6.5].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <boxGeometry args={[0.6, 0.08, 0.6]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
      ))}

      {/* Horizontal jib */}
      <mesh position={[2.5, 7.3, 0]} castShadow>
        <boxGeometry args={[5, 0.25, 0.25]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Counter-jib */}
      <mesh position={[-1.5, 7.3, 0]} castShadow>
        <boxGeometry args={[2, 0.2, 0.2]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Counterweight */}
      <mesh position={[-2.3, 7, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.5]} />
        <meshStandardMaterial color="#374151" roughness={0.8} />
      </mesh>

      {/* Cable */}
      <mesh position={[3.5, 5.5, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 3.6, 4]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Hook */}
      <mesh position={[3.5, 3.8, 0]} castShadow>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.6} />
      </mesh>

      {/* Steel coil (torus) */}
      <mesh position={[3.5, 3.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.5, 0.2, 12, 24]} />
        <meshStandardMaterial
          color="#78716c"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Another coil on ground */}
      <mesh position={[1.5, 0.2, 1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.5, 0.2, 12, 24]} />
        <meshStandardMaterial color="#78716c" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}
