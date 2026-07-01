"use client";

import { useCompareStore } from "@/features/compare/store";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";

export function CompareTray() {
  const mounted = useMounted();
  const ids = useCompareStore((s) => s.ids);
  const clear = useCompareStore((s) => s.clear);

  if (!mounted || ids.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium">
            {ids.length} selected to compare
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
    </div>
  );
}
