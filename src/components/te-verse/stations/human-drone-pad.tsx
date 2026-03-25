import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export function HumanDronePadScene() {
  const rotorsRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (rotorsRef.current) rotorsRef.current.rotation.y += delta * 8;
  });

  return (
    <group>
      {/* Large landing platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
        <circleGeometry args={[2.5, 32]} />
        <meshStandardMaterial color="#374151" roughness={0.85} />
      </mesh>
      {/* Platform markings - outer ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[2.2, 2.4, 32]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {/* H marking */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <planeGeometry args={[0.15, 1.2]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {[-0.35, 0.35].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, z]}>
          <planeGeometry args={[0.8, 0.15]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      ))}

      {/* Passenger drone - larger */}
      <group position={[0, 0.3, 0]}>
        {/* Fuselage */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <capsuleGeometry args={[0.4, 1, 8, 16]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Cabin windows */}
        <mesh position={[0, 0.8, 0.41]}>
          <planeGeometry args={[0.6, 0.25]} />
          <meshPhysicalMaterial color="#bfdbfe" transmission={0.3} roughness={0.1} transparent opacity={0.6} />
        </mesh>
        {/* 6 Arms + rotors */}
        <group ref={rotorsRef}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * 1.2;
            const z = Math.sin(angle) * 1.2;
            return (
              <group key={i}>
                <mesh position={[x / 2, 0.6, z / 2]} castShadow>
                  <boxGeometry args={[0.06, 0.04, 0.06]} />
                  <meshStandardMaterial color="#6b7280" />
                </mesh>
                <mesh position={[x, 0.7, z]}>
                  <cylinderGeometry args={[0.35, 0.35, 0.02, 12]} />
                  <meshStandardMaterial color="#94a3b8" transparent opacity={0.4} />
                </mesh>
              </group>
            );
          })}
        </group>
        {/* Landing skids */}
        {[-0.5, 0.5].map((x) => (
          <mesh key={x} position={[x, 0.05, 0]} castShadow>
            <boxGeometry args={[0.06, 0.06, 1.2]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        ))}
      </group>

      {/* Boarding stairs */}
      <group position={[1.5, 0, 0]}>
        {[0, 1, 2].map((step) => (
          <mesh key={step} position={[step * 0.25, step * 0.15 + 0.08, 0]} castShadow>
            <boxGeometry args={[0.25, 0.05, 0.5]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Safety barriers */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2.8, 0.4, Math.sin(angle) * 2.8]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
        );
      })}
    </group>
  );
}
