"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { PLATTER } from "@/lib/deck-geometry";

export const Vinyl = forwardRef<HTMLDivElement>(function Vinyl(_, ref) {
  return (
    <div
      className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        width: `${PLATTER.diameter}%`,
        left: `${PLATTER.centerX}%`,
        top: `${PLATTER.centerY}%`,
      }}
    >
      <div ref={ref} className="relative h-full w-full will-change-transform">
        <Image
          src="/deck/vinyl.png"
          alt=""
          fill
          sizes="(max-width: 768px) 80vw, 40vw"
          priority
          draggable={false}
          className="select-none"
        />
      </div>
    </div>
  );
});
