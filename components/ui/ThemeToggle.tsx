"use client";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className="fixed bottom-6 right-6 z-30 hidden font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft select-none sm:block"
    >
      <span className="opacity-60">[ </span>
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        className={`cursor-pointer transition-colors duration-200 hover:text-ink ${
          theme === "light" ? "text-ink" : ""
        }`}
      >
        light
      </button>
      <span className="opacity-60"> · </span>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        className={`cursor-pointer transition-colors duration-200 hover:text-ink ${
          theme === "dark" ? "text-ink" : ""
        }`}
      >
        dark
      </button>
      <span className="opacity-60"> ]</span>
    </div>
  );
}
