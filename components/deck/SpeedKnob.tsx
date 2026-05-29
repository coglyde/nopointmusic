"use client";

import { SPEED_KNOB } from "@/lib/deck-geometry";
import type { Rpm } from "@/hooks/useSpeedKnob";

type Props = {
  rpm: Rpm;
  onToggle: () => void;
};

export function SpeedKnob({ rpm, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Speed: ${rpm} RPM. Click to toggle.`}
      className="absolute aspect-square w-[8%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus:outline-none"
      style={{
        left: `${SPEED_KNOB.centerX}%`,
        top: `${SPEED_KNOB.centerY}%`,
      }}
    >
      <span className="sr-only">{rpm} RPM</span>
    </button>
  );
}
