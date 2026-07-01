import "server-only";

import { OpenAIProvider } from "@/features/ai/providers/openai.provider";
import { RuleBasedProvider } from "@/features/ai/providers/rule-based.provider";
import type { AIProvider } from "@/features/ai/providers/types";
import { AdminService } from "@/features/admin/services/admin.service";
import { ChatService } from "@/features/ai/services/chat.service";
import { AlertService } from "@/features/alerts/services/alert.service";
import { BillingService } from "@/features/billing/services/billing.service";
import { NotificationService } from "@/features/notifications/services/notification.service";
import { ProductRepository } from "@/features/products/repositories/product.repository";
import { ProductService } from "@/features/products/services/product.service";
import { SearchService } from "@/features/search/services/search.service";
import { UserRepository } from "@/features/users/repositories/user.repository";
import { UserService } from "@/features/users/services/user.service";
import type { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

import { Container, createToken } from "./container";

/**
 * Application composition root. Register every dependency here; resolve them
 * through the container so wiring stays in one place and services remain
 * decoupled from their concrete collaborators.
 */
export const TOKENS = {
  Prisma: createToken<PrismaClient>("PrismaClient"),
  UserRepository: createToken<UserRepository>("UserRepository"),
  UserService: createToken<UserService>("UserService"),
  ProductRepository: createToken<ProductRepository>("ProductRepository"),
  ProductService: createToken<ProductService>("ProductService"),
  SearchService: createToken<SearchService>("SearchService"),
  AIProvider: createToken<AIProvider>("AIProvider"),
  ChatService: createToken<ChatService>("ChatService"),
  BillingService: createToken<BillingService>("BillingService"),
  NotificationService: createToken<NotificationService>("NotificationService"),
  AlertService: createToken<AlertService>("AlertService"),
  AdminService: createToken<AdminService>("AdminService"),
} as const;

export const container = new Container();

container
  .register(TOKENS.Prisma, () => prisma)
  .register(
    TOKENS.UserRepository,
    (c) => new UserRepository(c.resolve(TOKENS.Prisma)),
  )
  .register(
    TOKENS.UserService,
    (c) => new UserService(c.resolve(TOKENS.UserRepository)),
  )
  .register(
    TOKENS.ProductRepository,
    (c) => new ProductRepository(c.resolve(TOKENS.Prisma)),
  )
  .register(
    TOKENS.ProductService,
    (c) => new ProductService(c.resolve(TOKENS.ProductRepository)),
  )
  .register(
    TOKENS.SearchService,
    (c) => new SearchService(c.resolve(TOKENS.Prisma)),
  )
  .register(TOKENS.AIProvider, (c) => {
    const productService = c.resolve(TOKENS.ProductService);
    const useOpenAI =
      env.AI_PROVIDER === "openai" ||
      (env.AI_PROVIDER === "auto" && env.OPENAI_API_KEY.length > 0);
    return useOpenAI
      ? new OpenAIProvider(productService)
      : new RuleBasedProvider(productService);
  })
  .register(
    TOKENS.ChatService,
    (c) =>
      new ChatService(
        c.resolve(TOKENS.AIProvider),
        new RuleBasedProvider(c.resolve(TOKENS.ProductService)),
        c.resolve(TOKENS.Prisma),
      ),
  )
  .register(
    TOKENS.BillingService,
    (c) => new BillingService(c.resolve(TOKENS.Prisma)),
  )
  .register(
    TOKENS.NotificationService,
    (c) => new NotificationService(c.resolve(TOKENS.Prisma)),
  )
  .register(
    TOKENS.AlertService,
    (c) =>
      new AlertService(
        c.resolve(TOKENS.Prisma),
        c.resolve(TOKENS.NotificationService),
      ),
  )
  .register(
    TOKENS.AdminService,
    (c) => new AdminService(c.resolve(TOKENS.Prisma)),
  );

export function getUserService(): UserService {
  return container.resolve(TOKENS.UserService);
}

export function getProductService(): ProductService {
  return container.resolve(TOKENS.ProductService);
}

export function getSearchService(): SearchService {
  return container.resolve(TOKENS.SearchService);
}

export function getChatService(): ChatService {
  return container.resolve(TOKENS.ChatService);
}

export function getBillingService(): BillingService {
  return container.resolve(TOKENS.BillingService);
}

export function getNotificationService(): NotificationService {
  return container.resolve(TOKENS.NotificationService);
}

export function getAlertService(): AlertService {
  return container.resolve(TOKENS.AlertService);
}

export function getAdminService(): AdminService {
  return container.resolve(TOKENS.AdminService);
}

export { Container, createToken } from "./container";
export type { Token } from "./container";
