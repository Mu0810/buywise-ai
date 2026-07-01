"use server";

import { getAuthUser } from "@/features/auth/lib/current-user";
import { getAlertService } from "@/server/container";

/**
 * Persist a price alert to the server for signed-in users. Anonymous users
 * keep alerts only in the client store, so this is a no-op for them.
 */
export async function syncPriceAlert(
  productId: string,
  targetPrice: number,
): Promise<void> {
  const user = await getAuthUser();
  if (!user) return;
  await getAlertService()
    .upsert(user.id, productId, Math.round(targetPrice))
    .catch(() => undefined);
}

export async function removePriceAlert(productId: string): Promise<void> {
  const user = await getAuthUser();
  if (!user) return;
  await getAlertService()
    .remove(user.id, productId)
    .catch(() => undefined);
}
