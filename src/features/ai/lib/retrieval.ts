import "server-only";

import type { ProductService } from "@/features/products/services/product.service";
import type { ProductListItem } from "@/features/products/types";
import {
  detectCategory,
  extractBudget,
  extractPriorities,
} from "@/features/search/lib/query-parser";

const BRAND_KEYWORDS: Record<string, string> = {
  apple: "apple", macbook: "apple", iphone: "apple", ipad: "apple",
  samsung: "samsung", galaxy: "samsung", dell: "dell", lenovo: "lenovo",
  hp: "hp", asus: "asus", rog: "asus", acer: "acer", sony: "sony", lg: "lg",
  oneplus: "oneplus", xiaomi: "xiaomi", redmi: "xiaomi", realme: "realme",
  nothing: "nothing", google: "google", pixel: "google", boat: "boat",
  jbl: "jbl", canon: "canon", nikon: "nikon", bosch: "bosch",
};

export function detectBrands(text: string): string[] {
  const q = text.toLowerCase();
  const slugs = new Set<string>();
  for (const [keyword, slug] of Object.entries(BRAND_KEYWORDS)) {
    if (q.includes(keyword)) slugs.add(slug);
  }
  return [...slugs];
}

export interface Retrieval {
  category?: string;
  budget?: number;
  priorities: string[];
  brands: string[];
  items: ProductListItem[];
}

const PRIORITY_SCORE: Record<
  string,
  (p: ProductListItem["product"]) => number
> = {
  battery: (p) => p.batteryScore ?? 0,
  gaming: (p) => p.performanceScore ?? 0,
  performance: (p) => p.performanceScore ?? 0,
  camera: (p) => p.cameraScore ?? 0,
  display: (p) => p.displayScore ?? 0,
  value: (p) => p.valueScore ?? 0,
  portability: (p) => p.buildScore ?? 0,
};

export function rankByPriority(
  items: ProductListItem[],
  priorities: string[],
): ProductListItem[] {
  const score = (item: ProductListItem) => {
    let s = item.product.aiScore ?? 0;
    for (const pr of priorities) {
      s += (PRIORITY_SCORE[pr]?.(item.product) ?? 0) * 0.5;
    }
    return s;
  };
  return [...items].sort((a, b) => score(b) - score(a));
}

export async function retrieveCandidates(
  productService: ProductService,
  userText: string,
): Promise<Retrieval> {
  const category = detectCategory(userText);
  const budget = extractBudget(userText);
  const priorities = extractPriorities(userText);
  const brands = detectBrands(userText);
  if (!category) return { category, budget, priorities, brands, items: [] };

  const items = await productService.search({
    categorySlug: category,
    maxPrice: budget,
    brandSlugs: brands.length > 0 ? brands : undefined,
    sort: "ai-score",
    limit: 12,
  });
  return {
    category,
    budget,
    priorities,
    brands,
    items: rankByPriority(items, priorities),
  };
}
