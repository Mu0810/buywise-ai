export interface PricingTier {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  highlighted?: boolean;
  cta: string;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    description: "Everything you need to shop smarter.",
    monthly: 0,
    yearly: 0,
    cta: "Get started",
    features: [
      "5 AI searches per day",
      "Multi-store price comparison",
      "Basic review summaries",
      "Wishlist & recently viewed",
      "3 active price alerts",
    ],
  },
  {
    name: "Premium",
    description: "For serious shoppers who want every edge.",
    monthly: 299,
    yearly: 2990,
    highlighted: true,
    cta: "Start Premium",
    features: [
      "Unlimited AI searches",
      "Full review analysis + fake-review scores",
      "Unlimited price alerts",
      "Complete price history",
      "Deal alerts & buying assistant",
      "Priority AI responses",
    ],
  },
  {
    name: "Family",
    description: "Smart shopping for the whole household.",
    monthly: 499,
    yearly: 4990,
    cta: "Start Family",
    features: [
      "Everything in Premium",
      "5 member seats",
      "Family shopping lists",
      "Shared wishlists",
      "Budget planner",
      "Gift recommendations",
    ],
  },
];
