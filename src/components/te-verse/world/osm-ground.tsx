import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { GeoCoordinate } from "@/types/project";
import { geoToMap } from "@/lib/geo";
import { getTileGrid } from "@/lib/osm-tiles";

interface OSMGroundProps {
  geo: GeoCoordinate;
  zoom?: number;
  radius?: number;
}

export function OSMGround({ geo, zoom = 14, radius = 3 }: OSMGroundProps) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  const tiles = useMemo(() => getTileGrid({ geo, zoom, radius }), [geo, zoom, radius]);

  const gridBounds = useMemo(() => {
    const allBounds = tiles.map((t) => t.bounds);
    const north = Math.max(...allBounds.map((b) => b.north));
    const south = Math.min(...allBounds.map((b) => b.south));
    const west = Math.min(...allBounds.map((b) => b.west));
    const east = Math.max(...allBounds.map((b) => b.east));

    const nw = geoToMap({ lat: north, lng: west });
    const se = geoToMap({ lat: south, lng: east });

    return {
      width: Math.abs(se[0] - nw[0]),
      depth: Math.abs(se[2] - nw[2]),
      centerX: (nw[0] + se[0]) / 2,
      centerZ: (nw[2] + se[2]) / 2,
    };
  }, [tiles]);

  useEffect(() => {
    const gridSize = radius * 2 + 1;
    const tilePixels = 256;
    const canvasSize = gridSize * tilePixels;

    const canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d")!;

    // Base color while loading
    ctx.fillStyle = "#d1d5db";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    let loaded = 0;

    const minTileX = Math.min(...tiles.map((t) => t.tileX));
    const minTileY = Math.min(...tiles.map((t) => t.tileY));

    // Create and update texture incrementally
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    textureRef.current = tex;
    setTexture(tex);

    tiles.forEach((tile) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const px = (tile.tileX - minTileX) * tilePixels;
        const py = (tile.tileY - minTileY) * tilePixels;
        ctx.drawImage(img, px, py, tilePixels, tilePixels);
        loaded++;
        // Update texture progressively as tiles load
        tex.needsUpdate = true;
      };
      img.onerror = () => {
        // Draw a placeholder for failed tiles
        const px = (tile.tileX - minTileX) * tilePixels;
        const py = (tile.tileY - minTileY) * tilePixels;
        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(px, py, tilePixels, tilePixels);
        loaded++;
        tex.needsUpdate = true;
      };
      img.src = tile.url;
    });

    return () => {
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
    };
  }, [tiles, radius]);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[gridBounds.centerX, 0.06, gridBounds.centerZ]}
      receiveShadow
    >
      <planeGeometry args={[gridBounds.width, gridBounds.depth]} />
      {texture ? (
        <meshStandardMaterial map={texture} roughness={0.85} metalness={0} />
      ) : (
        <meshStandardMaterial color="#d1d5db" roughness={0.85} />
      )}
    </mesh>
  );
}
