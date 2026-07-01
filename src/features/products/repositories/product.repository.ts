import "server-only";

import type { Prisma, PrismaClient } from "@/generated/prisma/client";

import type {
  ProductDetail,
  ProductFilters,
  ProductWithOffers,
  SortOption,
} from "@/features/products/types";

const listInclude = {
  brand: true,
  category: true,
  offers: { include: { store: true } },
} satisfies Prisma.ProductInclude;

function orderByFor(
  sort?: SortOption,
): Prisma.ProductOrderByWithRelationInput[] {
  switch (sort) {
    case "rating":
      return [{ rating: "desc" }, { reviewCount: "desc" }];
    case "ai-score":
      return [{ aiScore: "desc" }];
    case "value":
      return [{ valueScore: "desc" }];
    default:
      return [{ aiScore: "desc" }, { rating: "desc" }];
  }
}

export class ProductRepository {
  constructor(private readonly db: PrismaClient) {}

  search(filters: ProductFilters): Promise<ProductWithOffers[]> {
    const where: Prisma.ProductWhereInput = { status: "ACTIVE" };
    if (filters.query) {
      where.name = { contains: filters.query, mode: "insensitive" };
    }
    if (filters.categorySlug) {
      where.category = { slug: filters.categorySlug };
    }
    if (filters.brandSlugs && filters.brandSlugs.length > 0) {
      where.brand = { slug: { in: filters.brandSlugs } };
    }
    if (filters.minPrice != null || filters.maxPrice != null) {
      where.offers = {
        some: { price: { gte: filters.minPrice, lte: filters.maxPrice } },
      };
    }
    return this.db.product.findMany({
      where,
      include: listInclude,
      orderBy: orderByFor(filters.sort),
      take: filters.limit ?? 40,
      skip: filters.offset ?? 0,
    });
  }

  findBySlug(slug: string): Promise<ProductDetail | null> {
    return this.db.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        offers: { include: { store: true }, orderBy: { price: "asc" } },
        reviewAnalysis: true,
        priceHistory: { orderBy: { recordedAt: "asc" } },
      },
    });
  }

  findTopRated(limit = 6): Promise<ProductWithOffers[]> {
    return this.db.product.findMany({
      where: { status: "ACTIVE" },
      include: listInclude,
      orderBy: [{ aiScore: "desc" }, { rating: "desc" }],
      take: limit,
    });
  }

  findByIds(ids: string[]): Promise<ProductWithOffers[]> {
    return this.db.product.findMany({
      where: { id: { in: ids } },
      include: listInclude,
    });
  }
}
