import type { ReactNode } from "react";

// Minimal hand-rolled brand marks in lucide's stroke language (this lucide
// version ships no brand glyphs). Shared by the hero corner and the mobile
// menu so the look stays identical. They draw with currentColor, the caller
// sets size and colour.
export const BRAND_ICONS: Record<string, ReactNode> = {
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

// The primary channels, in display order.
export const PRIMARY_SOCIALS = ["Instagram", "SoundCloud", "YouTube"] as const;
