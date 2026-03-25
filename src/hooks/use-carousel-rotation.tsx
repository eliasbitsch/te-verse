import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { projects } from "@/config/projects";

interface CarouselContext {
  activeIndex: number;
  targetRotation: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

const CarouselCtx = createContext<CarouselContext | null>(null);

export function CarouselProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;
  const anglePerItem = (Math.PI * 2) / total;

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const targetRotation = -activeIndex * anglePerItem;

  return (
    <CarouselCtx.Provider
      value={{ activeIndex, targetRotation, next, prev, goTo }}
    >
      {children}
    </CarouselCtx.Provider>
  );
}

export function useCarouselRotation() {
  const ctx = useContext(CarouselCtx);
  if (!ctx) throw new Error("useCarouselRotation must be used within CarouselProvider");
  return ctx;
}
