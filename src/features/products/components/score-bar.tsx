"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { CountUp } from "@/components/motion";
import { cn } from "@/lib/utils";

function toneFor(score: number): string {
  if (score >= 80) return "bg-success";
  if (score >= 60) return "bg-brand";
  if (score >= 40) return "bg-orange-500";
  return "bg-destructive";
}

/**
 * Sub-score bar that fills to its value as it scrolls into view, with the
 * number ticking up alongside. `delay` staggers bars within a group.
 */
export function ScoreBar({
  label,
  score,
  delay = 0,
  className,
}: {
  label: string;
  score: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-medium tabular-nums">
          <CountUp value={clamped} duration={1} delay={delay} />
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${clamped}%` } : { width: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1, delay, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn("h-full rounded-full", toneFor(clamped))}
        />
      </div>
    </div>
  );
}
