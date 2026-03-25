import { useState } from "react";
import { useProjectStore } from "@/hooks/use-project-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function ProjectDetailOverlay() {
  const { selectedProject, clearProject } = useProjectStore();
  const [loading, setLoading] = useState(true);

  return (
    <Sheet
      open={selectedProject !== null}
      onOpenChange={(open) => {
        if (!open) {
          clearProject();
          setLoading(true);
        }
      }}
    >
      <SheetContent
        side="right"
        className="w-[80vw] sm:max-w-[80vw] p-0 flex flex-col"
      >
        {selectedProject && (
          <>
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-border shrink-0">
              <SheetTitle className="text-xl">
                {selectedProject.name}
              </SheetTitle>
              <SheetDescription>
                {selectedProject.description}
              </SheetDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedProject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </SheetHeader>
            <div className="flex-1 relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              )}
              <iframe
                src={selectedProject.url}
                title={selectedProject.name}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => setLoading(false)}
              />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
