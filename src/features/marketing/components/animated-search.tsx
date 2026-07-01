"use client";

import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const QUERIES = [
  "Best coding laptop under \u20b970,000",
  "Gaming laptop under \u20b980,000",
  "Best phone under \u20b925,000",
  "Noise-cancelling earbuds for travel",
  "Mirrorless camera for beginners",
  "Best washing machine for a family",
];

export function AnimatedSearch() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = QUERIES[index % QUERIES.length];
    const atFull = !deleting && text === current;
    const atEmpty = deleting && text === "";
    const delay = atFull ? 1800 : atEmpty ? 400 : deleting ? 30 : 55;

    const timer = setTimeout(() => {
      if (atFull) {
        setDeleting(true);
      } else if (atEmpty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % QUERIES.length);
      } else {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <div className="group relative w-full max-w-2xl">
      <div
        className="absolute -inset-px rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 opacity-60 blur-md transition duration-500 group-hover:opacity-90"
        aria-hidden
      />
      <div className="relative flex items-center gap-3 rounded-2xl border border-border/60 bg-background/90 p-2 pl-4 shadow-xl backdrop-blur">
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <div
          className="flex h-11 flex-1 items-center overflow-hidden text-left"
          aria-hidden
        >
          <span className="truncate text-base text-foreground sm:text-lg">
            {text}
          </span>
          <span className="ml-0.5 inline-block h-5 w-px animate-pulse bg-foreground/70" />
        </div>
        <Button
          size="lg"
          className="h-11 gap-1.5 px-5"
          onClick={() => router.push("/register")}
        >
          Ask BuyWise <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
