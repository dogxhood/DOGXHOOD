import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowRight, Award, Gamepad2, LogOut, Target, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { CharacterImage } from "@/components/CharacterImage";
import { storage } from "@/lib/gameStorage";
import { useAuth } from "@/lib/useAuth";

type Scores = {
  tapper: number;
  dash: number;
  moon: number;
};

const games = [
  {
    key: "tapper" as const,
    title: "HOOD TAPPER",
    description: "Build your combo and chase a new high score.",
    path: "/game/tapper",
    color: "text-primary",
  },
  {
    key: "dash" as const,
    title: "DOGE DASH",
    description: "Outrun the FUD and keep your streak alive.",
    path: "/game/dash",
    color: "text-accent",
  },
  {
    key: "moon" as const,
    title: "MOON OR FUD",
    description: "Make the call and predict the next move.",
    path: "/game/moon",
    color: "text-primary",
  },
];

export function DashboardPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [scores, setScores] = useState<Scores>({ tapper: 0, dash: 0, moon: 0 });

  useEffect(() => {
    const storedUser = storage.getUser();
    if (!storedUser) {
      setLocation("/");
      return;
    }

    setScores({
      tapper: storage.getTapperScore(),
      dash: storage.getDashScore(),
      moon: storage.getMoonScore(),
    });
  }, [setLocation]);

  const totalScore = useMemo(
    () => scores.tapper + scores.dash + scores.moon,
    [scores],
  );
  const completedGames = Object.values(scores).filter((score) => score > 0).length;

  const logout = () => {
    localStorage.removeItem("dxhood_user");
    setLocation("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[100dvh] w-full bg-background px-4 pb-28 pt-7"
    >
      <div className="mx-auto w-full max-w-md">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.28em] text-primary">
              Player dashboard
            </p>
            <h1 className="font-display text-2xl leading-tight text-white">
              {user || storage.getUser() || "DEGEN"}
            </h1>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Your local DOGXHOOD progress, all in one place.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            aria-label="Log out"
            className="rounded-xl border border-accent/40 bg-card p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 overflow-hidden rounded-2xl border border-primary/50 bg-card p-5 shadow-[0_0_28px_rgba(200,255,0,0.12)]">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0">
              <CharacterImage className="rounded-full border border-primary/70" />
            </div>
            <div className="min-w-0">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Total high score
              </p>
              <p className="mt-1 font-display text-2xl text-primary">
                {totalScore.toLocaleString()}
              </p>
            </div>
            <Trophy className="ml-auto h-8 w-8 shrink-0 text-primary drop-shadow-[0_0_9px_hsl(74,100%,50%)]" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Games played
              </p>
              <p className="mt-1 font-display text-sm text-white">
                {completedGames} / 3
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Best run
              </p>
              <p className="mt-1 font-display text-sm text-accent">
                {Math.max(...Object.values(scores)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <SummaryItem icon={Activity} label="Active" value={`${completedGames}/3`} />
          <SummaryItem icon={Award} label="Best score" value={Math.max(...Object.values(scores)).toLocaleString()} />
          <SummaryItem icon={Target} label="Token" value="$DXH" />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm text-white">YOUR RECORDS</h2>
          <Link href="/leaderboard" className="font-sans text-xs font-bold uppercase tracking-wider text-primary hover:text-white">
            Full leaderboard
          </Link>
        </div>

        <div className="space-y-3">
          {games.map((game) => (
            <Link href={game.path} key={game.key}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 rounded-xl border border-accent/30 bg-card p-4 transition-colors hover:border-primary"
              >
                <div className={`rounded-lg border border-current/30 bg-background p-3 ${game.color}`}>
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xs text-white">{game.title}</h3>
                    <span className={`font-display text-sm ${game.color}`}>
                      {scores[game.key] > 0 ? scores[game.key].toLocaleString() : "---"}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-xs text-muted-foreground">{game.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-accent/20 bg-card p-3">
      <Icon className="mb-3 h-4 w-4 text-accent" />
      <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 truncate font-display text-xs text-white">{value}</p>
    </div>
  );
}