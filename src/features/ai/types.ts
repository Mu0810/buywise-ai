import type { ProductListItem } from "@/features/products/types";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id?: string;
  role: ChatRole;
  content: string;
  /** Product ids attached to an assistant message (for persistence/rehydration). */
  productIds?: string[];
  followUps?: string[];
}

/** What an AI provider returns for a turn. */
export interface AssistantReply {
  content: string;
  products: ProductListItem[];
  followUps: string[];
}
