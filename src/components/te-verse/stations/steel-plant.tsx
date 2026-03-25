export function SteelPlantScene() {
  return (
    <group>
      {/* Main hall */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 2.5, 4]} />
        <meshStandardMaterial color="#6b7280" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Shed roof — two angled planes */}
      <mesh position={[0, 2.8, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[3.2, 0.1, 4.2]} />
        <meshStandardMaterial color="#78716c" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 2.8, 0]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[3.2, 0.1, 4.2]} />
        <meshStandardMaterial color="#78716c" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Corrugated wall effect — vertical strips */}
      {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x) => (
        <mesh key={x} position={[x, 1.25, 2.02]} castShadow>
          <boxGeometry args={[0.08, 2.2, 0.04]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.4} />
        </mesh>
      ))}

      {/* Loading dock — open side */}
      <mesh position={[3.3, 0.8, 0]} castShadow>
        <boxGeometry args={[0.8, 1.6, 3]} />
        <meshStandardMaterial color="#57534e" roughness={0.8} />
      </mesh>

      {/* Rail lines alongside */}
      {[-0.5, 0.5].map((z) => (
        <mesh key={z} position={[0, 0.03, 3 + z]} receiveShadow>
          <boxGeometry args={[10, 0.04, 0.06]} />
          <meshStandardMaterial color="#374151" metalness={0.7} />
        </mesh>
      ))}
      {/* Rail ties */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[-5 + i * 0.9, 0.02, 3]}>
          <boxGeometry args={[0.08, 0.03, 1.2]} />
          <meshStandardMaterial color="#78716c" roughness={0.9} />
        </mesh>
      ))}

      {/* Steel coils in yard */}
      {[
        [2, 0.2, -2.5],
        [3, 0.2, -2.5],
        [2.5, 0.2, -3.2],
        [1.5, 0.2, -3],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.25, 0.1, 8, 16]} />
          <meshStandardMaterial color="#78716c" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* Overhead crane (portal crane) */}
      {/* Vertical supports */}
      {[[-2.5, 0, -1.8], [2.5, 0, -1.8]].map(([x, _, z], i) => (
        <mesh key={i} position={[x, 2, z]} castShadow>
          <boxGeometry args={[0.2, 4, 0.2]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
      {/* Horizontal beam */}
      <mesh position={[0, 3.8, -1.8]} castShadow>
        <boxGeometry args={[5.2, 0.3, 0.3]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Trolley */}
      <mesh position={[1, 3.5, -1.8]} castShadow>
        <boxGeometry args={[0.6, 0.2, 0.4]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Concrete yard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.01, -2.5]} receiveShadow>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.9} />
      </mesh>
    </group>
  );
}
