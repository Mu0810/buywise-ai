"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Horizontal travel in px. */
  x?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Entrance blur in px (set 0 to disable). */
  blur?: number;
  /** Initial scale before the element settles. */
  scale?: number;
  duration?: number;
  className?: string;
}

/**
 * Fades, lifts and de-blurs content when it scrolls into view (once).
 * Supports directional movement for more expressive section choreography and
 * renders immediately when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 28,
  blur = 8,
  scale = 0.985,
  duration = 0.8,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x, y, scale, filter: `blur(${blur}px)` }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-70px", amount: 0.12 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration, delay, ease: EASE_OUT_EXPO }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.965, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: EASE_OUT_EXPO },
  },
};

interface StaggerGroupProps {
  children: ReactNode;
  /** Delay between children, in seconds. */
  stagger?: number;
  className?: string;
}

/**
 * Orchestrates children into view one after another. Wrap each child in
 * `StaggerItem`. Container triggers once, on scroll into view.
 */
export function StaggerGroup({
  children,
  stagger = 0.08,
  className,
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={groupVariants}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-70px", amount: 0.1 }}
      custom={reduceMotion ? 0 : stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export { EASE_OUT_EXPO };
