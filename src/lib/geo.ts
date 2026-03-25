import type { GeoCoordinate } from "@/types/project";

/**
 * Project geographic coordinates (lat/lng) to 3D map coordinates (x, 0, z).
 *
 * Uses a simple Mercator-like projection centered on the midpoint of all locations.
 * Scale is chosen so the map fits nicely in ~80 unit range.
 *
 * Convention: +x = East, +z = South (so northern locations have lower z)
 */

// Map center: between Linz (14.286°E) and Seibersdorf (16.508°E)
const CENTER_LAT = 48.2;
const CENTER_LNG = 15.4;

// Scale: 1 degree lat ≈ 111km. Large scale so half of Austria is visible with space
const SCALE_LAT = 250;

// At latitude ~48°, 1 degree lng ≈ 74km
const SCALE_LNG = 250 * (74 / 111); // proportional correction

export function geoToMap(geo: GeoCoordinate): [number, number, number] {
  const x = (geo.lng - CENTER_LNG) * SCALE_LNG;
  const z = -(geo.lat - CENTER_LAT) * SCALE_LAT; // negative because north = -z
  return [x, 0, z];
}

/**
 * Bounding box of the map in 3D coordinates (for ground plane sizing)
 */
export function getMapBounds(
  positions: [number, number, number][]
): { minX: number; maxX: number; minZ: number; maxZ: number; width: number; depth: number; centerX: number; centerZ: number } {
  const xs = positions.map((p) => p[0]);
  const zs = positions.map((p) => p[2]);
  const padding = 60;
  const minX = Math.min(...xs) - padding;
  const maxX = Math.max(...xs) + padding;
  const minZ = Math.min(...zs) - padding;
  const maxZ = Math.max(...zs) + padding;
  return {
    minX,
    maxX,
    minZ,
    maxZ,
    width: maxX - minX,
    depth: maxZ - minZ,
    centerX: (minX + maxX) / 2,
    centerZ: (minZ + maxZ) / 2,
  };
}
