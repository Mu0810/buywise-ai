import "server-only";

import type { PrismaClient } from "@/generated/prisma/client";

export class AdminService {
  constructor(private readonly db: PrismaClient) {}

  async getOverview() {
    const [
      users,
      products,
      offers,
      stores,
      searches,
      conversations,
      messages,
      alerts,
      topSearches,
      planGroups,
      recentUsers,
    ] = await Promise.all([
      this.db.user.count(),
      this.db.product.count(),
      this.db.productOffer.count(),
      this.db.store.count(),
      this.db.searchQuery.count(),
      this.db.conversation.count(),
      this.db.message.count(),
      this.db.priceAlert.count(),
      this.db.searchQuery.groupBy({
        by: ["query"],
        _count: { query: true },
        orderBy: { _count: { query: "desc" } },
        take: 8,
      }),
      this.db.user.groupBy({ by: ["plan"], _count: { plan: true } }),
      this.db.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          email: true,
          name: true,
          plan: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    const planBreakdown: Record<string, number> = {
      FREE: 0,
      PREMIUM: 0,
      FAMILY: 0,
    };
    for (const group of planGroups) {
      planBreakdown[group.plan] = group._count.plan;
    }

    return {
      counts: {
        users,
        products,
        offers,
        stores,
        searches,
        conversations,
        messages,
        alerts,
      },
      topSearches: topSearches.map((s) => ({
        query: s.query,
        count: s._count.query,
      })),
      planBreakdown,
      recentUsers,
    };
  }

  listProducts(limit = 50) {
    return this.db.product.findMany({
      orderBy: { aiScore: "desc" },
      take: limit,
      include: {
        brand: true,
        category: true,
        _count: { select: { offers: true } },
      },
    });
  }

  listUsers(limit = 100) {
    return this.db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  listStores() {
    return this.db.store.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { offers: true } } },
    });
  }
}
