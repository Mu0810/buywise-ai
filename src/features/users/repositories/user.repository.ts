import "server-only";

import type { PrismaClient, User } from "@/generated/prisma/client";

export interface UpsertUserInput {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
}

export interface UpdateProfileInput {
  name?: string;
  avatarUrl?: string | null;
}

/**
 * Data-access boundary for the `User` aggregate. All persistence concerns live
 * here; services depend on this abstraction rather than on Prisma directly.
 */
export class UserRepository {
  constructor(private readonly db: PrismaClient) {}

  findById(id: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { email } });
  }

  /**
   * Create or update the local profile that mirrors a Supabase auth user.
   * Only overwrites `name`/`avatarUrl` when explicitly provided so we never
   * clobber user-edited values on subsequent logins.
   */
  upsertFromAuth(input: UpsertUserInput): Promise<User> {
    const { id, email, name, avatarUrl } = input;
    return this.db.user.upsert({
      where: { id },
      update: {
        email,
        ...(name !== undefined ? { name } : {}),
        ...(avatarUrl !== undefined ? { avatarUrl } : {}),
      },
      create: {
        id,
        email,
        name: name ?? null,
        avatarUrl: avatarUrl ?? null,
      },
    });
  }

  updateProfile(id: string, data: UpdateProfileInput): Promise<User> {
    return this.db.user.update({ where: { id }, data });
  }
}
