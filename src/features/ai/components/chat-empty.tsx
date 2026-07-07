"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "Best coding laptop under ₹70,000",
  "Gaming laptop under ₹80,000",
  "Best phone under ₹25,000",
  "Noise-cancelling earbuds for travel",
  "Mirrorless camera for beginners",
  "Best washing machine for a family",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ChatEmpty({ onPick }: { onPick: (text: string) => void }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex h-full flex-col items-center justify-center gap-6 py-10 text-center"
    >
      <motion.div
        variants={item}
        className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--grad-gold-1)] to-[var(--grad-gold-3)] text-[oklch(0.19_0.02_235)] shadow-lg shadow-brand/20"
      >
        <Sparkles className="size-7" />
      </motion.div>
      <motion.div variants={item} className="space-y-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          What are you shopping for?
        </h1>
        <p className="max-w-md text-muted-foreground">
          Describe what you need and I&apos;ll compare the best options across
          Amazon, Flipkart, Croma and more.
        </p>
      </motion.div>
      <motion.div
        variants={item}
        className="flex max-w-2xl flex-wrap justify-center gap-2"
      >
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onPick(suggestion)}
            className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/5 hover:text-foreground"
          >
            {suggestion}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}
