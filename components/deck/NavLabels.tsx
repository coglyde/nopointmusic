"use client";

import { NAV_ITEMS } from "@/lib/deck-routes";
import type { GrooveTarget } from "@/lib/deck-geometry";

type Props = {
  active: GrooveTarget | null;
  onHover: (groove: GrooveTarget) => void;
  onLeave: () => void;
  onSelect: (groove: GrooveTarget) => void;
};

export function NavLabels({ active, onHover, onLeave, onSelect }: Props) {
  return (
    <nav
      aria-label="Primary"
      onMouseLeave={onLeave}
      className="flex flex-col gap-1"
    >
      {NAV_ITEMS.map((item, i) => {
        const isActive = active === item.groove;
        return (
          <button
            key={item.groove}
            type="button"
            onMouseEnter={() => onHover(item.groove)}
            onFocus={() => onHover(item.groove)}
            onClick={() => onSelect(item.groove)}
            className="group relative flex items-baseline gap-3 text-left"
          >
            <span
              className={`font-mono text-[0.7rem] tracking-[0.3em] tabular-nums transition-colors ${
                isActive ? "text-accent" : "text-ink-soft group-hover:text-accent"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`relative text-[2.4rem] font-black uppercase leading-[1.05] tracking-[-0.02em] transition-colors duration-200 ${
                isActive ? "text-accent" : "text-ink group-hover:text-accent"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-[3px] bg-accent transition-all duration-300 ease-out ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
