import type { GrooveTarget } from "./deck-geometry";

export type NavItem = {
  label: string;
  href: string;
  groove: GrooveTarget;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Music", href: "/music", groove: "music" },
  { label: "Events", href: "/events", groove: "events" },
  { label: "Radio", href: "/radio", groove: "radio" },
  { label: "Foundations", href: "/foundations", groove: "foundations" },
  { label: "Merch", href: "/merch", groove: "merch" },
] as const;
