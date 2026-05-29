"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

const SCROLL_DEG_PER_PX = {
  33: 0.45,
  45: 0.65,
} as const;

export function useDiscRotation(
  ref: RefObject<HTMLElement | null>,
  rpm: 33 | 45,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const factor = SCROLL_DEG_PER_PX[rpm];
    let frame = 0;

    const apply = () => {
      frame = 0;
      gsap.set(el, { rotation: window.scrollY * factor });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, rpm]);
}
