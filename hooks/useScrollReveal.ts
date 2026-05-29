"use client";

import { useEffect, useRef, useState } from "react";

// Tracks how far an element has travelled through the viewport's reading band
// and returns progress 0→1. 0 while the element sits low on screen, 1 once it
// has risen to the upper third - that travel is what drives a word-by-word
// reveal. rAF-throttled, passive listener, and respects reduced motion (jumps
// straight to fully revealed).
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      // Skip the reveal entirely - show fully lit. Deferred a frame so we're
      // not setting state synchronously inside the effect body.
      frame = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(frame);
    }

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Reveal across the band from 85% down to 35% of the viewport height.
      const start = vh * 0.85;
      const end = vh * 0.35;
      const span = rect.height + (start - end);
      const travelled = start - rect.top;
      setProgress(Math.min(1, Math.max(0, travelled / span)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}
