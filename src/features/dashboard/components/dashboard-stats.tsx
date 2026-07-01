"use client";

import { BellRing, Heart, TrendingUp, Wallet } from "lucide-react";

import { useAlertsStore } from "@/features/alerts/store";
import { useWishlistStore } from "@/features/wishlist/store";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/utils";

export function DashboardStats({
  shoppingScore,
  moneySaved,
}: {
  shoppingScore: number;
  moneySaved: number;
}) {
  const mounted = useMounted();
  const wishlist = useWishlistStore((s) => s.ids.length);
  const alerts = useAlertsStore((s) => s.alerts.length);

  const stats = [
    { label: "Shopping score", value: String(shoppingScore), icon: TrendingUp },
    { label: "Money saved", value: formatPrice(moneySaved), icon: Wallet },
    { label: "Active alerts", value: mounted ? String(alerts) : "—", icon: BellRing },
    { label: "Wishlist items", value: mounted ? String(wishlist) : "—", icon: Heart },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border/60 bg-card p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <stat.icon className="size-4 text-brand" />
          </div>
          <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
