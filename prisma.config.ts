import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Resolve the datasource URL. Managed Postgres (Heroku, Supabase, RDS, etc.)
 * requires TLS and commonly presents self-signed certificates, so we append
 * `sslmode=require` (encrypt without CA verification) for remote databases.
 * Local Docker Postgres (localhost) is left as-is.
 */
function resolveDatabaseUrl(): string | undefined {
  const url = process.env["DATABASE_URL"];
  if (!url) return url;
  const isLocal = /@(localhost|127\.0\.0\.1)\b/.test(url);
  if (isLocal || url.includes("sslmode=")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}sslmode=require`;
}

/**
 * Prisma 7 configuration. The datasource URL is provided here (loaded from
 * `.env` via dotenv) rather than in the schema, which is the v7 convention.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: resolveDatabaseUrl(),
  },
});
