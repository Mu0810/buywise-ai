import "server-only";

import { logger } from "@/lib/logger";
import { redis } from "@/lib/redis";

export interface RateLimitOptions {
  /** Unique identifier for the limited action, e.g. `login:user@x.com`. */
  key: string;
  /** Maximum number of allowed requests within the window. */
  limit: number;
  /** Sliding window size in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  /** Epoch milliseconds when the window resets. */
  reset: number;
}

/**
 * Atomic sliding-window rate limiter backed by a Redis sorted set.
 *
 * The Lua script prunes entries older than the window, counts what remains,
 * and (if under the limit) records the current request. Running it server-side
 * guarantees atomicity under concurrent requests.
 */
const SLIDING_WINDOW = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local member = ARGV[4]

redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
local count = redis.call('ZCARD', key)

if count < limit then
  redis.call('ZADD', key, now, member)
  redis.call('PEXPIRE', key, window)
  return {1, limit - count - 1, now + window}
end

return {0, 0, now + window}
`;

export async function rateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): Promise<RateLimitResult> {
  const now = Date.now();
  const member = `${now}:${Math.random().toString(36).slice(2)}`;
  const redisKey = `ratelimit:${key}`;

  try {
    const [allowed, remaining, reset] = (await redis.eval(
      SLIDING_WINDOW,
      1,
      redisKey,
      now.toString(),
      windowMs.toString(),
      limit.toString(),
      member,
    )) as [number, number, number];

    return {
      success: allowed === 1,
      limit,
      remaining: Math.max(0, remaining),
      reset,
    };
  } catch (error) {
    // Fail open: never block a legitimate request because Redis is down.
    logger.warn("rateLimit failed, allowing request", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
  }
}

/**
 * Best-effort client IP extraction from request headers. Falls back to a
 * sentinel so rate limiting still functions behind misconfigured proxies.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return headers.get("x-real-ip")?.trim() ?? "unknown";
}
