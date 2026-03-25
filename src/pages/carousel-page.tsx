import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CarouselScene } from "@/components/carousel/carousel-scene";
import { CarouselControls } from "@/components/carousel/carousel-controls";
import { ProjectDetailOverlay } from "@/components/shared/project-detail-overlay";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { CarouselProvider } from "@/hooks/use-carousel-rotation";

export function CarouselPage() {
  return (
    <CarouselProvider>
      <div className="relative h-full">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 1, 6], fov: 50 }}
          className="!absolute inset-0"
        >
          <Suspense fallback={<LoadingSpinner />}>
            <CarouselScene />
          </Suspense>
        </Canvas>
        <CarouselControls />
        <ProjectDetailOverlay />
      </div>
    </CarouselProvider>
  );
}
