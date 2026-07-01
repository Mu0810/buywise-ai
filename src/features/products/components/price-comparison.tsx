import { ArrowUpRight, BadgeCheck, Tag, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { OfferWithStore } from "@/features/products/types";
import { cn, formatPrice } from "@/lib/utils";

export function PriceComparison({ offers }: { offers: OfferWithStore[] }) {
  if (offers.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No offers available right now.
      </p>
    );
  }

  const cheapest = offers.reduce((a, b) => (a.price <= b.price ? a : b));
  const withDelivery = offers.filter((o) => o.deliveryDays != null);
  const fastest =
    withDelivery.length > 0
      ? withDelivery.reduce((a, b) =>
          (a.deliveryDays ?? 99) <= (b.deliveryDays ?? 99) ? a : b,
        )
      : null;

  return (
    <div className="flex flex-col gap-2">
      {offers.map((offer) => {
        const isBest = offer.id === cheapest.id;
        return (
          <a
            key={offer.id}
            href={offer.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "group flex items-center gap-3 rounded-xl border p-3 transition-colors",
              isBest
                ? "border-brand/50 bg-brand/5"
                : "border-border/60 hover:border-brand/30",
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{offer.store.name}</span>
                {offer.isOfficial && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <BadgeCheck className="size-3" /> Official
                  </Badge>
                )}
                {fastest && offer.id === fastest.id && (
                  <Badge variant="secondary" className="text-xs">
                    Fastest
                  </Badge>
                )}
              </div>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {offer.deliveryDays != null && (
                  <span className="flex items-center gap-1">
                    <Truck className="size-3" /> {offer.deliveryDays}-day delivery
                  </span>
                )}
                {offer.cashback ? (
                  <span className="flex items-center gap-1">
                    <Tag className="size-3" /> {formatPrice(offer.cashback)}{" "}
                    cashback
                  </span>
                ) : null}
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{formatPrice(offer.price)}</p>
              {isBest && (
                <span className="text-xs font-medium text-brand">Best deal</span>
              )}
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        );
      })}
    </div>
  );
}
