import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "@/components/layout/root-layout";
import { ProjectStoreProvider } from "@/hooks/use-project-store";
import { LandingPage } from "@/pages/landing-page";
import { CarouselPage } from "@/pages/carousel-page";
import { TEVersePage } from "@/pages/te-verse-page";

export default function App() {
  return (
    <ProjectStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/carousel" element={<CarouselPage />} />
            <Route path="/te-verse" element={<TEVersePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProjectStoreProvider>
  );
}
