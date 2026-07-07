"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  /** Entrance blur in px (set 0 to disable). */
  blur?: number;
  duration?: number;
  className?: string;
}

/**
 * Fades, lifts and de-blurs content when it scrolls into view (once).
 * The blur pass makes entrances feel printed-in rather than slid-in.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  blur = 5,
  duration = 0.7,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
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
  return (
    <motion.div
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={stagger}
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
