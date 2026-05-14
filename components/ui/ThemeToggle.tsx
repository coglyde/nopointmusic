"use client";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"
      }
      className="fixed bottom-6 right-6 z-30 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft hover:text-ink transition-colors duration-200 select-none cursor-pointer"
    >
      <span className="opacity-60">[ </span>
      <span className={theme === "light" ? "text-ink" : ""}>light</span>
      <span className="opacity-60"> · </span>
      <span className={theme === "dark" ? "text-ink" : ""}>dark</span>
      <span className="opacity-60"> ]</span>
    </button>
  );
}
