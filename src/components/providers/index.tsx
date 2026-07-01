"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Composed client-side providers mounted once at the root: theme (light/dark),
 * TanStack Query cache, tooltip delay grouping, and the toast portal.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <TooltipProvider delay={200}>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </TooltipProvider>
        <Toaster position="top-center" />
      </QueryProvider>
    </ThemeProvider>
  );
}
