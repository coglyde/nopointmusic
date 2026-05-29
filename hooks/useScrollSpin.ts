"use client";

import { useEffect, type RefObject } from "react";

// Rotates an element in proportion to the page scroll position - the record
// spins as you scroll and rests when you stop. Writes `transform` on a rAF so
// it stays smooth.
export function useScrollSpin(
  ref: RefObject<HTMLElement | null>,
  { enabled = true, degPerPx = 0.25 }: { enabled?: boolean; degPerPx?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      el.style.transform = `rotate(${window.scrollY * degPerPx}deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, enabled, degPerPx]);
}
