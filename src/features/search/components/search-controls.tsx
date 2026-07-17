"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SORTS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
  { value: "ai-score", label: "AI score" },
  { value: "value", label: "Best value" },
];

export function SearchControls({
  categories,
}: {
  categories: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [min, setMin] = useState(params.get("min") ?? "");
  const [max, setMax] = useState(params.get("max") ?? "");
  // Shared-layout id so the active-chip highlight slides between categories.
  const pillId = useId();

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value === null || value === "") sp.delete(key);
      else sp.set(key, value);
    }
    router.push(`/search?${sp.toString()}`);
  }

  function applyPrice(event: FormEvent) {
    event.preventDefault();
    update({ min: min || null, max: max || null });
  }

  const activeCategory = params.get("category");
  const sort = params.get("sort") ?? "relevance";

  const chips = [
    { slug: null as string | null, name: "All" },
    ...categories.map((c) => ({ slug: c.slug as string | null, name: c.name })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Category
        </span>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => {
            const active = activeCategory === chip.slug || (!activeCategory && chip.slug === null);
            return (
              <button
                key={chip.slug ?? "all"}
                type="button"
                onClick={() => update({ category: chip.slug })}
                className={cn(
                  "relative rounded-full border px-3 py-1 text-sm transition-colors duration-200",
                  active
                    ? "border-transparent text-brand"
                    : "border-border text-muted-foreground hover:border-brand/30 hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId={pillId}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-brand/10 ring-1 ring-brand"
                  />
                )}
                <span className="relative">{chip.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="sort"
          className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
        >
          Sort by
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(event) => update({ sort: event.target.value })}
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors duration-200 hover:border-brand/30 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={applyPrice} className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Price (₹)
        </span>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min"
            aria-label="Minimum price"
          />
          <span className="text-muted-foreground">&ndash;</span>
          <Input
            type="number"
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max"
            aria-label="Maximum price"
          />
        </div>
        <Button type="submit" variant="outline" size="sm">
          Apply
        </Button>
      </form>
    </div>
  );
}
