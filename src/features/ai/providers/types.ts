import "server-only";

import type { AssistantReply, ChatMessage } from "@/features/ai/types";

/**
 * Pluggable AI provider. Implementations turn a conversation into a grounded
 * recommendation reply. The rule-based provider works with no external
 * dependencies; the OpenAI provider adds LLM-generated prose over the same
 * catalog retrieval.
 */
export interface AIProvider {
  readonly name: string;
  respond(messages: ChatMessage[]): Promise<AssistantReply>;
}
