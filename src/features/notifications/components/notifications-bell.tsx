"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";

import {
  fetchNotifications,
  markAllNotificationsRead,
} from "@/features/notifications/actions/notification.actions";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatRelativeTime } from "@/lib/utils";

export function NotificationsBell() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 60_000,
  });
  const unread = data?.unread ?? 0;
  const items = data?.items ?? [];

  const markRead = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          />
        }
      >
        <Bell className="size-4" />
        {unread > 0 && (
          <span className="animate-pop-in absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-brand-foreground">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border/60 p-3">
          <span className="text-sm font-medium">Notifications</span>
          {unread > 0 && (
            <button
              type="button"
              onClick={() => markRead.mutate()}
              className="text-xs text-brand hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No notifications yet.
            </p>
          ) : (
            items.slice(0, 6).map((n) => (
              <div
                key={n.id}
                className={cn(
                  "border-b border-border/40 p-3 last:border-0",
                  !n.readAt && "bg-brand/5",
                )}
              >
                <p className="text-sm font-medium">{n.title}</p>
                {n.body && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {n.body}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-muted-foreground/70">
                  {formatRelativeTime(n.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-border/60 p-2">
          <ButtonLink href="/notifications" variant="ghost" className="w-full">
            View all
          </ButtonLink>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
