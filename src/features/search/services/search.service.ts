import "server-only";

import type {
  Prisma,
  PrismaClient,
  SearchQuery,
} from "@/generated/prisma/client";

export interface RecordSearchInput {
  userId?: string | null;
  query: string;
  category?: string | null;
  filters?: Record<string, unknown>;
  resultCount: number;
}

export class SearchService {
  constructor(private readonly db: PrismaClient) {}

  async record(input: RecordSearchInput): Promise<void> {
    if (!input.query.trim()) return;
    await this.db.searchQuery.create({
      data: {
        userId: input.userId ?? null,
        query: input.query.slice(0, 200),
        category: input.category ?? null,
        filters: (input.filters ?? {}) as Prisma.InputJsonValue,
        resultCount: input.resultCount,
      },
    });
  }

  getRecent(userId: string, limit = 8): Promise<SearchQuery[]> {
    return this.db.searchQuery.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      distinct: ["query"],
    });
  }
}
