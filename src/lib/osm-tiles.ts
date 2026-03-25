import type { GeoCoordinate } from "@/types/project";

/**
 * Convert lat/lng to OSM tile coordinates at a given zoom level.
 * See: https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 */
export function latLngToTile(
  lat: number,
  lng: number,
  zoom: number
): { x: number; y: number } {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y };
}

/**
 * Get the lat/lng bounds of a tile.
 */
function tileBounds(
  x: number,
  y: number,
  zoom: number
): { north: number; south: number; west: number; east: number } {
  const n = Math.pow(2, zoom);
  const west = (x / n) * 360 - 180;
  const east = ((x + 1) / n) * 360 - 180;
  const north =
    (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / n))) * 180) / Math.PI;
  const south =
    (Math.atan(Math.sinh(Math.PI * (1 - (2 * (y + 1)) / n))) * 180) / Math.PI;
  return { north, south, west, east };
}

/**
 * Build an OSM tile URL.
 */
export function osmTileUrl(x: number, y: number, zoom: number): string {
  // Use multiple subdomains for parallel loading
  const subdomain = ["a", "b", "c"][(x + y) % 3];
  return `https://${subdomain}.tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
}

/**
 * Configuration for loading a grid of tiles around a location.
 */
export interface TileGridConfig {
  geo: GeoCoordinate;
  zoom: number;
  /** Number of tiles in each direction from center (e.g., 2 means 5x5 grid) */
  radius: number;
}

export interface TileInfo {
  url: string;
  tileX: number;
  tileY: number;
  /** World-space bounds in the 3D map coordinate system */
  bounds: { north: number; south: number; west: number; east: number };
}

/**
 * Get all tile URLs and their geographic bounds for a grid around a location.
 */
export function getTileGrid(config: TileGridConfig): TileInfo[] {
  const { geo, zoom, radius } = config;
  const center = latLngToTile(geo.lat, geo.lng, zoom);
  const tiles: TileInfo[] = [];

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const tx = center.x + dx;
      const ty = center.y + dy;
      tiles.push({
        url: osmTileUrl(tx, ty, zoom),
        tileX: tx,
        tileY: ty,
        bounds: tileBounds(tx, ty, zoom),
      });
    }
  }

  return tiles;
}
