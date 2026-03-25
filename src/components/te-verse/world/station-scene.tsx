import { useState, type ReactNode } from "react";
import { Html } from "@react-three/drei";
import type { Station, Location } from "@/types/project";
import { useMapStore } from "@/hooks/use-map-store";
import { useProjectStore } from "@/hooks/use-project-store";

// Station 3D scene components
import { AITBuildingScene } from "../stations/ait-building";
import { RobotForkliftScene } from "../stations/robot-forklift";
import { MilitaryTrainingScene } from "../stations/military-training";
import { PoliceVRTrainingScene } from "../stations/police-vr-training";
import { DroneFlyingScene } from "../stations/drone-flying";
import { HumanDronePadScene } from "../stations/human-drone-pad";
import { HexapodRescueScene } from "../stations/hexapod-rescue";
import { RescueMannequinScene } from "../stations/rescue-mannequin";
import { TimberCraneScene } from "../stations/timber-crane";
import { SteelCoilCraneScene } from "../stations/steel-coil-crane";
import { AirplaneDisassemblyScene } from "../stations/airplane-disassembly";
import { VRWorkspaceScene } from "../stations/vr-workspace";
import { VILBuildingScene } from "../stations/vil-building";
import { FlexiStylusScene } from "../stations/flexi-stylus";
import { CrawlerRobotScene } from "../stations/crawler-robot";
import { StahlweltMuseumScene } from "../stations/stahlwelt-museum";
import { BlastFurnacesScene } from "../stations/blast-furnaces";
import { SteelPlantScene } from "../stations/steel-plant";

const SCENE_MAP: Record<string, () => ReactNode> = {
  "ait-building": () => <AITBuildingScene />,
  "robot-forklift": () => <RobotForkliftScene />,
  "military-training": () => <MilitaryTrainingScene />,
  "police-vr": () => <PoliceVRTrainingScene />,
  "drone-flying": () => <DroneFlyingScene />,
  "human-drone-pad": () => <HumanDronePadScene />,
  "hexapod-rescue": () => <HexapodRescueScene />,
  "rescue-mannequin": () => <RescueMannequinScene />,
  "timber-crane": () => <TimberCraneScene />,
  "steel-coil-crane": () => <SteelCoilCraneScene />,
  "airplane-disassembly": () => <AirplaneDisassemblyScene />,
  "vr-workspace": () => <VRWorkspaceScene />,
  "vil-building": () => <VILBuildingScene />,
  "flexi-stylus": () => <FlexiStylusScene />,
  "crawler-robot": () => <CrawlerRobotScene />,
  "stahlwelt-museum": () => <StahlweltMuseumScene />,
  "blast-furnaces": () => <BlastFurnacesScene />,
  "steel-plant": () => <SteelPlantScene />,
};

interface StationSceneProps {
  station: Station;
  location: Location;
}

export function StationScene({ station, location }: StationSceneProps) {
  const { focusStation, focusedStation } = useMapStore();
  const { selectProject } = useProjectStore();
  const [hovered, setHovered] = useState(false);
  const isActive = focusedStation?.id === station.id;

  const sceneFactory = SCENE_MAP[station.id];

  return (
    <group position={station.position}>
      {/* Hit area for interaction */}
      <mesh
        position={[0, 1, 0]}
        onClick={(e) => {
          e.stopPropagation();
          focusStation(station, location);
        }}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={[8, 8, 8]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      {/* Station 3D scene */}
      {sceneFactory ? sceneFactory() : <DefaultStationScene color={station.color} />}

      {/* Ground highlight */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[5, 32]} />
        <meshStandardMaterial
          color={station.color}
          emissive={station.color}
          emissiveIntensity={hovered || isActive ? 1.0 : 0.15}
          transparent
          opacity={hovered || isActive ? 0.5 : 0.2}
        />
      </mesh>

      {/* Tooltip on hover */}
      {hovered && (
        <Html position={[0, 8, 0]} center distanceFactor={30}>
          <div
            className="bg-background/90 backdrop-blur-md border border-border rounded-lg px-3 py-2 pointer-events-auto shadow-lg min-w-[160px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-semibold text-sm text-foreground">{station.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{station.description}</div>
            <button
              className="mt-2 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors w-full"
              onClick={() => {
                selectProject({
                  id: station.id,
                  name: station.name,
                  description: station.description,
                  url: station.url,
                  thumbnail: "",
                  tags: station.tags,
                  color: station.color,
                });
              }}
            >
              Open Details
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

function DefaultStationScene({ color }: { color: string }) {
  return (
    <mesh position={[0, 0.5, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}
