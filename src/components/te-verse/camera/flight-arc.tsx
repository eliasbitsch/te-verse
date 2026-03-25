import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMapStore } from "@/hooks/use-map-store";
import { calculateFlightPath, easeInOutCubic, FLIGHT_DURATION } from "./rocket-zoom";

const LOCATION_OFFSET = new THREE.Vector3(0, 50, 40);

export function FlightArc() {
  const { transitionState, previousLocation, focusedLocation } = useMapStore();
  const markerRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  const curve = useMemo(() => {
    if (transitionState === "idle" || !previousLocation || !focusedLocation) return null;

    const [fx, fy, fz] = previousLocation.mapPosition;
    const [tx, ty, tz] = focusedLocation.mapPosition;

    const fromPos = new THREE.Vector3(
      fx + LOCATION_OFFSET.x,
      fy + LOCATION_OFFSET.y,
      fz + LOCATION_OFFSET.z
    );
    const toPos = new THREE.Vector3(
      tx + LOCATION_OFFSET.x,
      ty + LOCATION_OFFSET.y,
      tz + LOCATION_OFFSET.z
    );

    return calculateFlightPath(fromPos, toPos);
  }, [transitionState, previousLocation, focusedLocation]);

  const tubeGeometry = useMemo(() => {
    if (!curve) return null;
    return new THREE.TubeGeometry(curve, 64, 0.3, 8, false);
  }, [curve]);

  // Reset elapsed when transition starts
  useFrame((_, delta) => {
    if (transitionState !== "idle") {
      elapsed.current += delta;
    } else {
      elapsed.current = 0;
    }

    // Move marker along the curve
    if (markerRef.current && curve && transitionState !== "idle") {
      const rawT = Math.min(elapsed.current / FLIGHT_DURATION, 1);
      const t = easeInOutCubic(rawT);
      const point = curve.getPointAt(t);
      markerRef.current.position.copy(point);
    }
  });

  if (!curve || !tubeGeometry || transitionState === "idle") return null;

  return (
    <group>
      {/* Glowing flight path tube */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#60a5fa"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Moving marker */}
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}
