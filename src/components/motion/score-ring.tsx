"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import { CountUp } from "./count-up";

interface ScoreRingProps {
  score: number;
  /** Outer size in px. */
  size?: number;
  strokeWidth?: number;
  /** Extra delay before the ring starts drawing, in seconds. */
  delay?: number;
  showValue?: boolean;
  className?: string;
}

/**
 * The verdict, rendered: a gold ring that draws itself around the score.
 * Used anywhere an AI Score appears.
 */
export function ScoreRing({
  score,
  size = 64,
  strokeWidth = 5,
  delay = 0,
  showValue = true,
  className,
}: ScoreRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  const clamped = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = circumference * (1 - clamped / 100);

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`AI score ${clamped} out of 100`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-brand/15"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            inView
              ? { strokeDashoffset: target }
              : { strokeDashoffset: circumference }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }
          }
          className="stroke-brand"
        />
      </svg>
      {showValue && (
        <span
          className="absolute inset-0 flex items-center justify-center font-mono font-semibold tabular-nums"
          style={{ fontSize: size * 0.3 }}
        >
          <CountUp value={clamped} duration={1.3} delay={delay} />
        </span>
      )}
    </div>
  );
}
