import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { storage } from "@/lib/gameStorage";
import { ArrowLeft } from "lucide-react";

export function MoonOrFudGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<"MOON" | "FUD" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [wins, setWins] = useState(0);

  const MAX_ROUNDS = 10;

  useEffect(() => {
    setHighScore(storage.getMoonScore());
  }, []);

  const playRound = (guess: "MOON" | "FUD") => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);

    // Simulate flip animation delay
    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? "MOON" : "FUD";
      setResult(outcome);
      setIsFlipping(false);

      if (guess === outcome) {
        setScore(s => s + 100);
        setWins(w => w + 1);
      } else {
        setScore(s => Math.max(0, s - 50));
      }

      setTimeout(() => {
        if (round >= MAX_ROUNDS) {
          endGame();
        } else {
          setRound(r => r + 1);
          setResult(null);
        }
      }, 1500);
    }, 1000);
  };

  const endGame = () => {
    setGameOver(true);
    // Score update happens in previous timeout, so use functional state if needed, 
    // but React guarantees state batching. We'll read from latest score by using a ref or just saving it here.
    // Wait, the state is already updated in the previous tick.
  };

  // We need to save highscore whenever gameover is true and score is higher
  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        storage.setMoonScore(score);
        setHighScore(score);
      }
    }
  }, [gameOver, score, highScore]);

  const restart = () => {
    setScore(0);
    setRound(1);
    setWins(0);
    setResult(null);
    setGameOver(false);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col relative overflow-hidden">
      <div className="p-4 flex items-center justify-between z-10 relative border-b border-accent/20">
        <Link href="/home">
          <motion.div whileTap={{ scale: 0.9 }} className="p-2 text-accent cursor-pointer">
            <ArrowLeft className="w-6 h-6" />
          </motion.div>
        </Link>
        <div className="text-center">
          <p className="font-display text-primary text-xl drop-shadow-[0_0_8px_#C8FF00]">{score}</p>
          <p className="font-sans text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Score</p>
        </div>
        <div className="text-right px-2">
          <p className="font-display text-sm text-white">{round}/{MAX_ROUNDS}</p>
          <p className="font-sans text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Round</p>
        </div>
      </div>

      {!gameOver ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-12">
          <div className="text-center">
            <h2 className="font-display text-2xl text-white mb-2">MOON OR FUD</h2>
            <p className="font-sans text-muted-foreground text-sm">Predict the flip. Will it pump or dump?</p>
          </div>

          <div className="relative w-48 h-48" style={{ perspective: '1000px' }}>
            <motion.div
              animate={isFlipping ? { rotateY: 1800 } : { rotateY: result === "FUD" ? 180 : 0 }}
              transition={{ duration: isFlipping ? 1 : 0.5, ease: "easeInOut" }}
              className="w-full h-full relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front (MOON) */}
              <div 
                className="absolute inset-0 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-[0_0_30px_rgba(200,255,0,0.5)]"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
              >
                <span className="text-6xl">🐕</span>
              </div>
              {/* Back (FUD) */}
              <div 
                className="absolute inset-0 bg-destructive rounded-full flex items-center justify-center border-4 border-background shadow-[0_0_30px_rgba(255,0,0,0.5)]"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <span className="text-6xl">💀</span>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {result && !isFlipping && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-center font-display text-xl ${result === "MOON" ? "text-primary text-shadow-glow" : "text-destructive drop-shadow-[0_0_10px_#ff0000]"}`}
              >
                {result === "MOON" ? "TO THE MOON! 🚀 +100" : "RIP DEGEN 💀 -50"}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex w-full gap-4 max-w-sm mt-8">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => playRound("MOON")}
              disabled={isFlipping || result !== null}
              className="flex-1 bg-card border-2 border-primary py-6 rounded-xl font-display text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all box-shadow-lime"
            >
              🚀 MOON
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => playRound("FUD")}
              disabled={isFlipping || result !== null}
              className="flex-1 bg-card border-2 border-destructive py-6 rounded-xl font-display text-destructive hover:bg-destructive/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(255,0,0,0.3)]"
            >
              💀 FUD
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 z-20">
          <div className="bg-card border-2 border-primary p-8 rounded-2xl flex flex-col items-center max-w-[90%] w-full box-shadow-lime">
            <h2 className="font-display text-2xl text-white mb-6 text-center">SESSION OVER</h2>
            
            <div className="w-full space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-muted pb-2">
                <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">Final Score</span>
                <span className="font-display text-primary">{score}</span>
              </div>
              <div className="flex justify-between items-center border-b border-muted pb-2">
                <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">Win Rate</span>
                <span className="font-display text-white">{Math.round((wins / MAX_ROUNDS) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">Best Score</span>
                <span className="font-display text-accent">{Math.max(score, highScore)}</span>
              </div>
            </div>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="w-full bg-primary text-background font-display py-4 rounded-xl text-sm mb-4 box-shadow-lime"
            >
              PLAY AGAIN
            </motion.button>
            <Link href="/home" className="text-muted-foreground font-sans text-xs uppercase font-bold tracking-widest hover:text-white transition-colors">
              Back to Hub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
