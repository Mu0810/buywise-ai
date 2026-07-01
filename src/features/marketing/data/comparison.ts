export interface ComparisonRow {
  capability: string;
  buywise: boolean;
  aggregators: boolean;
  manual: boolean;
}

export const comparisonColumns = [
  "BuyWise AI",
  "Price aggregators",
  "Manual research",
] as const;

export const comparisonRows: ComparisonRow[] = [
  { capability: "Conversational AI recommendations", buywise: true, aggregators: false, manual: false },
  { capability: "Cross-store price comparison", buywise: true, aggregators: true, manual: false },
  { capability: "Review summarization", buywise: true, aggregators: false, manual: true },
  { capability: "Fake-review estimates", buywise: true, aggregators: false, manual: false },
  { capability: "Value-for-money scoring", buywise: true, aggregators: false, manual: false },
  { capability: "Price history & drop alerts", buywise: true, aggregators: true, manual: false },
  { capability: "Personalized follow-up questions", buywise: true, aggregators: false, manual: false },
];
