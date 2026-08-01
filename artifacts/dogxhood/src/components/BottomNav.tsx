import { Link, useLocation } from "wouter";
import { Home, Trophy, HelpCircle, Info } from "lucide-react";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/leaderboard", icon: Trophy, label: "Leaders" },
    { path: "/how-to-play", icon: HelpCircle, label: "Rules" },
    { path: "/about", icon: Info, label: "About" },
  ];

  // Don't show bottom nav on root or game routes
  if (location === "/" || location.startsWith("/game/")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto h-16 bg-card border-t border-accent box-shadow-glow flex items-center justify-around z-50 pb-safe">
      {navItems.map((item) => {
        const isActive = location === item.path;
        const Icon = item.icon;
        return (
          <Link key={item.path} href={item.path} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
            <Icon className={`w-6 h-6 ${isActive ? "drop-shadow-[0_0_8px_hsl(74,100%,50%)]" : ""}`} />
            <span className="text-[10px] font-bold font-sans uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
