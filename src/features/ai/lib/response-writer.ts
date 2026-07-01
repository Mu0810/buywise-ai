import type { Retrieval } from "@/features/ai/lib/retrieval";
import type { ProductListItem } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

const CATEGORY_LABEL: Record<string, string> = {
  laptops: "laptops",
  smartphones: "phones",
  audio: "earbuds & headphones",
  cameras: "cameras",
  tablets: "tablets",
  wearables: "wearables",
  televisions: "TVs",
  appliances: "appliances",
  monitors: "monitors",
  gaming: "gaming gear",
};

const PRIORITY_PHRASE: Record<string, string> = {
  battery: "long battery life",
  gaming: "strong gaming performance",
  performance: "raw performance",
  camera: "camera quality",
  display: "a great display",
  value: "value for money",
  portability: "portability",
};

export function categoryLabel(slug?: string): string {
  return slug ? (CATEGORY_LABEL[slug] ?? slug) : "products";
}

export function buildRecommendationText(
  r: Retrieval,
  top: ProductListItem[],
): string {
  const label = categoryLabel(r.category);
  const budgetStr = r.budget ? ` under ${formatPrice(r.budget)}` : "";
  const priorityStr =
    r.priorities.length > 0
      ? ` for ${r.priorities.map((p) => PRIORITY_PHRASE[p] ?? p).join(" and ")}`
      : "";
  const pick = top[0];
  const cheapest = [...top].sort(
    (a, b) => (a.lowestPrice ?? 0) - (b.lowestPrice ?? 0),
  )[0];

  const lines = [
    `Here are the best ${label}${budgetStr}${priorityStr} I found across stores.`,
  ];
  if (pick) {
    lines.push(
      `My top pick is the ${pick.product.name}${
        pick.lowestPrice ? ` at ${formatPrice(pick.lowestPrice)}` : ""
      } — it scores ${pick.product.aiScore ?? "\u2014"}/100 overall from ${pick.product.reviewCount.toLocaleString("en-IN")} reviews analysed.`,
    );
  }
  if (cheapest && pick && cheapest.product.id !== pick.product.id) {
    lines.push(
      `Want to spend less? The ${cheapest.product.name}${
        cheapest.lowestPrice ? ` at ${formatPrice(cheapest.lowestPrice)}` : ""
      } is the best value in this list.`,
    );
  }
  lines.push(questionFor(r));
  return lines.join("\n\n");
}

function questionFor(r: Retrieval): string {
  const map: Record<string, string> = {
    laptops: "Want me to prioritise performance, battery, or portability?",
    smartphones: "Should I prioritise camera, battery, or performance?",
    audio: "Do you want the best noise cancellation, or the best value?",
    cameras: "Is this more for photos or video?",
    appliances: "What capacity and load type do you prefer?",
  };
  return (r.category && map[r.category]) || "Want me to refine by budget or brand?";
}

export function buildFollowUps(r: Retrieval): string[] {
  const base: Record<string, string[]> = {
    laptops: ["Mainly for gaming", "Prioritise battery life", "Keep it lightweight", "Windows only"],
    smartphones: ["Best camera", "Longest battery", "Under \u20b930,000", "Prefer Android"],
    audio: ["Best noise cancellation", "For workouts", "Under \u20b95,000"],
    cameras: ["Best for video", "Good for beginners", "Needs a viewfinder"],
    appliances: ["Front load", "Larger capacity", "Quietest option"],
  };
  const ups =
    r.category && base[r.category]
      ? [...base[r.category]]
      : ["Show cheaper options", "Best rated", "Best value"];
  if (!r.budget) ups.push("Set a budget");
  return ups.slice(0, 4);
}
