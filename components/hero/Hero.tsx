"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { HeroVideo } from "./HeroVideo";
import { HeroMenu } from "./HeroMenu";
import { CursorIcon } from "./CursorIcon";

// The hero owns one piece of state — which menu icon the cursor is currently
// wearing — and wires the video, menu, and cursor together. The persistent top
// bar lives in SiteHeader, above this section.
export function Hero() {
  const [Icon, setIcon] = useState<LucideIcon | null>(null);

  return (
    <section className="relative flex min-h-dvh flex-col">
      <HeroVideo />

      <div className="flex flex-1 items-center px-6 pb-24 pt-28 sm:px-10">
        <HeroMenu onActive={setIcon} />
      </div>

      <p className="pointer-events-none absolute bottom-7 left-0 right-0 text-center font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
        art for art
      </p>

      <CursorIcon Icon={Icon} />
    </section>
  );
}
