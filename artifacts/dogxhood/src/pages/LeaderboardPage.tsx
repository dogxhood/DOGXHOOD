import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { storage } from "@/lib/gameStorage";
import { CharacterImage } from "@/components/CharacterImage";
import { Link } from "wouter";

export function LeaderboardPage() {
  const [scores, setScores] = useState({ tapper: 0, dash: 0, moon: 0 });

  useEffect(() => {
    setScores({
      tapper: storage.getTapperScore(),
      dash: storage.getDashScore(),
      moon: storage.getMoonScore(),
    });
  }, []);

  const totalPlays = scores.tapper + scores.dash + scores.moon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[100dvh] w-full pb-24 pt-8 px-4 flex flex-col items-center bg-background"
    >
      <div className="w-full max-w-md">
        <h1 className="font-display text-2xl text-primary mb-8 text-center text-shadow-glow">
          LOCAL LEGENDS
        </h1>

        {totalPlays === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-32 h-32 mb-6 opacity-50 grayscale">
              <CharacterImage className="rounded-full" />
            </div>
            <p className="font-display text-white text-sm mb-4">No scores yet</p>
            <p className="font-sans text-muted-foreground text-sm">Go play some games, degen!</p>
            <Link href="/home">
              <button className="mt-8 bg-card border border-accent text-accent px-6 py-3 rounded-xl font-sans font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-colors">
                Go to Hub
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <ScoreCard 
              title="HOOD TAPPER" 
              score={scores.tapper} 
              path="/game/tapper"
              emoji="👆"
            />
            <ScoreCard 
              title="DOGE DASH" 
              score={scores.dash} 
              path="/game/dash"
              emoji="🏃"
            />
            <ScoreCard 
              title="MOON OR FUD" 
              score={scores.moon} 
              path="/game/moon"
              emoji="🪙"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ScoreCard({ title, score, path, emoji }: { title: string, score: number, path: string, emoji: string }) {
  return (
    <div className="bg-card border border-accent/50 rounded-xl p-5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{emoji}</div>
        <div>
          <h3 className="font-sans font-bold uppercase tracking-widest text-xs text-muted-foreground mb-1">{title}</h3>
          <p className="font-display text-xl text-white">{score > 0 ? score : "---"}</p>
        </div>
      </div>
      <Link href={path}>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="text-primary hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </motion.button>
      </Link>
    </div>
  );
}
