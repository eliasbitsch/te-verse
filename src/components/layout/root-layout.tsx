import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";

export function RootLayout() {
  return (
    <div className="h-svh flex flex-col">
      <Navigation />
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
    </div>
  );
}
