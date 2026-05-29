"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { usePointerFollow } from "@/hooks/usePointerFollow";

type Props = {
  // The icon to use as the cursor, or null to fade back to the normal pointer.
  Icon: LucideIcon | null;
};

// Replaces the mouse pointer with a bare Lucide glyph while a menu item is
// hovered. Render-only and non-interactive so it never blocks the links beneath
// it. The menu hides the native cursor, so this *is* the cursor.
export function CursorIcon({ Icon }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  usePointerFollow(ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
    >
      <div
        className={`transition-opacity duration-150 ease-out [filter:drop-shadow(0_1px_3px_rgb(0_0_0/0.6))] ${
          Icon ? "opacity-100" : "opacity-0"
        }`}
      >
        {Icon ? (
          <Icon className="h-12 w-12 text-white" strokeWidth={1.75} />
        ) : null}
      </div>
    </div>
  );
}
