import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { storage } from "@/lib/gameStorage";
import { CharacterImage } from "@/components/CharacterImage";
import { ArrowLeft } from "lucide-react";

type FloatingText = {
  id: number;
  x: number;
  y: number;
  text: string;
};

type Particle = {
  id: number;
  x: number;
  y: number;
};

export function HoodTapperGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  
  const [combo, setCombo] = useState(1);
  const lastTapTime = useRef(0);
  const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const floatingIdRef = useRef(0);

  useEffect(() => {
    setHighScore(storage.getTapperScore());
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (isPlaying && timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setGameOver(false);
    setIsNewHighScore(false);
    setCombo(1);
    setFloatingTexts([]);
    setParticles([]);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (score > highScore) {
      storage.setTapperScore(score);
      setHighScore(score);
      setIsNewHighScore(true);
    }
  };

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isPlaying) return;

    const now = Date.now();
    let currentCombo = combo;

    if (now - lastTapTime.current < 500) {
      // increase combo, cap at 10
      if (currentCombo < 10) {
        if (now - lastTapTime.current < 200) currentCombo += 2;
        else currentCombo += 1;
        
        if (currentCombo > 10) currentCombo = 10;
        setCombo(currentCombo);
      }
    } else {
      currentCombo = 1;
      setCombo(1);
    }
    lastTapTime.current = now;

    if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = setTimeout(() => setCombo(1), 500);

    const points = 1 * currentCombo;
    setScore(s => s + points);

    // Visuals
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Adjust if they clicked the center to not be exactly at mouse
    const x = clientX + (Math.random() * 40 - 20);
    const y = clientY - 40 + (Math.random() * 20 - 10);

    const id = floatingIdRef.current++;
    setFloatingTexts(prev => [...prev, { id, x, y, text: `+${points}` }]);
    setParticles(prev => [...prev, { id, x, y }]);

    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  return (
    <div className={`min-h-[100dvh] w-full flex flex-col overflow-hidden relative transition-colors duration-100 ${combo > 5 ? 'bg-primary/10' : 'bg-background'}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {floatingTexts.map(ft => (
            <motion.div
              key={ft.id}
              initial={{ opacity: 1, y: ft.y, x: ft.x, scale: 0.5 }}
              animate={{ opacity: 0, y: ft.y - 150, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute font-display text-primary pointer-events-none text-xl text-shadow-glow z-50"
            >
              {ft.text}
            </motion.div>
          ))}
          {particles.map(p => (
            <motion.div
              key={`p-${p.id}`}
              initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
              animate={{ opacity: 0, scale: 3 }}
              transition={{ duration: 0.4 }}
              className="absolute w-12 h-12 rounded-full border-2 border-accent pointer-events-none -ml-6 -mt-6 z-40 box-shadow-glow"
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 flex items-center justify-between z-10 relative bg-background/80 backdrop-blur border-b border-accent">
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
          <p className={`font-display text-lg ${timeLeft <= 10 ? 'text-destructive animate-pulse' : 'text-white'}`}>{timeLeft}s</p>
          <p className="font-sans text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Time</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative p-4" onTouchStart={handleTap} onMouseDown={handleTap}>
        {!isPlaying && !gameOver && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-20 flex flex-col items-center pointer-events-none"
          >
            <h2 className="font-display text-3xl text-primary mb-4 text-shadow-glow">HOOD TAPPER</h2>
            <p className="font-sans text-muted-foreground mb-8 text-center max-w-xs">Tap the character as fast as you can. Combo hits multiply points.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="bg-primary text-background font-display px-8 py-4 rounded-xl text-xl pointer-events-auto box-shadow-lime"
            >
              START
            </motion.button>
          </motion.div>
        )}

        {isPlaying && combo > 1 && (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={combo}
            className="absolute top-20 z-20 font-display text-4xl text-accent text-shadow-glow pointer-events-none"
          >
            x{combo}
          </motion.div>
        )}

        {gameOver && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-30 bg-card border-2 border-primary p-8 rounded-2xl flex flex-col items-center max-w-[90%] pointer-events-auto box-shadow-lime"
          >
            <h2 className="font-display text-2xl text-white mb-2">GAME OVER</h2>
            {isNewHighScore && <p className="font-display text-accent text-xs mb-6 text-shadow-glow animate-pulse">NEW HIGH SCORE!</p>}
            
            <div className="text-center mb-6">
              <p className="font-sans text-muted-foreground text-xs uppercase tracking-widest mb-1">Final Score</p>
              <p className="font-display text-4xl text-primary">{score}</p>
            </div>
            
            <p className="font-sans text-sm text-center mb-8 border border-muted p-3 rounded-lg text-white">
              "I scored {score} in HOOD TAPPER! $DXHOOD 🐕"
            </p>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="w-full bg-primary text-background font-display py-4 rounded-xl text-sm mb-4 box-shadow-lime"
            >
              PLAY AGAIN
            </motion.button>
            <Link href="/home" className="text-muted-foreground font-sans text-xs uppercase font-bold tracking-widest hover:text-white transition-colors">
              Back to Hub
            </Link>
          </motion.div>
        )}

        <motion.div 
          whileTap={{ scale: 0.9 }}
          animate={isPlaying ? { y: [0, -10, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_50px_rgba(200,255,0,0.3)] transition-transform duration-75 ${!isPlaying ? 'opacity-50 grayscale' : 'cursor-pointer active:scale-95 active:border-accent'}`}
        >
          <CharacterImage className="w-full h-full object-cover pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
