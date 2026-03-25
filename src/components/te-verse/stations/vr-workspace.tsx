function Desk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Desktop */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial color="#a16207" roughness={0.7} />
      </mesh>
      {/* Legs */}
      {[
        [-0.5, 0.35, -0.25],
        [0.5, 0.35, -0.25],
        [-0.5, 0.35, 0.25],
        [0.5, 0.35, 0.25],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.04, 0.7, 0.04]} />
          <meshStandardMaterial color="#78716c" metalness={0.3} />
        </mesh>
      ))}
      {/* Monitor */}
      <mesh position={[0, 1.1, -0.15]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.03]} />
        <meshStandardMaterial color="#1f2937" roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 1.1, -0.13]}>
        <planeGeometry args={[0.55, 0.35]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>
      {/* Monitor stand */}
      <mesh position={[0, 0.85, -0.15]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 0.15, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.4} />
      </mesh>
    </group>
  );
}

function SeatedFigure({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Chair */}
      <mesh position={[0, 0.35, 0.2]} castShadow>
        <boxGeometry args={[0.35, 0.04, 0.35]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* Chair back */}
      <mesh position={[0, 0.55, 0.37]} castShadow>
        <boxGeometry args={[0.35, 0.4, 0.04]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.6, 0.2]} castShadow>
        <capsuleGeometry args={[0.1, 0.25, 6, 8]} />
        <meshStandardMaterial color="#6366f1" roughness={0.6} />
      </mesh>
      {/* Head with VR headset */}
      <mesh position={[0, 0.95, 0.2]} castShadow>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </mesh>
      {/* VR headset */}
      <mesh position={[0, 0.95, 0.1]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.1]} />
        <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

export function VRWorkspaceScene() {
  return (
    <group>
      <Desk position={[-0.8, 0, 0]} />
      <Desk position={[0.8, 0, 0]} />
      <Desk position={[0, 0, -1.2]} />

      <SeatedFigure position={[-0.8, 0, 0]} />
      <SeatedFigure position={[0.8, 0, 0]} />
      <SeatedFigure position={[0, 0, -1.2]} />

      {/* Floor cables */}
      {[[-0.3, 0.01, -0.5], [0.3, 0.01, 0.3]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.03, 0.02, 1.5]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      ))}
    </group>
  );
}
