import type { getInitialWeights } from '@repo/randomart-engine/grammar/registry';

export type Preset = Partial<ReturnType<typeof getInitialWeights>>;

export const organic = {
  sin: 2.0,
  cos: 1.5,
  sqrt: 1.2,
  abs: 1.5,
  fbm: 1.5,
  modulo: 0.1,
  'less-than': 0.1,
  'greater-than': 0.1,
  step: 0.1
} as const satisfies Preset;

export const geometric = {
  sin: 0.5,
  cos: 0.5,
  abs: 2.0,
  fract: 2.0,
  modulo: 1.5,
  fbm: 0.2,
  sweep: 1.5,
  radial: 1.5,
  'less-than': 1.0,
  'greater-than': 1.0,
  step: 1.0
} as const satisfies Preset;

export const chaotic = {
  sin: 2.5,
  cos: 2.0,
  multiply: 2.0,
  pow: 2.0,
  exp: 2.0,
  random: 1.5,
  fbm: 2.0,
  'recaman-pattern': 1.5,
  if: 1.5,
  smoothstep: 0.2
} as const satisfies Preset;

export const WEIGHT_PRESETS = {
  organic,
  geometric,
  chaotic
} as const;

export type PresetName = keyof typeof WEIGHT_PRESETS;
