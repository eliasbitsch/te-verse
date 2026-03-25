export function TimberCraneScene() {
  return (
    <group>
      {/* Truck cab */}
      <mesh position={[-1.5, 0.7, 0]} castShadow>
        <boxGeometry args={[1.2, 1.2, 1.4]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.5} />
      </mesh>
      {/* Cab windshield */}
      <mesh position={[-0.89, 0.9, 0]}>
        <planeGeometry args={[0.01, 0.6]} />
        <meshPhysicalMaterial color="#bfdbfe" transmission={0.3} transparent opacity={0.5} />
      </mesh>

      {/* Flatbed */}
      <mesh position={[0.8, 0.35, 0]} castShadow>
        <boxGeometry args={[3.2, 0.12, 1.6]} />
        <meshStandardMaterial color="#78716c" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* Crane base */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.5, 12]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Crane arm segment 1 */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.15, 1.5, 0.15]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>
      {/* Crane arm segment 2 - angled */}
      <mesh position={[0.6, 2.2, 0]} rotation={[0, 0, -0.8]} castShadow>
        <boxGeometry args={[0.12, 1.2, 0.12]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>
      {/* Crane arm segment 3 */}
      <mesh position={[1.3, 2.0, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#ea580c" roughness={0.5} />
      </mesh>

      {/* Timber logs on flatbed */}
      {[
        [0.5, 0.5, -0.3],
        [0.5, 0.5, 0],
        [0.5, 0.5, 0.3],
        [1.2, 0.5, -0.15],
        [1.2, 0.5, 0.15],
        [0.85, 0.7, 0],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 1.4, 8]} />
          <meshStandardMaterial color="#92400e" roughness={0.9} />
        </mesh>
      ))}

      {/* Wheels */}
      {[
        [-1.5, 0.15, -0.75],
        [-1.5, 0.15, 0.75],
        [-0.5, 0.15, -0.75],
        [-0.5, 0.15, 0.75],
        [1.5, 0.15, -0.75],
        [1.5, 0.15, 0.75],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.12, 12]} />
          <meshStandardMaterial color="#1f2937" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}
