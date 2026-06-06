export const PLINTH_NATURAL = { width: 1189, height: 943 } as const;
export const PLINTH_ASPECT = PLINTH_NATURAL.width / PLINTH_NATURAL.height;

export const PLATTER = {
  centerX: 39.95,
  centerY: 48.14,
  diameter: 52.48,
} as const;

export const ARM_MOUNT = {
  centerX: 82.17,
  centerY: 19.09,
} as const;

export const ARM_PIVOT_IN_IMAGE = {
  x: 50.38,
  y: 23.79,
} as const;

export const ARM_LENGTH_PCT = 65;

export const SPEED_KNOB = {
  centerX: 12.11,
  centerY: 84.41,
} as const;

export const ARM_ANGLE = {
  rest: -12,
  outer: 18,
  about: 26,
  music: 26,
  events: 32,
  radio: 38,
  foundations: 44,
  merch: 50,
} as const;

export type GrooveTarget = keyof typeof ARM_ANGLE;
