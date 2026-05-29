"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollSpin } from "@/hooks/useScrollSpin";

type Props = {
  // Rendered size in pixels (square).
  size?: number;
  // "scroll" rotates with page scroll; "auto" spins continuously (CSS).
  driver?: "scroll" | "auto";
  // Continuous mode only: seconds per full rotation.
  spinSeconds?: number;
  className?: string;
};

// The vinyl record. Scroll-driven by default (spins as you scroll, rests when
// you stop). Reused in the navbar today and earmarked for the music section
// (animating a selected track onto it).
export function SpinningVinyl({
  size = 40,
  driver = "scroll",
  spinSeconds = 6,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollSpin(ref, { enabled: driver === "scroll" });

  return (
    <div
      className={`relative shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        ref={ref}
        className={`relative h-full w-full will-change-transform ${
          driver === "auto" ? "animate-vinyl-spin" : ""
        }`}
        style={driver === "auto" ? { animationDuration: `${spinSeconds}s` } : undefined}
      >
        <Image
          src="/deck/vinyl.png"
          alt=""
          aria-hidden
          fill
          sizes={`${size}px`}
          draggable={false}
        />
      </div>
    </div>
  );
}
