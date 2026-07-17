import {
  BellRing,
  Info,
  Sparkles,
  Tag,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { EmptyState } from "@/components/shared/empty-state";
import { requireUser } from "@/features/auth/lib/current-user";
import type { NotificationType } from "@/generated/prisma/client";
import { formatRelativeTime } from "@/lib/utils";
import { getNotificationService } from "@/server/container";

export const metadata: Metadata = { title: "Notifications" };

const ICONS: Record<NotificationType, LucideIcon> = {
  PRICE_DROP: TrendingDown,
  DEAL: Tag,
  ALERT_TRIGGERED: BellRing,
  RECOMMENDATION: Sparkles,
  SYSTEM: Info,
};

export default async function NotificationsPage() {
  const user = await requireUser();
  const service = getNotificationService();
  const items = await service.list(user.id, 50);
  await service.markAllRead(user.id);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
      {items.length === 0 ? (
        <EmptyState
          icon={BellRing}
          title="No notifications yet"
          description="Price drops, deals and recommendations will show up here."
        />
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((n, index) => {
            const Icon = ICONS[n.type];
            return (
              <div
                key={n.id}
                className="animate-enter flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-brand/30"
                style={{ "--stagger": Math.min(index, 11) } as React.CSSProperties}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{n.title}</p>
                  {n.body && (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {n.body}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {formatRelativeTime(n.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
