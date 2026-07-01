import "dotenv/config";
import { defineConfig } from "prisma/config";

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
    url: process.env["DATABASE_URL"],
  },
});
