import {
  Music,
  Ticket,
  Radio,
  HeartHandshake,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  // The icon the cursor morphs into while this item is hovered.
  Icon: LucideIcon;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Music", href: "/music", Icon: Music },
  { label: "Events", href: "/events", Icon: Ticket },
  { label: "Foundations", href: "/foundations", Icon: HeartHandshake },
  { label: "Merch", href: "/merch", Icon: ShoppingBag },
  { label: "Radio", href: "/radio", Icon: Radio },
] as const;
