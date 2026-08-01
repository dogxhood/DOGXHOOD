import { motion } from "framer-motion";
import { CharacterImage } from "@/components/CharacterImage";

export function HowToPlayPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[100dvh] w-full pb-24 pt-8 px-4 flex flex-col items-center bg-background"
    >
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24">
            <CharacterImage className="rounded-full" />
          </div>
        </div>
        
        <h1 className="font-display text-2xl text-primary mb-2 text-center text-shadow-glow">
          HOW TO PLAY
        </h1>
        <p className="font-sans text-muted-foreground text-center mb-10 italic">
          "It's simple, degen. Just tap. A lot."
        </p>

        <div className="space-y-8">
          <Section 
            emoji="👆" 
            title="HOOD TAPPER" 
            content="Tap the DOGXHOOD character as fast as you can. Tap quickly to build your combo multiplier up to 10x. Game ends after 60 seconds."
          />
          <Section 
            emoji="🏃" 
            title="DOGE DASH" 
            content="Endless runner. Tap or press Spacebar to jump over FUD blocks and red candles. Speed increases over time. One hit and you're rekt."
          />
          <Section 
            emoji="🪙" 
            title="MOON OR FUD" 
            content="10 rounds of pure degeneracy. Guess whether the coin will land on MOON or FUD. Win = +100 points, Lose = -50 points."
          />
        </div>
      </div>
    </motion.div>
  );
}

function Section({ emoji, title, content }: { emoji: string, title: string, content: string }) {
  return (
    <div className="bg-card border border-accent/30 p-6 rounded-2xl relative overflow-hidden group hover:border-primary transition-colors">
      <div className="absolute -right-4 -top-4 text-7xl opacity-5 group-hover:opacity-10 transition-opacity grayscale">
        {emoji}
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{emoji}</span>
        <h2 className="font-display text-sm text-white">{title}</h2>
      </div>
      <p className="font-sans text-muted-foreground text-sm leading-relaxed">
        {content}
      </p>
    </div>
  );
}
