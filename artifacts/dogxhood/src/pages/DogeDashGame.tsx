import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { storage } from "@/lib/gameStorage";
import { ArrowLeft } from "lucide-react";

export function DogeDashGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setHighScore(storage.getDashScore());
  }, []);

  const [canvasWidth, setCanvasWidth] = useState(375); // Fallback for mobile

  useEffect(() => {
    const updateWidth = () => {
      setCanvasWidth(Math.min(window.innerWidth, 500));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let currentScore = 0;
    let frames = 0;

    // Game state
    const dog = {
      x: 50,
      y: canvas.height - 80,
      width: 40,
      height: 40,
      dy: 0,
      jumpForce: -12,
      grounded: true,
      gravity: 0.6
    };

    const obstacles: {x: number, y: number, width: number, height: number, type: string}[] = [];
    let gameSpeed = 5;

    const spawnObstacle = () => {
      const type = Math.random() > 0.5 ? "FUD" : "CANDLE";
      const height = type === "CANDLE" ? 60 : 30;
      const width = type === "CANDLE" ? 20 : 60;
      obstacles.push({
        x: canvas.width,
        y: canvas.height - 40 - height,
        width,
        height,
        type
      });
    };

    const update = () => {
      frames++;
      currentScore++;
      
      // Update score in UI every 10 frames to avoid too many React renders
      if (frames % 10 === 0) setScore(Math.floor(currentScore / 10));

      // Increase speed
      if (frames % 500 === 0) gameSpeed += 0.5;

      // Physics
      dog.dy += dog.gravity;
      dog.y += dog.dy;

      // Ground collision
      if (dog.y + dog.height >= canvas.height - 40) {
        dog.y = canvas.height - 40 - dog.height;
        dog.dy = 0;
        dog.grounded = true;
      } else {
        dog.grounded = false;
      }

      // Obstacles
      if (frames % 100 === 0 && Math.random() > 0.3) {
        spawnObstacle();
      }

      for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;

        // Collision
        if (
          dog.x < obs.x + obs.width &&
          dog.x + dog.width > obs.x &&
          dog.y < obs.y + obs.height &&
          dog.y + dog.height > obs.y
        ) {
          // Game Over
          setGameOver(true);
          setIsPlaying(false);
          const finalScore = Math.floor(currentScore / 10);
          if (finalScore > storage.getDashScore()) {
            storage.setDashScore(finalScore);
            setHighScore(finalScore);
          }
          return; // Stop updating
        }
      }

      // Remove off-screen obstacles
      if (obstacles.length > 0 && obstacles[0].x < -100) {
        obstacles.shift();
      }
    };

    const draw = () => {
      // Clear
      ctx.fillStyle = "#0D0D0D";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars/Particles (simplified)
      ctx.fillStyle = "#ffffff";
      for(let i=0; i<5; i++) {
        ctx.fillRect((frames * 0.1 + i*100) % canvas.width, (i*30)%100, 2, 2);
      }

      // Ground
      ctx.fillStyle = "#00FF41"; // accent
      ctx.fillRect(0, canvas.height - 40, canvas.width, 2);
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#00FF41";
      ctx.strokeRect(0, canvas.height - 40, canvas.width, 2);
      ctx.shadowBlur = 0;

      // Dog
      ctx.fillStyle = "#C8FF00";
      ctx.fillRect(dog.x, dog.y, dog.width, dog.height);
      ctx.font = "24px Arial";
      ctx.fillText("🐕", dog.x + 8, dog.y + 28);

      // Obstacles
      for (let obs of obstacles) {
        if (obs.type === "CANDLE") {
          ctx.fillStyle = "#FF0000"; // Red candle
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          // Wick
          ctx.fillRect(obs.x + obs.width/2 - 1, obs.y - 10, 2, 10);
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.font = "16px 'Press Start 2P', monospace";
          ctx.fillText("FUD", obs.x, obs.y + 20);
        }
      }
    };

    const loop = () => {
      update();
      draw();
      if (isPlaying) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    const handleInput = (e: Event) => {
      if (e.type === "keydown" && (e as KeyboardEvent).code !== "Space") return;
      if (dog.grounded) {
        dog.dy = dog.jumpForce;
        dog.grounded = false;
      }
    };

    window.addEventListener("keydown", handleInput);
    canvas.addEventListener("touchstart", handleInput);
    canvas.addEventListener("mousedown", handleInput);

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleInput);
      canvas.removeEventListener("touchstart", handleInput);
      canvas.removeEventListener("mousedown", handleInput);
    };
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col relative overflow-hidden select-none">
      <div className="p-4 flex items-center justify-between z-10 relative">
        <Link href="/home">
          <motion.div whileTap={{ scale: 0.9 }} className="p-2 text-accent cursor-pointer">
            <ArrowLeft className="w-6 h-6" />
          </motion.div>
        </Link>
        <div className="text-center">
          <p className="font-display text-primary text-xl drop-shadow-[0_0_8px_#C8FF00]">{score}</p>
          <p className="font-sans text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Distance</p>
        </div>
        <div className="text-right px-2">
          <p className="font-display text-sm text-muted-foreground">{highScore}</p>
          <p className="font-sans text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Best</p>
        </div>
      </div>

      <div className="flex-1 w-full relative flex flex-col justify-end pb-safe">
        <canvas 
          ref={canvasRef}
          width={canvasWidth} 
          height={400}
          className="w-full h-[400px] border-y border-accent/30 bg-[#0D0D0D]"
        />

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-20">
            <h2 className="font-display text-3xl text-primary mb-4 text-shadow-glow">DOGE DASH</h2>
            <p className="font-sans text-white mb-8 text-center px-6">Tap or press Spacebar to jump over FUD and red candles.</p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-primary text-background font-display px-8 py-4 rounded-xl text-xl box-shadow-lime"
            >
              START
            </motion.button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur z-20">
            <div className="bg-card border-2 border-primary p-8 rounded-2xl flex flex-col items-center max-w-[90%] box-shadow-lime">
              <h2 className="font-display text-2xl text-white mb-6">REKT</h2>
              
              <div className="text-center mb-6">
                <p className="font-sans text-muted-foreground text-xs uppercase tracking-widest mb-1">Score</p>
                <p className="font-display text-4xl text-primary">{score}</p>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
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
    </div>
  );
}
