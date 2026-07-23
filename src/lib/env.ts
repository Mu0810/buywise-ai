import { z } from "zod";

/**
 * Type-safe, validated environment variables.
 *
 * Server-only variables are validated on the server. Client variables must be
 * prefixed with `NEXT_PUBLIC_` and are referenced literally in `processEnv` so
 * the Next.js compiler can statically inline them into the client bundle.
 *
 * Set `SKIP_ENV_VALIDATION=true` to bypass validation (useful for Docker image
 * builds or linting where secrets are intentionally absent).
 */

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().default(""),
  OPENAI_API_KEY: z.string().default(""),
  OPENAI_BASE_URL: z.string().default(""),
  AI_PROVIDER: z.enum(["auto", "openai", "rule-based"]).default("auto"),
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
  STRIPE_SECRET_KEY: z.string().default(""),
  STRIPE_WEBHOOK_SECRET: z.string().default(""),
  STRIPE_PRICE_PREMIUM_MONTHLY: z.string().default(""),
  STRIPE_PRICE_PREMIUM_YEARLY: z.string().default(""),
  STRIPE_PRICE_FAMILY_MONTHLY: z.string().default(""),
  STRIPE_PRICE_FAMILY_YEARLY: z.string().default(""),
  CRON_SECRET: z.string().default(""),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url().default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default("placeholder-anon-key"),
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().default(""),
});

/**
 * Reference each variable literally. `process.env` is not a normal object in
 * the browser build — Next.js replaces `process.env.NEXT_PUBLIC_*` at compile
 * time, so destructuring or dynamic access would break client inlining.
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
  AI_PROVIDER: process.env.AI_PROVIDER,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_PRICE_PREMIUM_MONTHLY: process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
  STRIPE_PRICE_PREMIUM_YEARLY: process.env.STRIPE_PRICE_PREMIUM_YEARLY,
  STRIPE_PRICE_FAMILY_MONTHLY: process.env.STRIPE_PRICE_FAMILY_MONTHLY,
  STRIPE_PRICE_FAMILY_YEARLY: process.env.STRIPE_PRICE_FAMILY_YEARLY,
  CRON_SECRET: process.env.CRON_SECRET,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
} as const;

type Env = z.infer<typeof serverSchema> & z.infer<typeof clientSchema>;

const isServer = typeof window === "undefined";
const skipValidation =
  process.env.SKIP_ENV_VALIDATION === "true" ||
  process.env.SKIP_ENV_VALIDATION === "1";

function formatIssues(issues: z.core.$ZodIssue[]): string {
  return issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
}

function loadEnv(): Env {
  if (skipValidation) {
    return processEnv as unknown as Env;
  }

  // On the client only the NEXT_PUBLIC_* variables exist; server variables are
  // intentionally undefined and must never be read from the browser.
  const schema = isServer
    ? serverSchema.extend(clientSchema.shape)
    : clientSchema;

  const parsed = schema.safeParse(processEnv);

  if (!parsed.success) {
    const message = `\u274c Invalid environment variables:\n${formatIssues(
      parsed.error.issues,
    )}`;
    throw new Error(message);
  }

  return parsed.data as Env;
}

export const env: Env = loadEnv();

export const isProduction = env.NODE_ENV === "production";
export const isDevelopment = env.NODE_ENV === "development";
export const isTest = env.NODE_ENV === "test";

/**
 * True when Supabase has not been pointed at a real project yet. Used to render
 * a helpful setup notice instead of failing silently during local development.
 */
export const isSupabaseConfigured =
  !env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
  !env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project-ref") &&
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-anon-key" &&
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "your-anon-key";

if (isServer && isDevelopment && !isSupabaseConfigured) {
  console.warn(
    "\u26a0\ufe0f  Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env to enable authentication.",
  );
}
