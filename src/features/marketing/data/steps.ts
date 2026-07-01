import {
  BadgeIndianRupee,
  ListChecks,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    icon: MessageSquare,
    title: "Ask anything",
    description:
      "Type what you need — \u201cbest coding laptop under \u20b970,000\u201d — just like you would ask a friend.",
  },
  {
    icon: ListChecks,
    title: "Answer a few smart questions",
    description:
      "Windows or Mac? Battery priority? Gaming? BuyWise narrows things down before recommending.",
  },
  {
    icon: Sparkles,
    title: "Get scored recommendations",
    description:
      "Products compared across stores with AI scores, pros and cons, and a clear verdict on value.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Track & buy at the best price",
    description:
      "Set price-drop alerts, watch price history, and buy from the store with the best overall deal.",
  },
];
