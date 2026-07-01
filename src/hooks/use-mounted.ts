"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after hydration on the client. Implemented with
 * `useSyncExternalStore` so server and first client render agree (returns
 * false), then flips to true — avoiding hydration mismatches for UI that
 * depends on localStorage-backed stores.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
