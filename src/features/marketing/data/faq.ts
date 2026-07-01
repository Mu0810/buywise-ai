export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How does BuyWise AI find the best product?",
    answer:
      "You describe what you need in plain language. BuyWise asks a few clarifying questions, then researches matching products across stores, compares specs and prices, analyzes reviews, and ranks them by value for your specific needs.",
  },
  {
    question: "Which stores does BuyWise search?",
    answer:
      "Amazon, Flipkart, Croma, Reliance Digital and Vijay Sales, plus official brand stores like Apple, Samsung, Dell, Lenovo, HP and ASUS. The provider-based architecture lets us add new stores over time.",
  },
  {
    question: "How do you estimate fake reviews?",
    answer:
      "We use explainable heuristics — patterns like review bursts, repetitive language, unverified purchases and rating anomalies. These are clearly labelled as estimates to help you judge credibility, not absolute verdicts.",
  },
  {
    question: "Are the prices always accurate?",
    answer:
      "We refresh prices frequently and show when each was last checked. Prices and availability change often, so always confirm the final price on the retailer's page before buying.",
  },
  {
    question: "Is BuyWise free?",
    answer:
      "Yes. The Free plan includes daily AI searches, price comparison and wishlists. Premium unlocks unlimited searches, full review analysis, price history and unlimited alerts.",
  },
  {
    question: "Does BuyWise make money from my purchases?",
    answer:
      "BuyWise may earn affiliate commissions when you buy through our links. This never changes the price you pay or how we rank products — recommendations are based purely on value.",
  },
  {
    question: "Can I track a price and get alerts?",
    answer:
      "Absolutely. Set a target price on any product and BuyWise notifies you by email or push the moment it drops, along with the full price history so you know if it's a genuine deal.",
  },
];
