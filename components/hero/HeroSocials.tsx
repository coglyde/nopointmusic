import type { ReactNode } from "react";
import { SOCIALS } from "@/lib/social";

// lucide (this version) ships no brand glyphs, so these are minimal hand-rolled
// marks in the same stroke language as the menu icons. Kept simple on purpose.
const ICONS: Record<string, ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  SoundCloud: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="13" x2="4" y2="17" />
      <line x1="7" y1="10.5" x2="7" y2="17" />
      <line x1="10" y1="9" x2="10" y2="17" />
      <path d="M13 17V9.5a3.6 3.6 0 0 1 6.8 1.4A2.8 2.8 0 0 1 19 17Z" />
    </svg>
  ),
  YouTube: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinejoin="round"
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.2 15 12l-4.8 2.8z" fill="currentColor" stroke="none" />
    </svg>
  ),
};

// The three primary channels shown.
const ORDER = ["Instagram", "SoundCloud", "YouTube"] as const;

// Minimal social icons pinned to the hero's bottom-left, mirroring the theme
// switcher on the bottom-right. White over the dark footage, brightening on
// hover — no theme dependence since the hero is always dark.
export function HeroSocials() {
  return (
    <div className="absolute bottom-6 left-6 z-20 flex items-center gap-5 sm:left-10">
      {ORDER.map((label) => {
        const social = SOCIALS.find((s) => s.label === label);
        if (!social) return null;
        return (
          <a
            key={label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="block h-[18px] w-[18px] text-white/55 transition-colors duration-200 hover:text-white"
          >
            {ICONS[label]}
          </a>
        );
      })}
    </div>
  );
}
