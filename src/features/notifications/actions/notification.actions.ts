"use server";

import { getAuthUser } from "@/features/auth/lib/current-user";
import type { Notification } from "@/generated/prisma/client";
import { getNotificationService } from "@/server/container";

export async function fetchNotifications(): Promise<{
  items: Notification[];
  unread: number;
}> {
  const user = await getAuthUser();
  if (!user) return { items: [], unread: 0 };
  const service = getNotificationService();
  const [items, unread] = await Promise.all([
    service.list(user.id),
    service.unreadCount(user.id),
  ]);
  return { items, unread };
}

export async function markAllNotificationsRead(): Promise<void> {
  const user = await getAuthUser();
  if (!user) return;
  await getNotificationService().markAllRead(user.id);
}
