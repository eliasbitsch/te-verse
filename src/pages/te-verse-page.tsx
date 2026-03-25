import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { TEVerseScene } from "@/components/te-verse/te-verse-scene";
import { ProjectDetailOverlay } from "@/components/shared/project-detail-overlay";
import { MapOverlayControls } from "@/components/te-verse/ui/map-overlay-controls";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { MapStoreProvider } from "@/hooks/use-map-store";

export function TEVersePage() {
  return (
    <MapStoreProvider>
      <div className="relative h-full">
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ position: [0, 300, 200], fov: 45 }}
          className="!absolute inset-0"
        >
          <Suspense fallback={<LoadingSpinner />}>
            <TEVerseScene />
          </Suspense>
        </Canvas>
        <MapOverlayControls />
        <ProjectDetailOverlay />
      </div>
    </MapStoreProvider>
  );
}
