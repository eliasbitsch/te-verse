import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { projects } from "@/config/projects";
import { useCarouselRotation } from "@/hooks/use-carousel-rotation";
import { CarouselCard } from "./carousel-card";

export function CarouselRing() {
  const groupRef = useRef<Group>(null);
  const { activeIndex, targetRotation } = useCarouselRotation();
  const total = projects.length;
  const radius = Math.max(4, total * 0.9);
  const anglePerItem = (Math.PI * 2) / total;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Smooth rotation interpolation
    const current = groupRef.current.rotation.y;
    const diff = targetRotation - current;
    // Handle wrapping for smooth transitions
    groupRef.current.rotation.y += diff * Math.min(1, delta * 4);
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const angle = index * anglePerItem;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <group
            key={project.id}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          >
            <CarouselCard
              project={project}
              isActive={index === activeIndex}
            />
          </group>
        );
      })}
    </group>
  );
}
