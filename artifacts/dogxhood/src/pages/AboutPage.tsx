import { motion } from "framer-motion";
import { CharacterImage } from "@/components/CharacterImage";

export function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[100dvh] w-full pb-24 pt-8 px-4 flex flex-col items-center bg-background"
    >
      <div className="w-full max-w-md">
        <h1 className="font-display text-2xl text-accent mb-8 text-center text-shadow-glow">
          TOKENOMICS
        </h1>

        <div className="mb-10 w-full h-48 relative rounded-2xl overflow-hidden border-2 border-primary box-shadow-lime">
          <CharacterImage className="absolute inset-0 object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="font-display text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">DOG IN HOOD</p>
          </div>
        </div>

        <div className="bg-card border border-accent/50 rounded-2xl p-6 mb-8 space-y-4 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
          <div className="flex justify-between items-center border-b border-muted pb-3">
            <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">Token</span>
            <span className="font-display text-primary text-sm">$DXHOOD</span>
          </div>
          <div className="flex justify-between items-center border-b border-muted pb-3">
            <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">Chain</span>
            <span className="font-display text-white text-xs">Robinhood Chain</span>
          </div>
          <div className="flex justify-between items-center border-b border-muted pb-3">
            <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">Supply</span>
            <span className="font-display text-white text-xs">1,000,000,000</span>
          </div>
          <div className="flex justify-between items-center pb-1">
            <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">Tax</span>
            <span className="font-display text-accent text-xs">0%</span>
          </div>
        </div>

        <div className="space-y-4">
          <a href="#" className="block w-full bg-primary text-background font-display py-4 rounded-xl text-center text-sm box-shadow-lime hover:scale-[1.02] transition-transform">
            BUY $DXHOOD
          </a>
          <a href="#" className="block w-full bg-card border-2 border-accent text-accent font-display py-4 rounded-xl text-center text-sm shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:bg-accent/10 transition-colors">
            JOIN TELEGRAM
          </a>
          <a href="#" className="block w-full bg-card border-2 border-accent text-accent font-display py-4 rounded-xl text-center text-sm shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:bg-accent/10 transition-colors">
            FOLLOW X
          </a>
        </div>
      </div>
    </motion.div>
  );
}
