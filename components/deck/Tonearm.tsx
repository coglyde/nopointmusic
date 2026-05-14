"use client";

import Image from "next/image";
import { forwardRef } from "react";
import {
  ARM_LENGTH_PCT,
  ARM_MOUNT,
  ARM_PIVOT_IN_IMAGE,
} from "@/lib/deck-geometry";

const ARM_NATURAL = { width: 260, height: 1194 } as const;
const ARM_ASPECT = ARM_NATURAL.width / ARM_NATURAL.height;
const ARM_WIDTH_PCT = ARM_LENGTH_PCT * ARM_ASPECT;

export const Tonearm = forwardRef<HTMLDivElement>(function Tonearm(_, ref) {
  return (
    <div
      className="absolute select-none pointer-events-auto"
      style={{
        left: `${ARM_MOUNT.centerX}%`,
        top: `${ARM_MOUNT.centerY}%`,
        width: `${ARM_WIDTH_PCT}%`,
        aspectRatio: `${ARM_NATURAL.width} / ${ARM_NATURAL.height}`,
        transform: `translate(-${ARM_PIVOT_IN_IMAGE.x}%, -${ARM_PIVOT_IN_IMAGE.y}%)`,
      }}
    >
      <div
        ref={ref}
        className="relative h-full w-full will-change-transform"
        style={{
          transformOrigin: `${ARM_PIVOT_IN_IMAGE.x}% ${ARM_PIVOT_IN_IMAGE.y}%`,
          filter: "drop-shadow(0 8px 12px rgba(24, 20, 16, 0.25))",
        }}
      >
        <Image
          src="/deck/arm.png"
          alt=""
          fill
          sizes="(max-width: 768px) 20vw, 10vw"
          priority
          draggable={false}
          className="select-none"
        />
      </div>
    </div>
  );
});
