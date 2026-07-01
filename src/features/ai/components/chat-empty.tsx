"use client";

import { Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "Best coding laptop under ₹70,000",
  "Gaming laptop under ₹80,000",
  "Best phone under ₹25,000",
  "Noise-cancelling earbuds for travel",
  "Mirrorless camera for beginners",
  "Best washing machine for a family",
];

export function ChatEmpty({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 py-10 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
        <Sparkles className="size-7" />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          What are you shopping for?
        </h1>
        <p className="max-w-md text-muted-foreground">
          Describe what you need and I&apos;ll compare the best options across
          Amazon, Flipkart, Croma and more.
        </p>
      </div>
      <div className="flex max-w-2xl flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onPick(suggestion)}
            className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
