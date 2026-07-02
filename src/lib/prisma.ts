import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "@/lib/env";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Prisma 7 uses the Rust-free query compiler, which talks to PostgreSQL through
 * a driver adapter (node-postgres) instead of a query engine binary.
 *
 * A single client is cached on `globalThis` in development to avoid exhausting
 * database connections across hot reloads.
 */
function createPrismaClient() {
  const connectionString = env.DATABASE_URL;
  // Managed Postgres (Heroku, Supabase, RDS, etc.) requires TLS and commonly
  // presents self-signed certificates, whereas local Docker Postgres does not
  // use TLS. Detect a local host and only enable SSL for remote databases.
  const isLocal = /@(localhost|127\.0\.0\.1)\b/.test(connectionString);
  const adapter = new PrismaPg({
    connectionString,
    ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } }),
  });
  return new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientSingleton;
};

export const prisma: PrismaClientSingleton =
  globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
