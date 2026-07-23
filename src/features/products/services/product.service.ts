import "server-only";

import type { ProductRepository } from "@/features/products/repositories/product.repository";
import type {
  OfferWithStore,
  ProductDetail,
  ProductFilters,
  ProductListItem,
  ProductWithOffers,
} from "@/features/products/types";

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
    return items;
  }

  getBySlug(slug: string): Promise<ProductDetail | null> {
    return this.products.findBySlug(slug);
  }

  async getRecommendations(limit = 6): Promise<ProductListItem[]> {
    return (await this.products.findTopRated(limit)).map(toListItem);
  }

  async getByIds(ids: string[]): Promise<ProductListItem[]> {
    return (await this.products.findByIds(ids)).map(toListItem);
  }
}
