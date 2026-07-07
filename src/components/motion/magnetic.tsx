"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";

interface MagneticProps {
  children: ReactNode;
  /** How far the element leans toward the cursor (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Gives an element a faint gravitational pull toward the cursor — enough to
 * feel alive, never enough to chase. Inert for reduced motion and touch.
 */
export function Magnetic({
  children,
  strength = 0.18,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 240, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 240, damping: 18, mass: 0.5 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
