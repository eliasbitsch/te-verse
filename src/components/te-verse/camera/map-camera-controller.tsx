import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import * as THREE from "three";
import { useMapStore } from "@/hooks/use-map-store";
import { locations } from "@/config/projects";
import { getMapBounds } from "@/lib/geo";
import {
  calculateFlightPath,
  calculateTargetPath,
  easeInOutCubic,
  FLIGHT_DURATION,
} from "./rocket-zoom";

// Calculate overview camera from real geo positions
const bounds = getMapBounds(locations.map((l) => l.mapPosition));
const OVERVIEW_TARGET = new THREE.Vector3(bounds.centerX, 0, bounds.centerZ);
const OVERVIEW_POSITION = new THREE.Vector3(
  bounds.centerX,
  Math.max(bounds.width, bounds.depth) * 0.8,
  bounds.centerZ + Math.max(bounds.width, bounds.depth) * 0.5
);

const LOCATION_OFFSET = new THREE.Vector3(0, 50, 40);
const STATION_OFFSET = new THREE.Vector3(0, 15, 12);

const LERP_SPEED = 2;
const ARRIVAL_THRESHOLD = 1;

export function MapCameraController() {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const {
    focusedLocation,
    focusedStation,
    zoomLevel,
    transitionState,
    setTransitionState,
  } = useMapStore();
  const isAnimating = useRef(false);

  // Simple lerp targets
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

  // Rocket-zoom state
  const flightCurve = useRef<THREE.CatmullRomCurve3 | null>(null);
  const targetCurve = useRef<THREE.CatmullRomCurve3 | null>(null);
  const flightElapsed = useRef(0);
  const flightMode = useRef(false);

  // Detect cross-location transition and set up flight path
  useEffect(() => {
    if (transitionState === "zooming-out" && focusedLocation) {
      // Start rocket-zoom: compute flight path from current camera to destination
      const [x, y, z] = focusedLocation.mapPosition;
      const destPos = new THREE.Vector3(
        x + LOCATION_OFFSET.x,
        y + LOCATION_OFFSET.y,
        z + LOCATION_OFFSET.z
      );
      const destTarget = new THREE.Vector3(x, y, z);

      const fromPos = camera.position.clone();
      const fromTarget = controlsRef.current
        ? controlsRef.current.target.clone()
        : new THREE.Vector3(fromPos.x, 0, fromPos.z - 15);

      flightCurve.current = calculateFlightPath(fromPos, destPos);
      targetCurve.current = calculateTargetPath(fromTarget, destTarget);
      flightElapsed.current = 0;
      flightMode.current = true;
    }
  }, [transitionState, focusedLocation, camera]);

  // Calculate simple lerp targets (for non-rocket-zoom transitions)
  useEffect(() => {
    if (transitionState !== "idle") return; // rocket-zoom handles its own camera

    if (zoomLevel === "overview") {
      targetPosition.copy(OVERVIEW_POSITION);
      targetLookAt.copy(OVERVIEW_TARGET);
    } else if (zoomLevel === "location" && focusedLocation) {
      const [x, y, z] = focusedLocation.mapPosition;
      targetLookAt.set(x, y, z);
      targetPosition.set(x + LOCATION_OFFSET.x, y + LOCATION_OFFSET.y, z + LOCATION_OFFSET.z);
    } else if (zoomLevel === "station" && focusedStation && focusedLocation) {
      const [lx, ly, lz] = focusedLocation.mapPosition;
      const [sx, sy, sz] = focusedStation.position;
      targetLookAt.set(lx + sx, ly + sy, lz + sz);
      targetPosition.set(
        lx + sx + STATION_OFFSET.x,
        ly + sy + STATION_OFFSET.y,
        lz + sz + STATION_OFFSET.z
      );
    }
    isAnimating.current = true;
  }, [zoomLevel, focusedLocation, focusedStation, targetPosition, targetLookAt, transitionState]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // === Mode B: Rocket-Zoom flight ===
    if (flightMode.current && flightCurve.current && targetCurve.current) {
      controlsRef.current.enabled = false;
      flightElapsed.current += delta;
      const rawT = Math.min(flightElapsed.current / FLIGHT_DURATION, 1);
      const t = easeInOutCubic(rawT);

      // Update transition phase
      if (rawT < 0.25) setTransitionState("zooming-out");
      else if (rawT < 0.75) setTransitionState("flying");
      else setTransitionState("zooming-in");

      camera.position.copy(flightCurve.current.getPointAt(t));
      controlsRef.current.target.copy(targetCurve.current.getPointAt(t));
      controlsRef.current.update();

      if (rawT >= 1) {
        flightMode.current = false;
        flightCurve.current = null;
        targetCurve.current = null;
        controlsRef.current.enabled = true;
        setTransitionState("idle");
      }
      return;
    }

    // === Mode A: Simple lerp ===
    if (!isAnimating.current) return;

    controlsRef.current.enabled = false;

    camera.position.lerp(targetPosition, delta * LERP_SPEED);
    controlsRef.current.target.lerp(targetLookAt, delta * LERP_SPEED);
    controlsRef.current.update();

    const posDist = camera.position.distanceTo(targetPosition);
    if (posDist < ARRIVAL_THRESHOLD) {
      camera.position.copy(targetPosition);
      controlsRef.current.target.copy(targetLookAt);
      controlsRef.current.update();
      controlsRef.current.enabled = true;
      isAnimating.current = false;
    }
  });

  return (
    <MapControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.1}
      minDistance={5}
      maxDistance={600}
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 8}
    />
  );
}
