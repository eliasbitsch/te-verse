export function RobotForkliftScene() {
  return (
    <group>
      {/* Forklift body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.2, 0.8, 0.9]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.5} />
      </mesh>

      {/* Cab/roof */}
      <mesh position={[0, 1.1, -0.1]} castShadow>
        <boxGeometry args={[1.0, 0.5, 0.7]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} />
      </mesh>

      {/* Mast */}
      <mesh position={[0, 1.2, 0.5]} castShadow>
        <boxGeometry args={[0.8, 1.6, 0.08]} />
        <meshStandardMaterial color="#374151" metalness={0.6} />
      </mesh>

      {/* Fork tines */}
      {[-0.25, 0.25].map((x) => (
        <mesh key={x} position={[x, 0.15, 0.9]} castShadow>
          <boxGeometry args={[0.12, 0.06, 0.8]} />
          <meshStandardMaterial color="#374151" metalness={0.6} />
        </mesh>
      ))}

      {/* Wheels */}
      {[
        [-0.5, 0.12, -0.4],
        [0.5, 0.12, -0.4],
        [-0.4, 0.12, 0.35],
        [0.4, 0.12, 0.35],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </mesh>
      ))}

      {/* Pallet with boxes */}
      <mesh position={[0, 0.4, 1.1]} castShadow>
        <boxGeometry args={[0.8, 0.08, 0.6]} />
        <meshStandardMaterial color="#a16207" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.7, 1.1]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.4]} />
        <meshStandardMaterial color="#854d0e" roughness={0.7} />
      </mesh>

      {/* Sensor antenna */}
      <mesh position={[0, 1.6, -0.2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      <mesh position={[0, 1.85, -0.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
