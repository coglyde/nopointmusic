"use client";

import { useCardShuffle } from "@/hooks/useCardShuffle";
import { PolaroidCard } from "./PolaroidCard";

export type PolaroidItem = {
  id: string; // YouTube id (still + playback)
  caption: string;
  meta?: string;
};

type Props = {
  items: readonly PolaroidItem[];
  // Fired when the top card is tapped (not dragged).
  onOpen: (item: PolaroidItem) => void;
};

// Deterministic per-card tilt so SSR and client agree (no Math.random).
const TILT = [-5, 4, -3, 6, -2, 3, -4, 2];

// A draggable stack of instant-prints. Grab the top one and fling it, it sails
// off and re-stacks at the back. A tap (no drag) opens that capture. Back cards
// peek out, tilted, so the stack reads as a real pile of photos.
export function PolaroidShuffle({ items, onOpen }: Props) {
  const { order, drag, advance, onPointerDown, onPointerMove, onPointerUp } =
    useCardShuffle(items.length);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-[340px] w-[260px] sm:h-[380px] sm:w-[300px]">
        {order.map((itemIndex, pos) => {
          const item = items[itemIndex];
          const isTop = pos === 0;
          const tilt = TILT[itemIndex % TILT.length];

          const transform = isTop
            ? `translate(${drag.dx}px, ${drag.dy}px) rotate(${
                tilt + drag.dx * 0.04
              }deg)`
            : `translate(${pos * 5}px, ${pos * 7}px) rotate(${
                tilt * 0.6
              }deg) scale(${1 - pos * 0.03})`;

          return (
            <div
              key={item.id}
              className={`absolute inset-0 ${isTop ? "cursor-grab active:cursor-grabbing touch-none" : ""} ${
                isTop && drag.dragging ? "" : "transition-transform duration-300 ease-out"
              } ${!isTop && pos > 2 ? "opacity-0" : ""}`}
              style={{ transform, zIndex: items.length - pos }}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? () => onPointerUp(() => onOpen(item)) : undefined}
              onPointerCancel={isTop ? () => onPointerUp() : undefined}
              onTransitionEnd={
                isTop ? () => drag.leaving && advance() : undefined
              }
              aria-hidden={!isTop}
            >
              <PolaroidCard id={item.id} caption={item.caption} meta={item.meta} />
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-ink">
        drag to shuffle · tap to play
      </p>
    </div>
  );
}
