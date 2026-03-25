import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Box, Globe } from "lucide-react";

const navItems = [
  { to: "/carousel", label: "Carousel", icon: Box },
  { to: "/te-verse", label: "TE-Verse", icon: Globe },
] as const;

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-md border-b border-border">
      <NavLink
        to="/"
        className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
      >
        Portfolio
      </NavLink>

      <div className="flex items-center gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
