import "server-only";

import type { ProductRepository } from "@/features/products/repositories/product.repository";
import type {
  OfferWithStore,
  ProductDetail,
  ProductFilters,
  ProductListItem,
  ProductWithOffers,
} from "@/features/products/types";
import { logger } from "@/lib/logger";
import { cacheGet, cacheSet } from "@/lib/redis";

/** Choose the cheapest in-stock offer (falling back to any offer). */
export function pickBestOffer(offers: OfferWithStore[]): OfferWithStore | null {
  const inStock = offers.filter((o) => o.inStock);
  const pool = inStock.length > 0 ? inStock : offers;
  return pool.reduce<OfferWithStore | null>(
    (best, offer) => (!best || offer.price < best.price ? offer : best),
    null,
  );
}

/** Derive the list-item view model (best price, savings, store count). */
export function toListItem(product: ProductWithOffers): ProductListItem {
  const bestOffer = pickBestOffer(product.offers);
  const lowestPrice = bestOffer?.price ?? null;
  const highestMrp =
    product.offers.reduce((max, o) => Math.max(max, o.mrp ?? 0), 0) || null;
  const discountPercent =
    lowestPrice && highestMrp && highestMrp > lowestPrice
      ? Math.round(((highestMrp - lowestPrice) / highestMrp) * 100)
      : 0;

  return {
    product,
    bestOffer,
    storeCount: product.offers.length,
    lowestPrice,
    highestMrp,
    discountPercent,
  };
}

export class ProductService {
  constructor(private readonly products: ProductRepository) {}

  async search(filters: ProductFilters): Promise<ProductListItem[]> {
    const cacheKey = `search:v1:${JSON.stringify(filters)}`;
    const cached = await cacheGet<ProductListItem[]>(cacheKey);
    if (cached) return cached;

    try {
      let rows = await this.products.search(filters);
      // Graceful recall: if a text query matched nothing with strict all-token
      // matching, retry once with looser any-token matching before giving up.
      if (rows.length === 0 && filters.query && filters.matchMode !== "any") {
        rows = await this.products.search({ ...filters, matchMode: "any" });
      }
      const items = rows.map(toListItem);
      if (filters.sort === "price-asc") {
        items.sort(
          (a, b) => (a.lowestPrice ?? Infinity) - (b.lowestPrice ?? Infinity),
        );
      } else if (filters.sort === "price-desc") {
        items.sort((a, b) => (b.lowestPrice ?? 0) - (a.lowestPrice ?? 0));
      }
      // Catalog is static between deploys/seeds, so a short TTL keeps repeat
      // searches fast while staying fresh. List views don't read Date fields.
      await cacheSet(cacheKey, items, 120);
      return items;
    } catch (error) {
      logger.error("Product search failed", {
        error: error instanceof Error ? error.message : String(error),
        filters,
      });
      return [];
    }
  }

  getBySlug(slug: string): Promise<ProductDetail | null> {
    return this.products.findBySlug(slug);
  }

  async getRecommendations(limit = 6): Promise<ProductListItem[]> {
    const cacheKey = `reco:v1:${limit}`;
    const cached = await cacheGet<ProductListItem[]>(cacheKey);
    if (cached) return cached;
    try {
      const items = (await this.products.findTopRated(limit)).map(toListItem);
      await cacheSet(cacheKey, items, 300);
      return items;
    } catch (error) {
      logger.error("getRecommendations failed", {
        error: error instanceof Error ? error.message : String(error),
      });
      return [];
    }
  }

  async getByIds(ids: string[]): Promise<ProductListItem[]> {
    return (await this.products.findByIds(ids)).map(toListItem);
  }
}
