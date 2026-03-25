export function BlastFurnacesScene() {
  return (
    <group>
      {/* Main furnace 1 — tall cylinder */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.8, 5, 16]} />
        <meshStandardMaterial color="#78716c" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Main furnace 2 */}
      <mesh position={[2, 2, 0.5]} castShadow>
        <cylinderGeometry args={[0.6, 0.7, 4, 16]} />
        <meshStandardMaterial color="#57534e" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Main furnace 3 — shorter */}
      <mesh position={[-1.5, 1.5, -0.5]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 3, 16]} />
        <meshStandardMaterial color="#6b7280" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Glowing openings at top */}
      {[[0, 5, 0], [2, 4, 0.5], [-1.5, 3, -0.5]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}

      {/* Scaffolding around furnace 1 */}
      {[0, 1.5, 3, 4.2].map((y) => (
        <group key={y}>
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.95, y, 0]} castShadow>
              <boxGeometry args={[0.04, 0.04, 1.8]} />
              <meshStandardMaterial color="#6b7280" metalness={0.5} />
            </mesh>
          ))}
          <mesh position={[0, y, 0.9]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[0.04, 0.04, 1.9]} />
            <meshStandardMaterial color="#6b7280" metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Vertical scaffolding poles */}
      {[[-0.95, 0, 0.9], [0.95, 0, 0.9], [-0.95, 0, -0.9], [0.95, 0, -0.9]].map(([x, _, z], i) => (
        <mesh key={i} position={[x, 2.5, z]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 5, 6]} />
          <meshStandardMaterial color="#6b7280" metalness={0.5} />
        </mesh>
      ))}

      {/* Connecting pipes */}
      <mesh position={[1, 2, 0.25]} rotation={[0, 0.25, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 2.2, 8]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[-0.75, 1.5, -0.25]} rotation={[0, -0.3, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.8, 8]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Cooling tower */}
      <mesh position={[-3, 1, 1]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 2, 12]} />
        <meshStandardMaterial color="#d6d3d1" roughness={0.8} />
      </mesh>
      {/* Steam */}
      <mesh position={[-3, 2.5, 1]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      {/* Base platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color="#57534e" roughness={0.9} />
      </mesh>
    </group>
  );
}
