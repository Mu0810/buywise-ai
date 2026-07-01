"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { ChatComposer } from "@/features/ai/components/chat-composer";
import { ChatEmpty } from "@/features/ai/components/chat-empty";
import {
  ChatMessageBubble,
  ThinkingBubble,
} from "@/features/ai/components/chat-message";
import { sendChatMessage } from "@/features/ai/actions/chat.actions";
import type { ChatMessage, ChatRole } from "@/features/ai/types";
import type { ProductListItem } from "@/features/products/types";

interface UiMessage {
  id: string;
  role: ChatRole;
  content: string;
  products: ProductListItem[];
  followUps: string[];
}

let counter = 0;
const nextId = () => `m${(counter += 1)}`;

export function ChatView() {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isPending) return;

    const userMessage: UiMessage = {
      id: nextId(),
      role: "user",
      content: trimmed,
      products: [],
      followUps: [],
    };
    const history = [...messages, userMessage];
    setMessages(history);

    const payload: ChatMessage[] = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    startTransition(async () => {
      try {
        const result = await sendChatMessage({ messages: payload, conversationId });
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            content: result.reply.content,
            products: result.reply.products,
            followUps: result.reply.followUps,
          },
        ]);
        if (result.conversationId) setConversationId(result.conversationId);
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="mx-auto flex h-[calc(100svh-8rem)] max-w-3xl flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <ChatEmpty onPick={send} />
        ) : (
          <div className="flex flex-col gap-6 py-4">
            {messages.map((message) => (
              <ChatMessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
                products={message.products}
                followUps={message.followUps}
                onFollowUp={send}
              />
            ))}
            {isPending && <ThinkingBubble />}
            <div ref={endRef} />
          </div>
        )}
      </div>
      <div className="pt-3">
        <ChatComposer onSend={send} disabled={isPending} />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          BuyWise can make mistakes. Prices and specs are indicative — verify on
          the store before buying.
        </p>
      </div>
    </div>
  );
}
