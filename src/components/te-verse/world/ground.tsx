import { useMemo } from "react";
import * as THREE from "three";
import { locations } from "@/config/projects";
import { getMapBounds, geoToMap } from "@/lib/geo";

export function Ground() {
  const bounds = useMemo(
    () => getMapBounds(locations.map((l) => l.mapPosition)),
    []
  );

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d")!;

    // Base: Satisfactory muted green (rural Austria)
    ctx.fillStyle = "#6b8f5e";
    ctx.fillRect(0, 0, 2048, 2048);

    // Terrain variation — fields
    const fieldColors = ["#5f8352", "#7da36e", "#6b8f5e", "#5a7a4c"];
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = fieldColors[i % fieldColors.length];
      const x = Math.floor(Math.random() * 1800);
      const y = Math.floor(Math.random() * 1800);
      ctx.fillRect(x, y, 80 + Math.random() * 200, 60 + Math.random() * 150);
    }

    // Map geo to canvas coordinates
    const geoToCanvas = (mapX: number, mapZ: number): [number, number] => {
      const cx = ((mapX - bounds.minX) / bounds.width) * 2048;
      const cy = ((mapZ - bounds.minZ) / bounds.depth) * 2048;
      return [cx, cy];
    };

    // Vienna urban area (AIT + VIL region)
    const viennaCenter = geoToMap({ lat: 48.21, lng: 16.377 });
    const [vcx, vcy] = geoToCanvas(viennaCenter[0], viennaCenter[2]);
    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(vcx - 120, vcy - 100, 240, 200);

    // Soft edge
    ctx.fillStyle = "rgba(107, 143, 94, 0.4)";
    ctx.fillRect(vcx - 140, vcy - 120, 40, 240);
    ctx.fillRect(vcx + 100, vcy - 120, 40, 240);
    ctx.fillRect(vcx - 120, vcy - 120, 240, 40);
    ctx.fillRect(vcx - 120, vcy + 80, 240, 40);

    // Vienna grid
    ctx.strokeStyle = "rgba(156, 163, 175, 0.2)";
    ctx.lineWidth = 1;
    for (let x = vcx - 120; x < vcx + 120; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, vcy - 100); ctx.lineTo(x, vcy + 100); ctx.stroke();
    }
    for (let y = vcy - 100; y < vcy + 100; y += 20) {
      ctx.beginPath(); ctx.moveTo(vcx - 120, y); ctx.lineTo(vcx + 120, y); ctx.stroke();
    }

    // Linz urban area
    const linzCenter = geoToMap({ lat: 48.307, lng: 14.286 });
    const [lcx, lcy] = geoToCanvas(linzCenter[0], linzCenter[2]);
    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(lcx - 80, lcy - 60, 160, 120);
    ctx.fillStyle = "rgba(107, 143, 94, 0.4)";
    ctx.fillRect(lcx - 100, lcy - 80, 30, 160);
    ctx.fillRect(lcx + 70, lcy - 80, 30, 160);

    // Seibersdorf — small settlement
    const seiCenter = geoToMap({ lat: 47.9777, lng: 16.508 });
    const [scx, scy] = geoToCanvas(seiCenter[0], seiCenter[2]);
    ctx.fillStyle = "#a8a29e";
    ctx.fillRect(scx - 30, scy - 25, 60, 50);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [bounds]);

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[bounds.centerX, -0.05, bounds.centerZ]}
        receiveShadow
      >
        <planeGeometry args={[bounds.width, bounds.depth]} />
        <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}
