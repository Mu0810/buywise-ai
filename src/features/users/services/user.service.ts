import "server-only";

import type { User } from "@/generated/prisma/client";

import type {
  UpdateProfileInput,
  UpsertUserInput,
  UserRepository,
} from "@/features/users/repositories/user.repository";

/**
 * Application service for user profiles. Encapsulates business rules and
 * orchestrates the repository. Consumed via the DI container.
 */
export class UserService {
  constructor(private readonly users: UserRepository) {}

  /** Ensure a local profile exists for an authenticated Supabase user. */
  ensureProfile(input: UpsertUserInput): Promise<User> {
    return this.users.upsertFromAuth(input);
  }

  getProfile(id: string): Promise<User | null> {
    return this.users.findById(id);
  }

  updateProfile(id: string, data: UpdateProfileInput): Promise<User> {
    return this.users.updateProfile(id, data);
  }
}
