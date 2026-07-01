"use server";

import { headers } from "next/headers";
import { z } from "zod";

import type { ChatResult } from "@/features/ai/services/chat.service";
import type { ChatMessage } from "@/features/ai/types";
import { getAuthUser } from "@/features/auth/lib/current-user";
import { getChatService } from "@/server/container";
import { getClientIp, rateLimit } from "@/server/rate-limit";

const inputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(40),
  conversationId: z.string().nullish(),
});

export async function sendChatMessage(input: {
  messages: ChatMessage[];
  conversationId?: string | null;
}): Promise<ChatResult> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      reply: {
        content: "Sorry, I couldn't read that message. Please try again.",
        products: [],
        followUps: [],
      },
    };
  }

  const user = await getAuthUser();
  const ip = getClientIp(await headers());
  const limit = await rateLimit({
    key: `chat:${user?.id ?? ip}`,
    limit: 30,
    windowMs: 60 * 60_000,
  });
  if (!limit.success) {
    return {
      reply: {
        content:
          "You've reached the message limit for now. Please try again a little later.",
        products: [],
        followUps: [],
      },
    };
  }

  return getChatService().send({
    messages: parsed.data.messages,
    userId: user?.id ?? null,
    conversationId: parsed.data.conversationId ?? null,
  });
}
