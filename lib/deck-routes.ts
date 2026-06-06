import type { GrooveTarget } from "./deck-geometry";

export type NavItem = {
  label: string;
  href: string;
  groove: GrooveTarget;
};

// Music and Merch are temporarily hidden until they have real content. Re-add
// them here (and in lib/nav.ts) to bring them back; their grooves still exist.
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "About", href: "/about", groove: "about" },
  { label: "Events", href: "/events", groove: "events" },
  { label: "Foundations", href: "/foundations", groove: "foundations" },
  { label: "Radio", href: "/radio", groove: "radio" },
] as const;
