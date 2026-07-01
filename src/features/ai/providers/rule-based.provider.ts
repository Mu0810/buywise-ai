import "server-only";

import { retrieveCandidates } from "@/features/ai/lib/retrieval";
import {
  buildFollowUps,
  buildRecommendationText,
  categoryLabel,
} from "@/features/ai/lib/response-writer";
import type { AIProvider } from "@/features/ai/providers/types";
import type { AssistantReply, ChatMessage } from "@/features/ai/types";
import type { ProductService } from "@/features/products/services/product.service";
import { formatPrice } from "@/lib/utils";

const CATEGORY_SUGGESTIONS = [
  "Best coding laptop under \u20b970,000",
  "Phone under \u20b925,000",
  "Noise-cancelling earbuds for travel",
  "Mirrorless camera for beginners",
];

/**
 * Deterministic recommendation engine. Extracts intent from the conversation,
 * retrieves and ranks catalog products, and writes a grounded reply. Requires
 * no external services — this is the default provider.
 */
export class RuleBasedProvider implements AIProvider {
  readonly name = "rule-based";

  constructor(private readonly products: ProductService) {}

  async respond(messages: ChatMessage[]): Promise<AssistantReply> {
    const userText = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join(" ");

    const retrieval = await retrieveCandidates(this.products, userText);

    if (!retrieval.category) {
      return {
        content:
          "Tell me what you're shopping for and I'll research the best options across Amazon, Flipkart, Croma and more. For example: \u201cbest coding laptop under \u20b970,000\u201d.",
        products: [],
        followUps: CATEGORY_SUGGESTIONS,
      };
    }

    const top = retrieval.items.slice(0, 3);
    if (top.length === 0) {
      const budgetStr = retrieval.budget
        ? ` under ${formatPrice(retrieval.budget)}`
        : "";
      return {
        content: `I couldn't find ${categoryLabel(retrieval.category)}${budgetStr} in the catalog yet. Try raising the budget or removing a brand filter.`,
        products: [],
        followUps: ["Increase budget", `Show all ${categoryLabel(retrieval.category)}`],
      };
    }

    return {
      content: buildRecommendationText(retrieval, top),
      products: top,
      followUps: buildFollowUps(retrieval),
    };
  }
}
