import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface LocalPriceAlert {
  productId: string;
  targetPrice: number;
  createdAt: string;
}

interface AlertsState {
  alerts: LocalPriceAlert[];
  upsert: (productId: string, targetPrice: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

export const useAlertsStore = create<AlertsState>()(
  persist(
    (set) => ({
      alerts: [],
      upsert: (productId, targetPrice) =>
        set((state) => {
          const existing = state.alerts.find((a) => a.productId === productId);
          if (existing) {
            return {
              alerts: state.alerts.map((a) =>
                a.productId === productId ? { ...a, targetPrice } : a,
              ),
            };
          }
          return {
            alerts: [
              { productId, targetPrice, createdAt: new Date().toISOString() },
              ...state.alerts,
            ],
          };
        }),
      remove: (productId) =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.productId !== productId),
        })),
      clear: () => set({ alerts: [] }),
    }),
    { name: "buywise-alerts" },
  ),
);
