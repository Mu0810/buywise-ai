import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

import { comparisonColumns, comparisonRows } from "../data/comparison";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function Cell({ value, highlight }: { value: boolean; highlight?: boolean }) {
  return (
    <td className={cn("p-4 text-center", highlight && "bg-brand/5")}>
      {value ? (
        <Check
          className={cn(
            "mx-auto size-5",
            highlight ? "text-brand" : "text-muted-foreground/70",
          )}
          strokeWidth={2.5}
        />
      ) : (
        <Minus className="mx-auto size-4 text-muted-foreground/40" />
      )}
    </td>
  );
}

export function Comparison() {
  return (
    <section
      id="comparison"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Why BuyWise"
          title="A smarter way to shop"
          description="See how BuyWise compares to price aggregators and old-fashioned manual research."
        />
      </Reveal>
      <Reveal
        delay={0.1}
        className="mt-14 overflow-hidden rounded-2xl border border-border/60"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
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
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.capability}
                  className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/30"
                >
                  <td className="p-4 text-left text-muted-foreground">
                    {row.capability}
                  </td>
                  <Cell value={row.buywise} highlight />
                  <Cell value={row.aggregators} />
                  <Cell value={row.manual} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
