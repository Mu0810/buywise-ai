"use client";

import { Sparkles } from "lucide-react";

import type { ChatRole } from "@/features/ai/types";
import { ProductCard } from "@/features/products/components/product-card";
import type { ProductListItem } from "@/features/products/types";

function AssistantAvatar({ pulse = false }: { pulse?: boolean }) {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
      <Sparkles className={pulse ? "size-4 animate-pulse" : "size-4"} />
    </div>
  );
}

export function ChatMessageBubble({
  role,
  content,
  products,
  followUps,
  onFollowUp,
}: {
  role: ChatRole;
  content: string;
  products: ProductListItem[];
  followUps: string[];
  onFollowUp: (text: string) => void;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-sm text-brand-foreground">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <AssistantAvatar />
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-3 text-sm leading-relaxed">
          {content.split("\n\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
        {products.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((item) => (
              <ProductCard key={item.product.id} item={item} />
            ))}
          </div>
        )}
        {followUps.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {followUps.map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => onFollowUp(text)}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
              >
                {text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ThinkingBubble() {
  return (
    <div className="flex gap-3">
      <AssistantAvatar pulse />
      <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50" />
      </div>
    </div>
  );
}
