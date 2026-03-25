import { Environment, Stars } from "@react-three/drei";
import { CarouselRing } from "./carousel-ring";

export function CarouselScene() {
  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 8, 25]} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#8b5cf6" />

      <Environment preset="city" />
      <Stars radius={50} depth={50} count={1000} factor={3} fade speed={1} />

      <CarouselRing />

      {/* Reflective ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
}
