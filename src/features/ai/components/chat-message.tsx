"use client";

import { motion } from "framer-motion";

import type { ChatRole } from "@/features/ai/types";
import { ProductCard } from "@/features/products/components/product-card";
import type { ProductListItem } from "@/features/products/types";

function AssistantAvatar({ thinking = false }: { thinking?: boolean }) {
  return (
    <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--grad-gold-1)] to-[var(--grad-gold-3)] font-display text-sm font-bold text-[oklch(0.19_0.02_235)] shadow-sm ring-1 ring-brand/30">
      B
      {thinking && (
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-signal animate-pulse-ring" />
      )}
    </div>
  );
}

const enter = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

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
      <motion.div {...enter} className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-sm">
          {content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div {...enter} className="flex gap-3">
      <AssistantAvatar />
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-3 text-sm leading-relaxed">
          {content.split("\n\n").map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
        {products.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {products.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ProductCard item={item} />
              </motion.div>
            ))}
          </div>
        )}
        {followUps.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {followUps.map((text, index) => (
              <motion.button
                key={text}
                type="button"
                onClick={() => onFollowUp(text)}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: 0.3 + index * 0.06 }}
                whileHover={{ y: -2 }}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:bg-brand/5 hover:text-foreground"
              >
                {text}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function ThinkingBubble() {
  return (
    <motion.div {...enter} className="flex items-center gap-3">
      <AssistantAvatar thinking />
      <div className="rounded-2xl bg-muted px-4 py-2.5">
        <span className="font-mono text-xs text-shimmer">
          Researching stores &amp; reviews…
        </span>
      </div>
    </motion.div>
  );
}
