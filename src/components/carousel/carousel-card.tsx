import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { Vector3 } from "three";
import type { Group } from "three";
import type { Project } from "@/types/project";
import { useProjectStore } from "@/hooks/use-project-store";

interface CarouselCardProps {
  project: Project;
  isActive: boolean;
}

export function CarouselCard({ project, isActive }: CarouselCardProps) {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const { selectProject } = useProjectStore();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = isActive ? 1.1 : hovered ? 1.05 : 1;
    const targetZ = isActive ? 0.3 : 0;
    groupRef.current.scale.lerp(
      new Vector3(targetScale, targetScale, targetScale),
      delta * 5
    );
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * delta * 5;
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={() => selectProject(project)}
    >
      {/* Card background */}
      <RoundedBox args={[2.4, 1.6, 0.08]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.7}
        />
      </RoundedBox>

      {/* Color accent border glow */}
      <RoundedBox args={[2.5, 1.7, 0.04]} radius={0.08} smoothness={4} position={[0, 0, -0.03]}>
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isActive ? 1.5 : hovered ? 0.8 : 0.3}
          transparent
          opacity={0.6}
        />
      </RoundedBox>

      {/* Project icon placeholder */}
      <mesh position={[0, 0.15, 0.05]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Project name */}
      <Text
        position={[0, -0.35, 0.05]}
        fontSize={0.16}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={2}
      >
        {project.name}
      </Text>

      {/* Project description */}
      <Text
        position={[0, -0.58, 0.05]}
        fontSize={0.08}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.description}
      </Text>
    </group>
  );
}
