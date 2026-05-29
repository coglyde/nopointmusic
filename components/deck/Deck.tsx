"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plinth } from "./Plinth";
import { Vinyl } from "./Vinyl";
import { Tonearm } from "./Tonearm";
import { SpeedKnob } from "./SpeedKnob";
import { NavLabels } from "./NavLabels";
import { VideoTrail } from "./VideoTrail";
import { useDiscRotation } from "@/hooks/useDiscRotation";
import { useSpeedKnob } from "@/hooks/useSpeedKnob";
import { useTonearm } from "@/hooks/useTonearm";
import { PLINTH_ASPECT, type GrooveTarget } from "@/lib/deck-geometry";
import { NAV_ITEMS } from "@/lib/deck-routes";
import { TRAIL_ITEMS } from "@/lib/trail-items";

const SWING_TO_ROUTE_DELAY_MS = 700;

export function Deck() {
  const router = useRouter();
  const vinylRef = useRef<HTMLDivElement>(null);
  const deckWrapRef = useRef<HTMLDivElement>(null);
  const armRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<GrooveTarget | null>(null);

  const { rpm, toggle } = useSpeedKnob();
  useDiscRotation(vinylRef, rpm);
  const { swingTo, peekFrom, settleAt } = useTonearm(armRef);

  const handleHover = (groove: GrooveTarget) => {
    peekFrom(active, groove);
  };

  const handleLeave = () => {
    settleAt(active);
  };

  const handleSelect = (groove: GrooveTarget) => {
    setActive(groove);
    swingTo(groove);
    const target = NAV_ITEMS.find((item) => item.groove === groove);
    if (target) {
      window.setTimeout(() => router.push(target.href), SWING_TO_ROUTE_DELAY_MS);
    }
  };

  return (
    <div className="flex items-center justify-center gap-10 px-6">
      <NavLabels
        active={active}
        onHover={handleHover}
        onLeave={handleLeave}
        onSelect={handleSelect}
      />
      <div
        ref={deckWrapRef}
        className="relative shrink-0"
        style={{
          aspectRatio: PLINTH_ASPECT,
          height: `min(78vh, calc(58vw / ${PLINTH_ASPECT}))`,
        }}
      >
        <Plinth />
        <Vinyl ref={vinylRef} />
        <Tonearm ref={armRef} />
        <SpeedKnob rpm={rpm} onToggle={toggle} />
      </div>
      <VideoTrail
        trackRef={deckWrapRef}
        items={TRAIL_ITEMS}
        spawnDistance={200}
      />
    </div>
  );
}
