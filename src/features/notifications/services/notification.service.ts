import "server-only";

import type {
  Notification,
  NotificationType,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client";

export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  body?: string | null;
  data?: Record<string, unknown>;
}

export class NotificationService {
  constructor(private readonly db: PrismaClient) {}

  list(userId: string, limit = 30): Promise<Notification[]> {
    return this.db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  unreadCount(userId: string): Promise<number> {
    return this.db.notification.count({ where: { userId, readAt: null } });
  }

  async markAllRead(userId: string): Promise<void> {
    await this.db.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  async markRead(userId: string, id: string): Promise<void> {
    await this.db.notification.updateMany({
      where: { id, userId },
      data: { readAt: new Date() },
    });
  }

  create(input: CreateNotificationInput): Promise<Notification> {
    return this.db.notification.create({
      data: {
        userId: input.userId,
        type: input.type,
        title: input.title,
        body: input.body ?? null,
        data: (input.data ?? undefined) as Prisma.InputJsonValue,
      },
    });
  }
}
