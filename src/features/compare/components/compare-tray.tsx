"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { useCompareStore } from "@/features/compare/store";
import { useMounted } from "@/hooks/use-mounted";

export function CompareTray() {
  const mounted = useMounted();
  const ids = useCompareStore((s) => s.ids);
  const clear = useCompareStore((s) => s.clear);

  const visible = mounted && ids.length > 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 72, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-brand/20 bg-background/90 shadow-[0_-8px_32px_-12px] shadow-brand/10 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={ids.length}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex size-6 items-center justify-center rounded-full bg-brand font-mono text-xs font-semibold text-brand-foreground"
                  >
                    {ids.length}
                  </motion.span>
                </AnimatePresence>
                selected to compare
              </span>
              <button
                type="button"
                onClick={clear}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={clear}
                className="hidden sm:inline-flex"
              >
                Cancel
              </Button>
              <ButtonLink href="/compare">Compare ({ids.length})</ButtonLink>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
