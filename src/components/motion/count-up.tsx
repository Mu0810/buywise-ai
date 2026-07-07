"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  /** Formats the interpolated value (e.g. `formatPrice`). Defaults to locale string. */
  format?: (value: number) => string;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Ticks a number up from zero when it scrolls into view — the ledger coming
 * alive. Falls back to the final value instantly for reduced motion.
 */
export function CountUp({
  value,
  format = (n) => Math.round(n).toLocaleString("en-IN"),
  duration = 1.2,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => format(0));

  useEffect(() => {
    if (!inView) return;
    // Reduced motion: a zero-duration tween still lands on the final value,
    // via the same frame-driven callback (no synchronous setState).
    const controls = animate(reduceMotion ? value : 0, value, {
      duration: reduceMotion ? 0 : duration,
      delay: reduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(format(latest)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, delay, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
