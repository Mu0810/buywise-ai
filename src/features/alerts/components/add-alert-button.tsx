"use client";

import { BellRing } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { useAlertsStore } from "@/features/alerts/store";
import {
  removePriceAlert,
  syncPriceAlert,
} from "@/features/alerts/actions/alert.actions";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

export function AddAlertButton({
  productId,
  currentPrice,
}: {
  productId: string;
  currentPrice: number | null;
}) {
  const mounted = useMounted();
  const existing = useAlertsStore((s) =>
    s.alerts.find((a) => a.productId === productId),
  );
  const upsert = useAlertsStore((s) => s.upsert);
  const remove = useAlertsStore((s) => s.remove);
  const [open, setOpen] = useState(false);
  const suggested = currentPrice ? Math.round(currentPrice * 0.9) : 0;
  const [target, setTarget] = useState(String(existing?.targetPrice ?? suggested));
  const active = mounted && Boolean(existing);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = Number(target);
    if (!Number.isFinite(value) || value <= 0) {
      toast.error("Enter a valid target price.");
      return;
    }
    upsert(productId, Math.round(value));
    void syncPriceAlert(productId, Math.round(value));
    setOpen(false);
    toast.success(`Price alert set for ${formatPrice(Math.round(value))}`);
  }

  return (
    <Dialog open={open} onOpenChange={(next) => setOpen(next)}>
      <DialogTrigger
        render={<Button variant="outline" className="gap-1.5 w-full" />}
      >
        <BellRing className={active ? "size-4 text-brand" : "size-4"} />
        {active ? "Alert set" : "Set price alert"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set a price alert</DialogTitle>
          <DialogDescription>
            We&apos;ll flag this product when it drops to your target price.
            {currentPrice
              ? ` Current best price: ${formatPrice(currentPrice)}.`
              : ""}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="target-price" className="text-sm font-medium">
              Target price (₹)
            </label>
            <Input
              id="target-price"
              type="number"
              inputMode="numeric"
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter className="sm:justify-between">
            {active ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  remove(productId);
                  void removePriceAlert(productId);
                  setOpen(false);
                  toast.success("Price alert removed");
                }}
              >
                Remove alert
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit">Save alert</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
