import "server-only";

import type { AIProvider } from "@/features/ai/providers/types";
import type { AssistantReply, ChatMessage } from "@/features/ai/types";
import type { Prisma, PrismaClient } from "@/generated/prisma/client";
import { logger } from "@/lib/logger";

export interface ChatResult {
  reply: AssistantReply;
  conversationId?: string;
}

export interface SendInput {
  messages: ChatMessage[];
  userId?: string | null;
  conversationId?: string | null;
}

export class ChatService {
  constructor(
    private readonly provider: AIProvider,
    private readonly fallback: AIProvider,
    private readonly db: PrismaClient,
  ) {}

  async send(input: SendInput): Promise<ChatResult> {
    const reply = await this.generate(input.messages);

    let conversationId = input.conversationId ?? undefined;
    if (input.userId) {
      conversationId = await this.persist(
        input.userId,
        conversationId,
        input.messages,
        reply,
      ).catch((error) => {
        logger.error("Chat persistence failed", {
          error: error instanceof Error ? error.message : String(error),
        });
        return conversationId;
      });
    }

    return { reply, conversationId };
  }

  private async generate(messages: ChatMessage[]): Promise<AssistantReply> {
    try {
      return await this.provider.respond(messages);
    } catch (error) {
      logger.warn("AI provider failed; using fallback", {
        provider: this.provider.name,
        error: error instanceof Error ? error.message : String(error),
      });
      return this.fallback.respond(messages);
    }
  }

  private async persist(
    userId: string,
    conversationId: string | undefined,
    messages: ChatMessage[],
    reply: AssistantReply,
  ): Promise<string> {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");

    let convId = conversationId;
    if (!convId) {
      const conversation = await this.db.conversation.create({
        data: {
          userId,
          title: (lastUser?.content ?? "New chat").slice(0, 60),
        },
      });
      convId = conversation.id;
    }

    if (lastUser) {
      await this.db.message.create({
        data: { conversationId: convId, role: "USER", content: lastUser.content },
      });
    }
    await this.db.message.create({
      data: {
        conversationId: convId,
        role: "ASSISTANT",
        content: reply.content,
        metadata: {
          productIds: reply.products.map((p) => p.product.id),
          followUps: reply.followUps,
        } as Prisma.InputJsonValue,
      },
    });
    await this.db.conversation.update({
      where: { id: convId },
      data: { updatedAt: new Date() },
    });

    return convId;
  }
}
