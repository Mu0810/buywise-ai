"use server";

import type { ProductListItem } from "@/features/products/types";
import { getProductService } from "@/server/container";

/**
 * Public action to hydrate full product data from a list of ids stored
 * client-side (wishlist / compare / alerts). Preserves the requested order.
 */
export async function fetchProductsByIds(
  ids: string[],
): Promise<ProductListItem[]> {
  if (ids.length === 0) return [];
  const items = await getProductService().getByIds(ids.slice(0, 50));
  const byId = new Map(items.map((item) => [item.product.id, item]));
  return ids
    .map((id) => byId.get(id))
    .filter((item): item is ProductListItem => Boolean(item));
}
