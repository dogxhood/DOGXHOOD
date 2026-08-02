import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

type InfoSection = {
  title: string;
  body: string;
};

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[100dvh] w-full bg-background px-4 pb-28 pt-8"
    >
      <div className="mx-auto w-full max-w-md">
        <Link
          href="/about"
          className="mb-8 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to About
        </Link>

        <div className="mb-7">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/50 bg-card text-primary shadow-[0_0_18px_rgba(200,255,0,0.12)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </p>
          <h1 className="font-display text-2xl leading-tight text-white">{title}</h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </div>

        <div className="space-y-3">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-accent/30 bg-card p-5"
            >
              <h2 className="mb-3 font-display text-xs text-primary">{section.title}</h2>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-7 border-t border-accent/20 pt-5 text-center">
          <Link
            href="/home"
            className="font-sans text-xs font-bold uppercase tracking-wider text-accent hover:text-primary"
          >
            Return to DOGXHOOD
          </Link>
        </div>
      </div>
    </motion.div>
  );
}