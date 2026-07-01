import "server-only";

import type { NotificationService } from "@/features/notifications/services/notification.service";
import type { PrismaClient } from "@/generated/prisma/client";
import { formatPrice } from "@/lib/utils";

export class AlertService {
  constructor(
    private readonly db: PrismaClient,
    private readonly notifications: NotificationService,
  ) {}

  async upsert(
    userId: string,
    productId: string,
    targetPrice: number,
  ): Promise<void> {
    const existing = await this.db.priceAlert.findFirst({
      where: { userId, productId },
    });
    if (existing) {
      await this.db.priceAlert.update({
        where: { id: existing.id },
        data: { targetPrice, status: "ACTIVE", triggeredAt: null },
      });
    } else {
      await this.db.priceAlert.create({
        data: { userId, productId, targetPrice, status: "ACTIVE" },
      });
    }
  }

  async remove(userId: string, productId: string): Promise<void> {
    await this.db.priceAlert.deleteMany({ where: { userId, productId } });
  }

  /** Scan active alerts against current prices and notify on drops. */
  async checkAll(): Promise<{ triggered: number }> {
    const alerts = await this.db.priceAlert.findMany({
      where: { status: "ACTIVE" },
      include: { product: { include: { offers: true } } },
    });

    let triggered = 0;
    for (const alert of alerts) {
      const prices = alert.product.offers
        .filter((o) => o.inStock)
        .map((o) => o.price);
      if (prices.length === 0) continue;

      const current = Math.min(...prices);
      if (current <= alert.targetPrice) {
        await this.db.priceAlert.update({
          where: { id: alert.id },
          data: {
            status: "TRIGGERED",
            triggeredAt: new Date(),
            lastKnownPrice: current,
          },
        });
        await this.notifications.create({
          userId: alert.userId,
          type: "PRICE_DROP",
          title: `Price drop: ${alert.product.name}`,
          body: `Now ${formatPrice(current)} — at or below your target of ${formatPrice(alert.targetPrice)}.`,
          data: {
            productId: alert.productId,
            productSlug: alert.product.slug,
            price: current,
          },
        });
        triggered += 1;
      }
    }
    return { triggered };
  }
}
