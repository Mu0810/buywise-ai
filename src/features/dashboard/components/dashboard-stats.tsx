"use client";

import { motion } from "framer-motion";
import { BellRing, Heart, TrendingUp, Wallet } from "lucide-react";

import { CountUp } from "@/components/motion";
import { useAlertsStore } from "@/features/alerts/store";
import { useWishlistStore } from "@/features/wishlist/store";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice } from "@/lib/utils";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

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
    {
      label: "Shopping score",
      value: shoppingScore,
      format: (n: number) => String(Math.round(n)),
      ready: true,
      icon: TrendingUp,
    },
    {
      label: "Money saved",
      value: moneySaved,
      format: formatPrice,
      ready: true,
      icon: Wallet,
    },
    {
      label: "Active alerts",
      value: alerts,
      format: (n: number) => String(Math.round(n)),
      ready: mounted,
      icon: BellRing,
    },
    {
      label: "Wishlist items",
      value: wishlist,
      format: (n: number) => String(Math.round(n)),
      ready: mounted,
      icon: Heart,
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={item}
          className="group rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="flex size-7 items-center justify-center rounded-lg bg-brand/10 text-brand transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
              <stat.icon className="size-4" />
            </span>
          </div>
          <p className="mt-3 font-mono text-2xl font-semibold tabular-nums">
            {stat.ready ? (
              <CountUp value={stat.value} format={stat.format} duration={1.1} />
            ) : (
              "—"
            )}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
