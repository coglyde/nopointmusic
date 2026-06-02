"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";

type Props = {
  // Reports which item is hovered so the parent can morph the cursor.
  onActive: (Icon: LucideIcon | null) => void;
};

export function HeroMenu({ onActive }: Props) {
  return (
    <nav
      aria-label="Primary"
      onMouseLeave={() => onActive(null)}
      className="flex flex-col"
    >
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onMouseEnter={() => onActive(item.Icon)}
          onFocus={() => onActive(item.Icon)}
          onBlur={() => onActive(null)}
          // Hide the native pointer over the word so the icon-cursor stands in.
          className="group block py-0.5 md:cursor-none"
        >
          <span className="text-[2.6rem] font-black uppercase leading-[1.04] tracking-[-0.02em] text-white/95 transition-colors duration-200 group-hover:text-accent sm:text-6xl">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
