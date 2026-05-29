"use client";

import { useCallback, useRef, useState } from "react";

// Distance (px) the top card must travel before it counts as a fling rather
// than a tap.
const FLING_THRESHOLD = 80;
// How far past the release point the flung card sails before re-stacking.
const FLING_MULTIPLIER = 5;

type Drag = { dx: number; dy: number; dragging: boolean; leaving: boolean };
const REST: Drag = { dx: 0, dy: 0, dragging: false, leaving: false };

// Owns the order of a card stack and the pointer-drag of its top card. The
// component decides what a card looks like and what a tap does; this hook only
// answers "where is the top card and where in the order is everything." A short
// drag is treated as a tap (onTap); a long drag flings the card and rotates it
// to the back of the stack.
export function useCardShuffle(count: number) {
  const [order, setOrder] = useState<number[]>(() =>
    Array.from({ length: count }, (_, i) => i),
  );
  const [drag, setDrag] = useState<Drag>(REST);
  const start = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const advance = useCallback(() => {
    setOrder((o) => (o.length <= 1 ? o : [...o.slice(1), o[0]]));
    setDrag(REST);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (count <= 1) return;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      start.current = { x: e.clientX, y: e.clientY, moved: false };
      setDrag({ ...REST, dragging: true });
    },
    [count],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.hypot(dx, dy) > 6) start.current.moved = true;
    setDrag((d) => ({ ...d, dx, dy }));
  }, []);

  // Call on pointer up/cancel. `onTap` fires when the gesture was a click, not
  // a drag. A long drag sets `leaving` so the component can animate the card
  // out, then call `advance` from onTransitionEnd.
  const onPointerUp = useCallback((onTap?: () => void) => {
    const s = start.current;
    start.current = null;
    setDrag((d) => {
      if (!s?.moved) {
        onTap?.();
        return REST;
      }
      if (Math.hypot(d.dx, d.dy) > FLING_THRESHOLD) {
        return {
          dx: d.dx * FLING_MULTIPLIER,
          dy: d.dy * FLING_MULTIPLIER,
          dragging: false,
          leaving: true,
        };
      }
      return REST;
    });
  }, []);

  return { order, drag, advance, onPointerDown, onPointerMove, onPointerUp };
}
