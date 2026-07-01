"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

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

function chipClass(active: boolean): string {
  return cn(
    "rounded-full border px-3 py-1 text-sm transition-colors",
    active
      ? "border-brand bg-brand/10 text-brand"
      : "border-border text-muted-foreground hover:text-foreground",
  );
}

export function SearchControls({
  categories,
}: {
  categories: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [min, setMin] = useState(params.get("min") ?? "");
  const [max, setMax] = useState(params.get("max") ?? "");

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Category
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => update({ category: null })}
            className={chipClass(!activeCategory)}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              type="button"
              key={c.slug}
              onClick={() => update({ category: c.slug })}
              className={chipClass(activeCategory === c.slug)}
            >
              {c.name}
            </button>
          ))}
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
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
