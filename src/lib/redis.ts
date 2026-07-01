import "server-only";

import Redis from "ioredis";

import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

/**
 * Shared ioredis client. Cached on `globalThis` in development to survive hot
 * reloads. `lazyConnect` defers the TCP connection until the first command, so
 * importing this module never crashes when Redis is unavailable.
 */
function createRedisClient(): Redis {
  const client = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    connectTimeout: 5_000,
    maxRetriesPerRequest: 2,
    retryStrategy(times) {
      if (times > 5) return null;
      return Math.min(times * 200, 2_000);
    },
  });

  client.on("error", (error: Error) => {
    logger.error("Redis connection error", { error: error.message });
  });

  return client;
}

const globalForRedis = globalThis as unknown as { redis?: Redis };

export const redis: Redis = globalForRedis.redis ?? createRedisClient();

if (env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

/**
 * Read a JSON value from cache. Returns null on miss or any Redis failure
 * (fail-open so a Redis outage never breaks a request).
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const value = await redis.get(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    logger.warn("cacheGet failed", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * Write a JSON value to cache with a TTL in seconds. Silently no-ops on failure.
 */
export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds: number,
): Promise<void> {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch (error) {
    logger.warn("cacheSet failed", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

/** Delete one or more cache keys. Silently no-ops on failure. */
export async function cacheDelete(...keys: string[]): Promise<void> {
  if (keys.length === 0) return;
  try {
    await redis.del(...keys);
  } catch (error) {
    logger.warn("cacheDelete failed", {
      keys,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
