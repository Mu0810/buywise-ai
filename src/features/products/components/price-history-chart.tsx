import type { ProductDetail } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

export function PriceHistoryChart({
  history,
}: {
  history: ProductDetail["priceHistory"];
}) {
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

  return (
    <div className="flex flex-col gap-3">
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
        <path d={area} fill="url(#priceHistory)" />
        <path
          d={line}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
