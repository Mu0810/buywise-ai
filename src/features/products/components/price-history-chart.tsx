"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import type { ProductDetail } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

export function PriceHistoryChart({
  history,
}: {
  history: ProductDetail["priceHistory"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  if (history.length < 2) return null;

  const prices = history.map((h) => h.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const width = 600;
  const height = 160;
  const pad = 8;

  const points = history.map((point, i) => ({
    x: pad + (i / (history.length - 1)) * (width - 2 * pad),
    y: pad + (1 - (point.price - min) / range) * (height - 2 * pad),
  }));
  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const first = points[0];
  const last = points[points.length - 1];
  const area = `${line} L${last.x.toFixed(1)},${height - pad} L${first.x.toFixed(1)},${height - pad} Z`;
  const current = prices[prices.length - 1];

  const draw = reduceMotion
    ? { duration: 0 }
    : { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">
          Lowest tracked:{" "}
          <span className="font-medium text-foreground">{formatPrice(min)}</span>
        </span>
        <span className="text-muted-foreground">
          Current:{" "}
          <span className="font-medium text-foreground">
            {formatPrice(current)}
          </span>
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-40 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Price history over the last 90 days"
      >
        <defs>
          <linearGradient id="priceHistory" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#priceHistory)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ ...draw, delay: reduceMotion ? 0 : 0.5 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={draw}
        />
        {/* Current-price marker lands as the line finishes drawing. */}
        <motion.circle
          cx={last.x}
          cy={last.y}
          r="4"
          fill="var(--brand)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            delay: reduceMotion ? 0 : 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: `${last.x}px ${last.y}px` }}
        />
      </svg>
    </div>
  );
}
