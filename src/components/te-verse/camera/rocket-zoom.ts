import * as THREE from "three";

export const FLIGHT_DURATION = 5; // seconds

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculate a parabolic flight path from source to destination camera positions.
 * Arc height is proportional to the horizontal distance between points.
 */
export function calculateFlightPath(
  fromPos: THREE.Vector3,
  toPos: THREE.Vector3
): THREE.CatmullRomCurve3 {
  const dx = toPos.x - fromPos.x;
  const dz = toPos.z - fromPos.z;
  const distance = Math.sqrt(dx * dx + dz * dz);
  const apex = Math.max(150, distance * 0.6);

  const midX = (fromPos.x + toPos.x) / 2;
  const midZ = (fromPos.z + toPos.z) / 2;

  return new THREE.CatmullRomCurve3([
    fromPos.clone(),
    new THREE.Vector3(fromPos.x, apex * 0.6, fromPos.z),
    new THREE.Vector3(midX, apex, midZ),
    new THREE.Vector3(toPos.x, apex * 0.6, toPos.z),
    toPos.clone(),
  ]);
}

/**
 * Calculate a gentler arc for the camera look-at target.
 * Stays lower — transitions smoothly from source ground to destination ground.
 */
export function calculateTargetPath(
  fromTarget: THREE.Vector3,
  toTarget: THREE.Vector3
): THREE.CatmullRomCurve3 {
  const midX = (fromTarget.x + toTarget.x) / 2;
  const midZ = (fromTarget.z + toTarget.z) / 2;

  return new THREE.CatmullRomCurve3([
    fromTarget.clone(),
    new THREE.Vector3(midX, 5, midZ),
    toTarget.clone(),
  ]);
}
