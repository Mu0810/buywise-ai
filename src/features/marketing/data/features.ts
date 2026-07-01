import {
  BellRing,
  BrainCircuit,
  GitCompareArrows,
  Gauge,
  IndianRupee,
  MessagesSquare,
  Store,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: "AI shopping assistant",
    description:
      "Ask in plain language. BuyWise asks a few smart follow-ups, then recommends the right product for you.",
  },
  {
    icon: Store,
    title: "Multi-store search",
    description:
      "Amazon, Flipkart, Croma, Reliance Digital, Vijay Sales and official brand stores — searched together.",
  },
  {
    icon: Gauge,
    title: "Deep product analysis",
    description:
      "Explainable scores for performance, battery, display, camera, value for money and repairability.",
  },
  {
    icon: MessagesSquare,
    title: "Review intelligence",
    description:
      "Summaries, common praises and complaints, long-term ownership insights and fake-review estimates.",
  },
  {
    icon: IndianRupee,
    title: "Price comparison",
    description:
      "See the lowest price, fastest delivery, official store, best cashback and live coupons at a glance.",
  },
  {
    icon: BellRing,
    title: "Price drop alerts",
    description:
      "Track full price history and get notified the moment a product drops to your target price.",
  },
  {
    icon: GitCompareArrows,
    title: "Compare & wishlist",
    description:
      "Side-by-side comparisons, wishlists, recently viewed and a running tally of money saved.",
  },
  {
    icon: WandSparkles,
    title: "Personalized for you",
    description:
      "Recommendations tuned to your budget, preferred brands and the priorities that matter to you.",
  },
];
