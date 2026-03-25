import { useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/config/projects";
import { useCarouselRotation } from "@/hooks/use-carousel-rotation";
import { useProjectStore } from "@/hooks/use-project-store";

export function CarouselControls() {
  const { activeIndex, next, prev } = useCarouselRotation();
  const { selectProject } = useProjectStore();
  const project = projects[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Enter") selectProject(project);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, selectProject, project]);

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center gap-4 pointer-events-none">
      {/* Project info */}
      <div className="text-center pointer-events-auto">
        <h2 className="text-2xl font-bold text-foreground">{project.name}</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          {project.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => selectProject(project)}
          className="gap-2"
          style={{
            backgroundColor: project.color,
            borderColor: project.color,
          }}
        >
          <ExternalLink className="w-4 h-4" />
          View Project
        </Button>

        <Button variant="outline" size="icon" onClick={next} className="rounded-full">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2">
        {projects.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-colors"
            style={{
              backgroundColor: i === activeIndex ? project.color : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
