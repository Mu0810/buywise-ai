import "server-only";

import OpenAI from "openai";

import { retrieveCandidates } from "@/features/ai/lib/retrieval";
import type { AIProvider } from "@/features/ai/providers/types";
import type { AssistantReply, ChatMessage } from "@/features/ai/types";
import type { ProductService } from "@/features/products/services/product.service";
import type { ProductListItem } from "@/features/products/types";
import { env } from "@/lib/env";

const SYSTEM_PROMPT = `You are BuyWise AI, a concise, trustworthy shopping analyst for the Indian market (prices in INR).
Rules:
- Recommend ONLY from the candidate products provided. Never invent products, prices or specs.
- Be concise and practical. Name a top pick and explain why in one or two sentences.
- Ask exactly one short follow-up question to refine the recommendation.
- If no candidates are provided, ask the shopper what they're looking for.`;

interface ParsedReply {
  content?: string;
  productSlugs?: string[];
  followUps?: string[];
}

function toCandidate(item: ProductListItem) {
  const p = item.product;
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand.name,
    category: p.category.slug,
    price: item.lowestPrice,
    aiScore: p.aiScore,
    rating: p.rating,
    summary: p.shortDescription,
  };
}

function safeParse(raw: string): ParsedReply {
  try {
    return JSON.parse(raw) as ParsedReply;
  } catch {
    return {};
  }
}

export class OpenAIProvider implements AIProvider {
  readonly name = "openai";
  private readonly client: OpenAI;

  constructor(private readonly products: ProductService) {
    this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  async respond(messages: ChatMessage[]): Promise<AssistantReply> {
    const userText = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join(" ");
    const retrieval = await retrieveCandidates(this.products, userText);
    const candidates = retrieval.items.slice(0, 8);

    const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "system",
        content: `Candidate products (JSON):\n${JSON.stringify(candidates.map(toCandidate))}`,
      },
      ...messages.map(
        (m): OpenAI.Chat.Completions.ChatCompletionMessageParam => ({
          role: m.role,
          content: m.content,
        }),
      ),
      {
        role: "system",
        content: `Reply ONLY as JSON: {"content": string, "productSlugs": string[] (subset of candidate slugs, max 3, best first), "followUps": string[] (max 4 short refinement phrases)}`,
      },
    ];

    const completion = await this.client.chat.completions.create({
      model: env.OPENAI_MODEL,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: chatMessages,
    });

    const parsed = safeParse(completion.choices[0]?.message.content ?? "{}");
    const bySlug = new Map(candidates.map((c) => [c.product.slug, c]));
    const products = (parsed.productSlugs ?? [])
      .map((slug) => bySlug.get(slug))
      .filter((item): item is ProductListItem => Boolean(item))
      .slice(0, 3);

    return {
      content: parsed.content ?? "Here's what I found for you.",
      products,
      followUps: (parsed.followUps ?? []).slice(0, 4),
    };
  }
}
