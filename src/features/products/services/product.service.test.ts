import { describe, expect, it } from "vitest";

import {
  pickBestOffer,
  toListItem,
} from "@/features/products/services/product.service";
import type {
  OfferWithStore,
  ProductWithOffers,
} from "@/features/products/types";

function offer(price: number, inStock: boolean, mrp?: number): OfferWithStore {
  return { id: `o-${price}`, price, inStock, mrp: mrp ?? null } as unknown as OfferWithStore;
}

function productWith(offers: OfferWithStore[]): ProductWithOffers {
  return { offers } as unknown as ProductWithOffers;
}

describe("pickBestOffer", () => {
  it("returns the cheapest in-stock offer, ignoring cheaper out-of-stock ones", () => {
    const offers = [
      offer(80000, true),
      offer(75000, true),
      offer(70000, false),
    ];
    expect(pickBestOffer(offers)?.price).toBe(75000);
  });

  it("falls back to any offer when nothing is in stock", () => {
    const offers = [offer(80000, false), offer(75000, false)];
    expect(pickBestOffer(offers)?.price).toBe(75000);
  });

  it("returns null for an empty offer list", () => {
    expect(pickBestOffer([])).toBeNull();
  });
});

describe("toListItem", () => {
  it("derives best price, store count, and discount", () => {
    const product = productWith([
      offer(75000, true, 100000),
      offer(80000, true, 90000),
    ]);

    const item = toListItem(product);

    expect(item.lowestPrice).toBe(75000);
    expect(item.highestMrp).toBe(100000);
    expect(item.storeCount).toBe(2);
    expect(item.discountPercent).toBe(25);
    expect(item.bestOffer?.price).toBe(75000);
  });

  it("reports a zero discount and null price with no offers", () => {
    const item = toListItem(productWith([]));

    expect(item.lowestPrice).toBeNull();
    expect(item.highestMrp).toBeNull();
    expect(item.storeCount).toBe(0);
    expect(item.discountPercent).toBe(0);
    expect(item.bestOffer).toBeNull();
  });
});
