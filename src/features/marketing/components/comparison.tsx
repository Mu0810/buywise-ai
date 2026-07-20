"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, Minus } from "lucide-react";

import { EASE_OUT_EXPO } from "@/components/motion";
import { cn } from "@/lib/utils";

import { comparisonColumns, comparisonRows } from "../data/comparison";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const bodyVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

function Cell({ value, highlight }: { value: boolean; highlight?: boolean }) {
  return (
    <td className={cn("p-4 text-center", highlight && "bg-brand/5")}>
      <span
        className={cn(
          "mx-auto flex size-8 items-center justify-center rounded-full transition-all duration-300 group-hover/row:scale-110",
          value && highlight && "bg-brand/10 shadow-brand/20 shadow-sm",
        )}
      >
        {value ? (
          <Check
            className={cn(
              "size-5",
              highlight ? "text-brand" : "text-muted-foreground/70",
            )}
            strokeWidth={2.5}
          />
        ) : (
          <Minus className="text-muted-foreground/40 size-4" />
        )}
      </span>
    </td>
  );
}

export function Comparison() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="comparison" className="relative isolate overflow-hidden">
      <span
        aria-hidden
        className="animate-twinkle bg-brand absolute top-24 right-[9%] -z-10 size-1.5 rounded-full [animation-delay:-2s]"
      />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Why BuyWise"
            title="A smarter way to shop"
            description="See how BuyWise compares to price aggregators and old-fashioned manual research."
          />
        </Reveal>
        <Reveal
          delay={0.1}
          className="group border-border/60 bg-card relative mt-14 overflow-hidden rounded-2xl border shadow-xl shadow-black/[0.03]"
        >
          <span
            aria-hidden
            className="animate-scan-x via-brand pointer-events-none absolute top-0 z-20 h-px w-1/3 bg-gradient-to-r from-transparent to-transparent shadow-[0_0_12px_var(--brand)]"
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-border/60 bg-muted/40 border-b">
                  <th className="p-4 text-left font-medium">Capability</th>
                  {comparisonColumns.map((col, index) => (
                    <th
                      key={col}
                      className={cn(
                        "p-4 text-center font-medium",
                        index === 0 && "bg-brand/10 text-brand",
                      )}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody
                variants={bodyVariants}
                initial={reduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-80px", amount: 0.2 }}
              >
                {comparisonRows.map((row) => (
                  <motion.tr
                    variants={rowVariants}
                    key={row.capability}
                    className="group/row border-border/40 hover:bg-muted/30 border-b transition-colors last:border-0"
                  >
                    <td className="text-muted-foreground group-hover/row:text-foreground p-4 text-left transition-colors">
                      {row.capability}
                    </td>
                    <Cell value={row.buywise} highlight />
                    <Cell value={row.aggregators} />
                    <Cell value={row.manual} />
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
