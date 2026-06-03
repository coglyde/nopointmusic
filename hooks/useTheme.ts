"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

// Theme lives on the <html> data-theme attribute (set by an inline script before
// hydration to avoid a flash). This hook reads it via useSyncExternalStore so the
// client subscribes to changes without a setState-in-effect: null on the server
// and first hydration, the real theme immediately after.

const listeners = new Set<() => void>();

function readTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function applyTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    readTheme, // client snapshot
    () => null, // server snapshot (no theme known until mounted)
  );

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggle };
}
