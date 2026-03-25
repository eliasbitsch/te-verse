import { Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { Box, Globe } from "lucide-react";
import type { Mesh, Group } from "three";

function FloatingShape({
  position,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed * 0.5;
    ref.current.rotation.y += delta * speed * 0.3;
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  const groupRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#06b6d4" />
      <Stars radius={30} depth={50} count={800} factor={3} fade speed={0.5} />
      <group ref={groupRef}>
        <FloatingShape position={[-3, 1, -2]} color="#8b5cf6" speed={0.8} />
        <FloatingShape position={[3, -1, -3]} color="#22c55e" speed={1.2} />
        <FloatingShape position={[0, 2, -4]} color="#f97316" speed={0.6} />
        <FloatingShape position={[-2, -2, -1]} color="#ec4899" speed={1} />
        <FloatingShape position={[2, 0, -5]} color="#06b6d4" speed={0.9} />
      </group>
    </>
  );
}

export function LandingPage() {
  return (
    <div className="relative h-full">
      {/* 3D Background */}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 60 }} className="!absolute inset-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-8 px-6 pointer-events-auto">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
            Portfolio Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Explore my Three.js projects in an interactive 3D experience.
            Choose your view.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/carousel"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-background/60 backdrop-blur-md hover:bg-background/80 border border-border transition-all hover:scale-105"
            >
              <Box className="w-6 h-6 text-purple-400" />
              <div className="text-left">
                <div className="font-semibold text-foreground">3D Carousel</div>
                <div className="text-sm text-muted-foreground">
                  Level-select style project browser
                </div>
              </div>
            </Link>
            <Link
              to="/te-verse"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-background/60 backdrop-blur-md hover:bg-background/80 border border-border transition-all hover:scale-105"
            >
              <Globe className="w-6 h-6 text-cyan-400" />
              <div className="text-left">
                <div className="font-semibold text-foreground">TE-Verse</div>
                <div className="text-sm text-muted-foreground">
                  Explore a 3D cartoon world
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
