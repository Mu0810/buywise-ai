const CATEGORY_KEYWORDS: Record<string, string[]> = {
  laptops: ["gaming laptop", "coding laptop", "laptop", "notebook", "macbook", "ultrabook"],
  smartphones: ["smartphone", "phone", "mobile", "iphone", "android", "pixel"],
  audio: ["earbuds", "earphone", "headphone", "headphones", "tws", "buds", "airpods"],
  cameras: ["mirrorless", "dslr", "camera", "vlogging"],
  tablets: ["tablet", "ipad"],
  wearables: ["smartwatch", "watch", "fitness band"],
  televisions: ["television", "smart tv", "tv"],
  appliances: ["washing machine", "washer", "refrigerator", "fridge", "appliance"],
  monitors: ["monitor"],
  gaming: ["console", "playstation", "xbox"],
};

/** Detect the most specific matching category slug from free text. */
export function detectCategory(query: string): string | undefined {
  const q = query.toLowerCase();
  let best: { slug: string; len: number } | undefined;
  for (const [slug, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (q.includes(kw) && (!best || kw.length > best.len)) {
        best = { slug, len: kw.length };
      }
    }
  }
  return best?.slug;
}

/** Extract a budget (max price, in INR) from phrases like "under ₹70,000" or "25k". */
export function extractBudget(query: string): number | undefined {
  const q = query.toLowerCase().replace(/,/g, "");
  const lakh = q.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lac)/);
  if (lakh) return Math.round(Number(lakh[1]) * 100000);
  const k = q.match(/₹?\s*(\d+(?:\.\d+)?)\s*k\b/);
  if (k) return Math.round(Number(k[1]) * 1000);
  const bounded = q.match(
    /(?:under|below|upto|up to|within|less than|budget|around)\s*₹?\s*(\d{3,7})/,
  );
  if (bounded) return Number(bounded[1]);
  const rupee = q.match(/₹\s*(\d{3,7})/);
  if (rupee) return Number(rupee[1]);
  return undefined;
}

const PRIORITY_KEYWORDS: Record<string, string[]> = {
  gaming: ["gaming", "game", "fps"],
  battery: ["battery", "backup", "long lasting"],
  camera: ["camera", "photography", "photos", "vlog"],
  portability: ["light", "lightweight", "thin", "portable", "compact"],
  performance: ["performance", "fast", "powerful", "speed"],
  display: ["display", "screen", "amoled", "oled", "refresh"],
  value: ["cheap", "budget", "value", "affordable"],
};

/** Extract priority tags (e.g. gaming, battery, camera) from free text. */
export function extractPriorities(query: string): string[] {
  const q = query.toLowerCase();
  return Object.entries(PRIORITY_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => q.includes(kw)))
    .map(([tag]) => tag);
}

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "for", "to", "in", "on", "with", "best",
  "good", "cheap", "under", "below", "over", "above", "around", "upto", "less",
  "than", "within", "me", "my", "want", "need", "buy", "buying", "show", "find",
  "looking", "look", "please", "recommend", "suggest", "some", "any", "new",
  "top", "price", "prices", "deal", "deals", "rs", "inr", "rupees", "rupee",
  "vs", "between", "is", "are", "which", "what", "that", "this",
]);

/**
 * Break free text into meaningful, de-duplicated lowercase search tokens.
 * Drops punctuation, single characters, and common shopping stop-words so the
 * remaining tokens are useful for matching against product fields.
 */
export function tokenize(query: string): string[] {
  const tokens = new Set<string>();
  for (const raw of query.toLowerCase().split(/[^a-z0-9]+/)) {
    if (raw.length < 2 || STOPWORDS.has(raw)) continue;
    tokens.add(raw);
  }
  return [...tokens];
}
