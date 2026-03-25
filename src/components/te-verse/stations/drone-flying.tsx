import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

function DroneRotor({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 20;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 12]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.6} metalness={0.3} />
      </mesh>
    </group>
  );
}

export function DroneFlyingScene() {
  const droneRef = useRef<Group>(null);
  useFrame((state) => {
    if (droneRef.current) {
      droneRef.current.position.y = 1.8 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Drone */}
      <group ref={droneRef} position={[0, 1.8, 0]}>
        {/* Body */}
        <mesh castShadow>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Arms + Rotors */}
        {[
          [0.4, 0, 0.4],
          [-0.4, 0, 0.4],
          [0.4, 0, -0.4],
          [-0.4, 0, -0.4],
        ].map(([x, _y, z], i) => (
          <group key={i}>
            {/* Arm */}
            <mesh position={[x / 2, 0, z / 2]} castShadow>
              <boxGeometry args={[Math.abs(x) > 0.3 ? 0.5 : 0.04, 0.03, Math.abs(z) > 0.3 ? 0.5 : 0.04]} />
              <meshStandardMaterial color="#374151" />
            </mesh>
            <DroneRotor position={[x, 0.05, z]} />
          </group>
        ))}
        {/* Camera */}
        <mesh position={[0, -0.15, 0.1]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Landing pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <circleGeometry args={[1, 24]} />
        <meshStandardMaterial color="#4b5563" roughness={0.9} />
      </mesh>
      {/* H marking */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <planeGeometry args={[0.08, 0.6]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      {[-0.2, 0.2].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, z]}>
          <planeGeometry args={[0.4, 0.08]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      ))}

      {/* Safety poles */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.3, 0.4, Math.sin(angle) * 1.3]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
        );
      })}
    </group>
  );
}
