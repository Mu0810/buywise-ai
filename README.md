# BuyWise AI

**Shop smarter with AI.** BuyWise AI is an AI-powered shopping intelligence platform. Instead of opening a dozen retailer tabs, you ask in plain language — *"best coding laptop under ₹70,000"* — and get researched, compared, and value-scored recommendations across multiple stores, with review summaries, fake-review estimates, and price tracking.

The experience is ChatGPT meets Google Shopping.

---

## Features

- **AI shopping assistant** — natural-language queries with intelligent follow-up questions (Windows or Mac? battery priority? budget?) before recommending.
- **Multi-store search** — provider-based architecture (Amazon, Flipkart, Croma, Reliance Digital, Vijay Sales, and brand stores). New providers plug in without touching business logic.
- **Product analysis** — AI Score plus performance, battery, display, camera, value, and repairability sub-scores; pros/cons; who should (and shouldn't) buy.
- **Price comparison** — lowest price, fastest delivery, official store, best deal, coupons and cashback across every provider.
- **AI review analysis** — an overall summary, common praises and complaints, long-term ownership insights, an AI verdict, and an explainable fake-review estimate (clearly labelled as an estimate).
- **Smart tools** — wishlist, compare (up to four), recently viewed, and price-drop alerts.
- **Accounts & dashboard** — recent searches, saved products, alerts, money saved, and personalized recommendations.
- **Subscriptions** — Stripe-backed Premium/Family plans with a customer billing portal.
- **Admin** — analytics overview plus product, user, and store management (admin-gated).
- **Notifications** — in-app notifications with a scheduled price-drop check job.

> Search, chat, product pages, wishlist, compare, and alerts work without an account. Dashboard, subscriptions, notifications, and admin require authentication.

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Server Actions, Route Handlers) |
| UI | React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui (base-nova on Base UI), Framer Motion |
| State / data | Zustand, TanStack Query, React Hook Form, Zod |
| Backend | PostgreSQL, Prisma 7 (driver adapter), Redis |
| Auth | Supabase Auth (`@supabase/ssr`) |
| AI | OpenAI SDK behind a provider abstraction, with a no-key rule-based fallback engine |
| Payments | Stripe |
| Tests | Vitest |
| Deploy | Vercel |

---

## Architecture

Feature-based clean architecture with clear separation between UI, application, and data layers.

```
src/
  app/                     # Next.js App Router
    (marketing)/           # public landing
    (auth)/                # sign in / sign up
    (app)/                 # authenticated app shell
    api/                   # route handlers (stripe webhook, cron)
    auth/                  # supabase auth callback
    robots.ts sitemap.ts manifest.ts icon.tsx opengraph-image.tsx
  features/                # one folder per domain
    ai/ alerts/ admin/ auth/ billing/ compare/ dashboard/
    marketing/ notifications/ products/ search/ users/ wishlist/
    #  each: components/ · services/ · repositories/ · actions/ · lib/ · types
  server/
    container/             # dependency-injection container (TOKENS + accessors)
  lib/                     # env, prisma client, redis, logger, utils
  components/              # shared UI (ui/, app/, providers/, shared/)
  config/                  # site + brand config
  hooks/                   # shared React hooks
  generated/prisma/        # generated Prisma client (not hand-edited)
```

Domains follow the repository + service pattern and are wired through a small DI container (`src/server/container`), so services depend on interfaces rather than concrete implementations. Money is stored as whole rupees (`Int`) and formatted via `formatPrice()`.

---

## Prerequisites

- **Node.js 20+** (22 recommended — see `.nvmrc`)
- **pnpm** (`corepack enable` then `corepack prepare pnpm@latest --activate`)
- **Docker** (for local PostgreSQL + Redis) — or your own Postgres/Redis instances

---

## Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Create your env file and fill in values
cp .env.example .env

# 3. Start Postgres + Redis
docker compose up -d

# 4. Apply the database schema
pnpm db:deploy      # or: pnpm db:migrate (dev migrations)

# 5. Seed the product catalog (15 products, offers, price history, reviews)
pnpm db:seed

# 6. Run the dev server
pnpm dev
```

Open http://localhost:3000.

> If your OS hits file-watcher limits (`EMFILE`) under `pnpm dev`, use `pnpm dev:mac`, which runs the dev server with filesystem polling.

The app runs out of the box with a built-in rule-based AI engine and no external keys. Add real credentials to unlock authentication, real AI responses, and payments (see below).

---

## Environment variables

Copy `.env.example` to `.env`. Only `DATABASE_URL` is strictly required; everything else has safe defaults and the related feature gates off cleanly when unset.

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_URL` | No | Redis (defaults to `redis://localhost:6379`) |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For auth | Supabase project — enables sign in/up |
| `SUPABASE_SERVICE_ROLE_KEY` | For admin ops | Server-only service role |
| `NEXT_PUBLIC_APP_URL` | Recommended | Absolute base URL for links, OG images, sitemap |
| `AI_PROVIDER` | No | `auto` (default), `openai`, or `rule-based` |
| `OPENAI_API_KEY` / `OPENAI_MODEL` | For real AI | Enables the OpenAI provider (`auto` uses it when the key is present) |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For payments | Stripe API + webhook verification |
| `STRIPE_PRICE_PREMIUM_MONTHLY` / `_YEARLY`, `STRIPE_PRICE_FAMILY_MONTHLY` / `_YEARLY` | For payments | Recurring price IDs |
| `CRON_SECRET` | For the cron job | Bearer token required by `/api/cron/check-alerts` in production |

Never commit `.env` — it is git-ignored.

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm dev:mac` | Dev server with filesystem polling (EMFILE-safe) |
| `pnpm build` | Generate the Prisma client and build for production |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`) |
| `pnpm test` | Run the Vitest suite once |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm format` / `format:check` | Prettier write / check |
| `pnpm db:migrate` | Create/apply dev migrations |
| `pnpm db:deploy` | Apply migrations (non-interactive, for CI/prod) |
| `pnpm db:seed` | Seed the catalog |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:reset` | Reset the database |
| `pnpm make-admin <email>` | Grant a user the admin role |

---

## Testing

```bash
pnpm test
```

Vitest covers the pure business logic (search query parsing, formatting/utility helpers, and product-offer selection/derivation). Add tests alongside the code they cover as `*.test.ts`.

---

## Deployment (Vercel)

1. Import the repository into Vercel.
2. Set every production environment variable from the table above (use production Supabase, Stripe, and a managed Postgres such as Supabase Postgres).
3. Set `DATABASE_URL` to your managed Postgres connection string.
4. Deploy. `pnpm build` runs `prisma generate` automatically; run `pnpm db:deploy` against production once (or as a release step) to apply migrations.

`vercel.json` registers a cron that calls `/api/cron/check-alerts` every 6 hours to run price-drop checks. Set `CRON_SECRET` in Vercel so the endpoint is authenticated (Vercel Cron sends it as a Bearer token). Node version is pinned via `.nvmrc` and `engines`.

### Stripe webhook

Point a Stripe webhook at `https://<your-domain>/api/webhooks/stripe` and set `STRIPE_WEBHOOK_SECRET`. The handler processes checkout completion and subscription lifecycle events. Without Stripe keys, billing routes gate off and the webhook returns 503.

---

## Security notes

- Route protection is enforced in middleware; server actions and route handlers re-check authorization.
- Security headers and `poweredByHeader: false` are configured in `next.config.ts`.
- Secrets live only in `.env` / your host's env store and are never sent to the client (only `NEXT_PUBLIC_*` values are exposed to the browser).
- The fake-review signal is an explainable heuristic estimate, surfaced as an estimate — not a definitive judgement.
