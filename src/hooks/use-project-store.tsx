import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Project } from "@/types/project";

interface ProjectStoreContext {
  selectedProject: Project | null;
  selectProject: (project: Project) => void;
  clearProject: () => void;
}

const ProjectStoreCtx = createContext<ProjectStoreContext | null>(null);

export function ProjectStoreProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const clearProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <ProjectStoreCtx.Provider
      value={{ selectedProject, selectProject, clearProject }}
    >
      {children}
    </ProjectStoreCtx.Provider>
  );
}

export function useProjectStore() {
  const ctx = useContext(ProjectStoreCtx);
  if (!ctx) throw new Error("useProjectStore must be used within ProjectStoreProvider");
  return ctx;
}
