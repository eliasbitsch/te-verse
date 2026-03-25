export function MilitaryTrainingScene() {
  return (
    <group>
      {/* Training ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#78716c" roughness={0.95} />
      </mesh>

      {/* Hurdle bars */}
      {[-1, 0, 1].map((z) => (
        <group key={z} position={[0, 0, z * 1.2]}>
          {/* Poles */}
          {[-0.6, 0.6].map((x) => (
            <mesh key={x} position={[x, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 1, 8]} />
              <meshStandardMaterial color="#78716c" metalness={0.4} />
            </mesh>
          ))}
          {/* Bar */}
          <mesh position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
            <meshStandardMaterial color="#a16207" />
          </mesh>
        </group>
      ))}

      {/* Sandbag wall */}
      <group position={[-1.5, 0, 0]}>
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <mesh
              key={`${row}-${col}`}
              position={[0, 0.15 + row * 0.25, col * 0.35 - 0.17]}
              castShadow
            >
              <boxGeometry args={[0.6, 0.2, 0.3]} />
              <meshStandardMaterial color="#a3977a" roughness={0.95} />
            </mesh>
          ))
        )}
      </group>

      {/* Camouflage tent */}
      <mesh position={[1.5, 0.7, -1]} castShadow>
        <coneGeometry args={[0.8, 1.4, 4]} />
        <meshStandardMaterial color="#4d7c0f" roughness={0.8} />
      </mesh>
      {/* Tent pole */}
      <mesh position={[1.5, 0, -1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.1, 6]} />
        <meshStandardMaterial color="#713f12" />
      </mesh>
    </group>
  );
}
