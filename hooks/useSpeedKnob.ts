"use client";

import { useState, useCallback } from "react";

export type Rpm = 33 | 45;

export function useSpeedKnob(initial: Rpm = 33) {
  const [rpm, setRpm] = useState<Rpm>(initial);
  const toggle = useCallback(() => {
    setRpm((current) => (current === 33 ? 45 : 33));
  }, []);
  return { rpm, toggle, setRpm };
}
