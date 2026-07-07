import { ScoreBar } from "@/features/products/components/score-bar";
import type { ProductDetail } from "@/features/products/types";

const SCORE_FIELDS: { key: keyof ProductDetail; label: string }[] = [
  { key: "performanceScore", label: "Performance" },
  { key: "batteryScore", label: "Battery" },
  { key: "displayScore", label: "Display" },
  { key: "cameraScore", label: "Camera" },
  { key: "valueScore", label: "Value for money" },
  { key: "buildScore", label: "Build quality" },
  { key: "repairScore", label: "Repairability" },
];

export function ProductScores({ product }: { product: ProductDetail }) {
  const scores = SCORE_FIELDS.map((field) => ({
    label: field.label,
    value: product[field.key] as number | null,
  })).filter(
    (s): s is { label: string; value: number } => typeof s.value === "number",
  );

  if (scores.length === 0) return null;

  return (
    <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {scores.map((s, index) => (
        <ScoreBar
          key={s.label}
          label={s.label}
          score={s.value}
          delay={index * 0.07}
        />
      ))}
    </div>
  );
}
