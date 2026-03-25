import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export function LoadingSpinner() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 2;
      ref.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}
