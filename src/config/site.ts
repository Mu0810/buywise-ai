import { env } from "@/lib/env";

/**
 * Global, brand-level configuration for BuyWise AI. Consumed by metadata,
 * navigation, and marketing surfaces.
 */
export const siteConfig = {
  name: "BuyWise AI",
  shortName: "BuyWise",
  tagline: "Shop smarter with AI",
  description:
    "BuyWise AI is your AI shopping analyst. Ask for anything — 'best coding laptop under \u20b970,000' — and get researched, compared, and value-scored recommendations across Amazon, Flipkart, Croma and more.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/opengraph-image`,
  keywords: [
    "AI shopping assistant",
    "price comparison India",
    "best laptop under budget",
    "product recommendations",
    "review analysis",
    "price drop alerts",
    "shopping intelligence",
  ],
  authors: [{ name: "BuyWise AI", url: env.NEXT_PUBLIC_APP_URL }],
  creator: "BuyWise AI",
  links: {
    twitter: "https://twitter.com/buywiseai",
    github: "https://github.com/buywiseai",
    support: "mailto:support@buywise.ai",
  },
  contactEmail: "hello@buywise.ai",
} as const;

export type SiteConfig = typeof siteConfig;
