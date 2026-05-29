"use client";

import { useCallback, useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ARM_ANGLE, type GrooveTarget } from "@/lib/deck-geometry";

const PEEK_FRACTION = 0.25;
const PEEK_DURATION = 0.45;
const SWING_DURATION = 0.85;
const SETTLE_DURATION = 0.55;

export function useTonearm(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { rotation: ARM_ANGLE.rest });
  }, [ref]);

  const swingTo = useCallback(
    (target: GrooveTarget) => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        rotation: ARM_ANGLE[target],
        duration: SWING_DURATION,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    },
    [ref],
  );

  const peekFrom = useCallback(
    (base: GrooveTarget | null, target: GrooveTarget) => {
      if (!ref.current) return;
      const baseAngle = base ? ARM_ANGLE[base] : ARM_ANGLE.rest;
      const peek = baseAngle + (ARM_ANGLE[target] - baseAngle) * PEEK_FRACTION;
      gsap.to(ref.current, {
        rotation: peek,
        duration: PEEK_DURATION,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [ref],
  );

  const settleAt = useCallback(
    (target: GrooveTarget | null) => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        rotation: target ? ARM_ANGLE[target] : ARM_ANGLE.rest,
        duration: SETTLE_DURATION,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [ref],
  );

  return { swingTo, peekFrom, settleAt };
}
