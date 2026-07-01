import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient, type Prisma } from "../src/generated/prisma/client";
import { catalog } from "./data/catalog";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Create a .env file (see .env.example).");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const stores: Prisma.StoreCreateInput[] = [
  {
    slug: "amazon",
    name: "Amazon",
    websiteUrl: "https://www.amazon.in",
    type: "MARKETPLACE",
    affiliateTag: "buywise-21",
  },
  {
    slug: "flipkart",
    name: "Flipkart",
    websiteUrl: "https://www.flipkart.com",
    type: "MARKETPLACE",
  },
  {
    slug: "croma",
    name: "Croma",
    websiteUrl: "https://www.croma.com",
    type: "RETAILER",
  },
  {
    slug: "reliance-digital",
    name: "Reliance Digital",
    websiteUrl: "https://www.reliancedigital.in",
    type: "RETAILER",
  },
  {
    slug: "vijay-sales",
    name: "Vijay Sales",
    websiteUrl: "https://www.vijaysales.com",
    type: "RETAILER",
  },
  {
    slug: "apple",
    name: "Apple Store",
    websiteUrl: "https://www.apple.com/in",
    type: "OFFICIAL",
    isOfficialChannel: true,
  },
  {
    slug: "samsung",
    name: "Samsung Shop",
    websiteUrl: "https://www.samsung.com/in",
    type: "OFFICIAL",
    isOfficialChannel: true,
  },
  {
    slug: "dell",
    name: "Dell",
    websiteUrl: "https://www.dell.com/en-in",
    type: "OFFICIAL",
    isOfficialChannel: true,
  },
  {
    slug: "lenovo",
    name: "Lenovo",
    websiteUrl: "https://www.lenovo.com/in",
    type: "OFFICIAL",
    isOfficialChannel: true,
  },
  {
    slug: "hp",
    name: "HP Store",
    websiteUrl: "https://www.hp.com/in-en",
    type: "OFFICIAL",
    isOfficialChannel: true,
  },
  {
    slug: "asus",
    name: "ASUS Store",
    websiteUrl: "https://www.asus.com/in",
    type: "OFFICIAL",
    isOfficialChannel: true,
  },
];

const categories: Prisma.CategoryCreateInput[] = [
  { slug: "laptops", name: "Laptops", icon: "laptop", description: "Ultrabooks, gaming and workstation laptops." },
  { slug: "smartphones", name: "Smartphones", icon: "smartphone", description: "Flagship, mid-range and budget phones." },
  { slug: "audio", name: "Audio", icon: "headphones", description: "Earbuds, headphones and speakers." },
  { slug: "cameras", name: "Cameras", icon: "camera", description: "Mirrorless, DSLR and point-and-shoot." },
  { slug: "tablets", name: "Tablets", icon: "tablet", description: "Tablets and 2-in-1 devices." },
  { slug: "wearables", name: "Wearables", icon: "watch", description: "Smartwatches and fitness bands." },
  { slug: "televisions", name: "Televisions", icon: "tv", description: "Smart TVs across every size." },
  { slug: "appliances", name: "Home Appliances", icon: "washing-machine", description: "Washing machines, refrigerators and more." },
  { slug: "monitors", name: "Monitors", icon: "monitor", description: "Productivity and gaming monitors." },
  { slug: "gaming", name: "Gaming", icon: "gamepad-2", description: "Consoles and gaming accessories." },
];

const brands: Prisma.BrandCreateInput[] = [
  { slug: "apple", name: "Apple" },
  { slug: "samsung", name: "Samsung" },
  { slug: "dell", name: "Dell" },
  { slug: "lenovo", name: "Lenovo" },
  { slug: "hp", name: "HP" },
  { slug: "asus", name: "ASUS" },
  { slug: "acer", name: "Acer" },
  { slug: "sony", name: "Sony" },
  { slug: "lg", name: "LG" },
  { slug: "oneplus", name: "OnePlus" },
  { slug: "xiaomi", name: "Xiaomi" },
  { slug: "realme", name: "realme" },
  { slug: "nothing", name: "Nothing" },
  { slug: "google", name: "Google" },
  { slug: "boat", name: "boAt" },
  { slug: "jbl", name: "JBL" },
  { slug: "sennheiser", name: "Sennheiser" },
  { slug: "canon", name: "Canon" },
  { slug: "nikon", name: "Nikon" },
  { slug: "bosch", name: "Bosch" },
];

async function main() {
  console.log("Seeding stores, categories and brands...");

  for (const store of stores) {
    await prisma.store.upsert({
      where: { slug: store.slug },
      update: store,
      create: store,
    });
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
  }

  console.log("Seeding product catalog...");
  await seedCatalog();

  const [storeCount, categoryCount, brandCount, productCount, offerCount] =
    await Promise.all([
      prisma.store.count(),
      prisma.category.count(),
      prisma.brand.count(),
      prisma.product.count(),
      prisma.productOffer.count(),
    ]);

  console.log(
    `Seed complete: ${storeCount} stores, ${categoryCount} categories, ` +
      `${brandCount} brands, ${productCount} products, ${offerCount} offers.`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });

function priceTrend(current: number, mrp?: number) {
  const start = mrp
    ? Math.round((current + mrp) / 2)
    : Math.round(current * 1.12);
  const steps = [90, 75, 60, 45, 30, 15, 0];
  const last = steps.length - 1;
  return steps.map((daysAgo, i) => ({
    price: Math.round(start + (current - start) * (i / last)),
    recordedAt: new Date(Date.now() - daysAgo * 86_400_000),
  }));
}

function sentimentFor(rating: number) {
  const positive = Math.round((rating / 5) * 100);
  const negative = Math.max(0, Math.round(((5 - rating) / 5) * 60));
  const neutral = Math.max(0, 100 - positive - negative);
  return { positive, neutral, negative };
}

async function seedCatalog() {
  const [allStores, allCategories, allBrands] = await Promise.all([
    prisma.store.findMany(),
    prisma.category.findMany(),
    prisma.brand.findMany(),
  ]);
  const storeBySlug = new Map(allStores.map((s) => [s.slug, s]));
  const categoryBySlug = new Map(allCategories.map((c) => [c.slug, c.id]));
  const brandBySlug = new Map(allBrands.map((b) => [b.slug, b.id]));

  for (const p of catalog) {
    const categoryId = categoryBySlug.get(p.category);
    const brandId = brandBySlug.get(p.brand);
    if (!categoryId || !brandId) {
      console.warn(`Skipping ${p.slug}: unknown category/brand`);
      continue;
    }
    await upsertProduct(p, categoryId, brandId, storeBySlug);
  }
}

async function upsertProduct(
  p: (typeof catalog)[number],
  categoryId: string,
  brandId: string,
  storeBySlug: Map<string, { id: string; websiteUrl: string }>,
) {
  const data = {
    name: p.name,
    shortDescription: p.short,
    description: p.description,
    images: [] as string[],
    keySpecs: p.specs as Prisma.InputJsonValue,
    aiScore: p.scores.ai ?? null,
    performanceScore: p.scores.performance ?? null,
    batteryScore: p.scores.battery ?? null,
    displayScore: p.scores.display ?? null,
    cameraScore: p.scores.camera ?? null,
    valueScore: p.scores.value ?? null,
    buildScore: p.scores.build ?? null,
    repairScore: p.scores.repair ?? null,
    rating: p.rating,
    reviewCount: p.reviewCount,
    warrantyMonths: p.warrantyMonths,
    releaseDate: new Date(p.releaseDate),
    status: "ACTIVE" as const,
    categoryId,
    brandId,
  };
  const product = await prisma.product.upsert({
    where: { slug: p.slug },
    update: data,
    create: { slug: p.slug, ...data },
  });

  let cheapestOfferId: string | null = null;
  let cheapest = Number.MAX_SAFE_INTEGER;
  let referenceMrp: number | undefined;
  for (const o of p.offers) {
    const store = storeBySlug.get(o.store);
    if (!store) continue;
    const offerId = await upsertOffer(product.id, store.id, store.websiteUrl, o, p);
    if (o.price < cheapest) {
      cheapest = o.price;
      cheapestOfferId = offerId;
      referenceMrp = o.mrp;
    }
  }

  if (cheapestOfferId) {
    await prisma.priceHistory.deleteMany({ where: { productId: product.id } });
    await prisma.priceHistory.createMany({
      data: priceTrend(cheapest, referenceMrp).map((pt) => ({
        offerId: cheapestOfferId as string,
        productId: product.id,
        price: pt.price,
        recordedAt: pt.recordedAt,
      })),
    });
  }

  const reviewData = reviewDataFor(p.review, p.rating);
  await prisma.reviewAnalysis.upsert({
    where: { productId: product.id },
    update: reviewData,
    create: { productId: product.id, ...reviewData },
  });
}

async function upsertOffer(
  productId: string,
  storeId: string,
  url: string,
  o: (typeof catalog)[number]["offers"][number],
  p: (typeof catalog)[number],
): Promise<string> {
  const offerData = {
    url,
    price: o.price,
    mrp: o.mrp ?? null,
    inStock: true,
    deliveryDays: o.deliveryDays ?? null,
    cashback: o.cashback ?? 0,
    couponCode: o.couponCode ?? null,
    isOfficial: o.official ?? false,
    rating: p.rating,
    reviewCount: p.reviewCount,
    lastFetchedAt: new Date(),
  };
  const offer = await prisma.productOffer.upsert({
    where: { productId_storeId: { productId, storeId } },
    update: offerData,
    create: { productId, storeId, ...offerData },
  });
  return offer.id;
}

function reviewDataFor(r: (typeof catalog)[number]["review"], rating: number) {
  return {
    summary: r.summary,
    verdict: r.verdict,
    pros: r.pros,
    cons: r.cons,
    topPraises: r.praises,
    topComplaints: r.complaints,
    longTermInsights: r.longTerm,
    whoShouldBuy: r.buy,
    whoShouldAvoid: r.avoid,
    fakeReviewScore: r.fake,
    fakeReviewConfidence: r.fakeConfidence,
    sentiment: sentimentFor(rating) as Prisma.InputJsonValue,
    analyzedCount: r.analyzed,
    model: "buywise-heuristics-v1",
  };
}
