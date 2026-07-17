"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BellRing, Check, Trash2 } from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Skeleton } from "@/components/ui/skeleton";
import { useAlertsStore } from "@/features/alerts/store";
import { useProductsByIds } from "@/features/products/hooks/use-products-by-ids";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/utils";

export function AlertsView() {
  const mounted = useMounted();
  const alerts = useAlertsStore((s) => s.alerts);
  const remove = useAlertsStore((s) => s.remove);
  const { data: items, isLoading } = useProductsByIds(
    alerts.map((a) => a.productId),
  );
  const byId = new Map((items ?? []).map((i) => [i.product.id, i]));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Price alerts</h1>
        <p className="mt-1 text-muted-foreground">
          {mounted
            ? `${alerts.length} active ${alerts.length === 1 ? "alert" : "alerts"}`
            : "Track prices and get notified"}
        </p>
      </div>
      {!mounted || isLoading ? (
        <Skeleton className="h-40 rounded-2xl" />
      ) : alerts.length === 0 ? (
        <EmptyState
          icon={BellRing}
          title="No price alerts yet"
          description="Set a target price on any product and we'll flag it the moment it drops."
          action={
            <ButtonLink href="/search" variant="outline">
              Find products
            </ButtonLink>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {alerts.map((alert) => {
              const item = byId.get(alert.productId);
              if (!item) return null;
              const current = item.lowestPrice;
              const triggered = current != null && current <= alert.targetPrice;
              return (
                <motion.div
                  key={alert.productId}
                  layout
                  initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-brand/30"
                >
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="min-w-0 flex-1"
                  >
                    <p className="truncate font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current {current != null ? formatPrice(current) : "—"}{" "}
                      &middot; Target {formatPrice(alert.targetPrice)}
                    </p>
                  </Link>
                  {triggered ? (
                    <span className="animate-pop-in flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                      <Check className="size-3" /> Target reached
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      Watching
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Remove alert"
                    onClick={() => remove(alert.productId)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
