export function AITBuildingScene() {
  return (
    <group>
      {/* Main building */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 4, 3]} />
        <meshStandardMaterial color="#9ca3af" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Glass facade front */}
      <mesh position={[0, 2.5, 1.52]}>
        <planeGeometry args={[3.6, 3]} />
        <meshPhysicalMaterial
          color="#bfdbfe"
          transmission={0.4}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Window rows - side */}
      {[1, 2, 3].map((row) => (
        <mesh key={`w-${row}`} position={[2.02, row, 0]}>
          <planeGeometry args={[0.01, 0.6]} />
          <meshStandardMaterial color="#93c5fd" emissive="#93c5fd" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Entrance overhang */}
      <mesh position={[0, 0.8, 2]} castShadow>
        <boxGeometry args={[2, 0.15, 1.5]} />
        <meshStandardMaterial color="#6b7280" metalness={0.4} />
      </mesh>

      {/* Entrance columns */}
      {[-0.8, 0.8].map((x) => (
        <mesh key={x} position={[x, 0.4, 1.8]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.3} />
        </mesh>
      ))}

      {/* Rooftop equipment */}
      <mesh position={[1, 4.3, -0.5]} castShadow>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#6b7280" roughness={0.8} />
      </mesh>
      <mesh position={[-1.2, 4.2, 0.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.4, 8]} />
        <meshStandardMaterial color="#78716c" metalness={0.5} />
      </mesh>

      {/* AIT sign */}
      <mesh position={[0, 3.8, 1.53]}>
        <planeGeometry args={[1.5, 0.4]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
    </group>
  );
}
