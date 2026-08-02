import { useLocation, Link } from "wouter";
import { useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { CharacterImage } from "@/components/CharacterImage";
import { motion } from "framer-motion";

export function HomePage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      // It's checked after mount, if null, it means no user in localStorage
      const stored = localStorage.getItem('dxhood_user');
      if (!stored) {
        setLocation("/");
      }
    }
  }, [user, setLocation]);

  const games = [
    {
      id: "tapper",
      title: "HOOD TAPPER",
      tagline: "Tap to earn $DXHOOD. Don't stop.",
      emoji: "👆",
      path: "/game/tapper"
    },
    {
      id: "dash",
      title: "DOGE DASH",
      tagline: "Run. Jump. Survive the FUD.",
      emoji: "🏃",
      path: "/game/dash"
    },
    {
      id: "moon",
      title: "MOON OR FUD",
      tagline: "Predict the next move. Ape in.",
      emoji: "🪙",
      path: "/game/moon"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] w-full pb-24 pt-6 px-4 flex flex-col items-center"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12">
              <CharacterImage className="rounded-full" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-sans font-bold uppercase tracking-wider">Logged in as</p>
              <p className="font-display text-sm text-primary">{user || "DEGEN"}</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl border border-primary/50 bg-card px-3 py-2 font-sans text-[10px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-background"
          >
            Dashboard
          </Link>
        </div>

        <h2 className="font-display text-xl text-white mb-6 text-center">
          CHOOSE YOUR GAME
        </h2>

        <div className="flex flex-col gap-4">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={game.path}>
                <div className="bg-card border border-accent rounded-xl p-5 flex items-center gap-4 hover:bg-card/80 transition-colors cursor-pointer group active:scale-[0.98] box-shadow-glow">
                  <div className="text-4xl">{game.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-display text-sm text-primary mb-2 group-hover:text-white transition-colors">{game.title}</h3>
                    <p className="text-xs text-muted-foreground font-sans font-medium">{game.tagline}</p>
                  </div>
                  <div className="bg-primary text-background px-4 py-2 rounded-lg font-display text-[10px]">
                    PLAY
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
