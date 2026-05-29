"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";

type Props = {
  // Reports which item is hovered so the parent can morph the cursor.
  onActive: (Icon: LucideIcon | null) => void;
  cursorHidden: boolean;
};

export function HeroMenu({ onActive, cursorHidden }: Props) {
  return (
    <nav
      aria-label="Primary"
      onMouseLeave={() => onActive(null)}
      style={{ cursor: cursorHidden ? "none" : undefined }}
      className="flex flex-col"
    >
      {NAV_ITEMS.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          onMouseEnter={() => onActive(item.Icon)}
          onFocus={() => onActive(item.Icon)}
          onBlur={() => onActive(null)}
          className="group flex items-baseline gap-4 py-0.5"
        >
          <span className="font-mono text-xs tabular-nums text-white/45 transition-colors group-hover:text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="relative text-[2.6rem] font-black uppercase leading-[1.04] tracking-[-0.02em] text-white/95 transition-colors duration-200 group-hover:text-accent sm:text-6xl">
            {item.label}
            <span className="absolute -bottom-0.5 left-0 h-[3px] w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
          </span>
        </Link>
      ))}
    </nav>
  );
}
