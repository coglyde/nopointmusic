import {
  Info,
  Ticket,
  Radio,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  // The icon the cursor morphs into while this item is hovered.
  Icon: LucideIcon;
};

// Music and Merch are temporarily hidden until they have real content (their
// routes redirect home, see next.config.ts). Re-add them here to bring them back.
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "About", href: "/about", Icon: Info },
  { label: "Events", href: "/events", Icon: Ticket },
  { label: "Foundations", href: "/foundations", Icon: HeartHandshake },
  { label: "Radio", href: "/radio", Icon: Radio },
] as const;
