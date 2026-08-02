import { motion } from "framer-motion";
import { CharacterImage } from "@/components/CharacterImage";
import { Link } from "wouter";

const games = [
  {
    number: "01",
    title: "HOOD TAPPER",
    description:
      "Tap the DOGXHOOD character as fast as possible. Build your combo multiplier and chase the highest score before the 60 second round ends.",
  },
  {
    number: "02",
    title: "DOGE DASH",
    description:
      "Jump over FUD blocks and red candles in a fast endless runner. The pace keeps rising, so one mistake can end your run.",
  },
  {
    number: "03",
    title: "MOON OR FUD",
    description:
      "Make a prediction across 10 rounds. Choose MOON or FUD, watch the flip, and build your score by reading the next move correctly.",
  },
];

export function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[100dvh] w-full pb-24 pt-8 px-4 flex flex-col items-center bg-background"
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-sans text-xs text-primary uppercase tracking-[0.3em] font-bold mb-3">
            The DOGXHOOD Game Hub
          </p>
          <h1 className="font-display text-2xl text-accent text-shadow-glow">
            ABOUT DOGXHOOD
          </h1>
        </div>

        <div className="mb-8 w-full h-48 relative rounded-2xl overflow-hidden border-2 border-primary box-shadow-lime">
          <CharacterImage className="absolute inset-0 object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="font-display text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              DOG IN HOOD
            </p>
          </div>
        </div>

        <div className="bg-card border border-accent/50 rounded-2xl p-6 mb-8 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            DOGXHOOD is a browser game hub built around the DOGXHOOD character
            and its community on Robinhood Chain. Pick a challenge, play for a
            high score, and come back to beat your best run. Every game is easy
            to start and difficult to master.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="font-display text-sm text-primary mb-4 text-shadow-glow">
            PLAY THE GAMES
          </h2>
          <div className="space-y-3">
            {games.map((game) => (
              <div
                key={game.number}
                className="bg-card border border-accent/30 rounded-2xl p-5 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display text-xs text-primary">
                    {game.number}
                  </span>
                  <h3 className="font-display text-xs text-white">
                    {game.title}
                  </h3>
                </div>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {game.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-accent/50 rounded-2xl p-6 mb-8 space-y-4 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
          <div className="flex justify-between items-center border-b border-muted pb-3">
            <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">
              Token
            </span>
            <span className="font-display text-primary text-sm">$DXHOOD</span>
          </div>
          <div className="flex justify-between items-center border-b border-muted pb-3">
            <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">
              Chain
            </span>
            <span className="font-display text-white text-xs">
              Robinhood Chain
            </span>
          </div>
          <div className="flex justify-between items-center pb-1">
            <span className="font-sans text-muted-foreground uppercase tracking-widest text-xs font-bold">
              Tax
            </span>
            <span className="font-display text-accent text-xs">0%</span>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href="https://t.me/playdxhood"
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-card border-2 border-accent text-accent font-display py-4 rounded-xl text-center text-sm shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:bg-accent/10 transition-colors"
          >
            JOIN TELEGRAM
          </a>
          <a
            href="https://x.com/dogxhood"
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-card border-2 border-accent text-accent font-display py-4 rounded-xl text-center text-sm shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:bg-accent/10 transition-colors"
          >
            FOLLOW @DOGXHOOD ON X
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 border-t border-accent/20 pt-6 text-center">
          <Link href="/credentials" className="font-sans text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary">
            Credentials
          </Link>
          <Link href="/cookies" className="font-sans text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary">
            Cookies
          </Link>
          <Link href="/legal" className="font-sans text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary">
            Legal
          </Link>
        </div>

        <a
          href="https://orynth.dev/projects/dogxhood"
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex justify-center rounded-xl border border-accent/30 bg-card p-4 hover:border-primary transition-colors"
          aria-label="Featured on Orynth"
        >
          <img
            src="https://orynth.dev/api/badge/dogxhood?theme=light&style=default"
            alt="Featured on Orynth"
            className="max-w-full h-auto"
          />
        </a>
      </div>
    </motion.div>
  );
}
