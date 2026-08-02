import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { isWalletAvailable, useAuth } from "@/lib/useAuth";
import { CharacterImage } from "@/components/CharacterImage";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

export function LoginPage() {
  const [, setLocation] = useLocation();
  const { user, login, loginWithWallet } = useAuth();
  const [inputName, setInputName] = useState("");
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState("");

  useEffect(() => {
    if (user) {
      setLocation("/home");
    }
  }, [user, setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      login(inputName.trim());
      setLocation("/home");
    }
  };

  const handleWalletLogin = async () => {
    setWalletError("");
    setWalletLoading(true);

    try {
      await loginWithWallet();
      setLocation("/home");
    } catch (error) {
      setWalletError(
        error instanceof Error ? error.message : "Unable to connect your wallet.",
      );
    } finally {
      setWalletLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-48 h-48 mb-6"
        >
          <CharacterImage className="w-full h-full rounded-full overflow-hidden" />
        </motion.div>

        <h1 className="font-display text-3xl text-primary text-center mb-2 leading-tight">
          DOGXHOOD
        </h1>
        <p className="text-accent font-sans font-bold tracking-widest text-sm mb-12 text-shadow-glow">
          $DXHOOD · ROBINHOOD CHAIN
        </p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input 
            type="text" 
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your username, degen"
            className="w-full bg-card border-2 border-accent text-white p-4 rounded-xl font-sans text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all box-shadow-glow placeholder:text-muted-foreground"
            maxLength={15}
          />
          <motion.button 
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!inputName.trim()}
            className="w-full bg-primary text-background font-display py-5 rounded-xl text-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all box-shadow-lime"
          >
            LFG 🚀
          </motion.button>
        </form>

        <div className="my-6 flex w-full items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <div className="h-px flex-1 bg-accent/30" />
          <span>or</span>
          <div className="h-px flex-1 bg-accent/30" />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleWalletLogin}
          disabled={walletLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-accent bg-card py-4 font-display text-sm text-accent shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all hover:bg-accent/10 disabled:cursor-wait disabled:opacity-60"
        >
          <Wallet className="h-5 w-5" />
          {walletLoading ? "CONNECTING..." : "CONNECT METAMASK"}
        </motion.button>

        <p className="mt-3 text-center font-sans text-xs text-muted-foreground">
          {isWalletAvailable()
            ? "Use your wallet address as your DOGXHOOD identity."
            : "MetaMask not detected? Install it to connect your wallet."}
        </p>
        {walletError && (
          <p className="mt-3 text-center font-sans text-xs font-bold text-red-400">
            {walletError}
          </p>
        )}

        <div className="mt-12 flex gap-6 text-sm font-sans font-bold text-muted-foreground uppercase tracking-wider">
          <Link href="/how-to-play" className="hover:text-primary transition-colors">How to Play</Link>
          <span>|</span>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        </div>
      </div>
    </motion.div>
  );
}
