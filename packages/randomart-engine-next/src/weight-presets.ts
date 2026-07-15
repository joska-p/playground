/**
 * Named weight presets that override per-node-type selection weights.
 *
 * Each preset maps an {@link ExprNodeType} to a multiplier applied on top of
 * the operator's base weight during pool selection.  A value of 2.0 means
 * "twice as likely to be picked", while 0.1 means "rarely chosen".
 *
 * Ported from the original engine's WeightPresets.ts.  Broken rule-ID
 * references from the engine have been fixed to match the new package's
 * naming (S3 decisions): `modulo` → `mod`, `multiply` → `product`,
 * `banded-noise` removed (never existed as a real rule).
 */

import type { ExprNodeType } from './types.js';

export type WeightOverrides = Partial<Record<ExprNodeType, number>>;

export const WEIGHT_PRESETS: Record<string, WeightOverrides> = {
  balanced: {},

  organic: {
    sin: 2.0,
    cos: 1.5,
    sqrt: 1.2,
    abs: 1.5,
    fbm: 1.5,
    mod: 0.1,
    'less-than': 0.1,
    'greater-than': 0.1,
    step: 0.1
  },

  geometric: {
    sin: 0.5,
    cos: 0.5,
    abs: 2.0,
    fract: 2.0,
    mod: 1.5,
    fbm: 0.2,
    sweep: 1.5,
    radial: 1.5,
    'less-than': 1.0,
    'greater-than': 1.0,
    step: 1.0
  },

  chaotic: {
    sin: 2.5,
    cos: 2.0,
    product: 2.0,
    pow: 2.0,
    exp: 2.0,
    random: 1.5,
    fbm: 2.0,
    'recaman-pattern': 1.5,
    if: 1.5,
    smoothstep: 0.2
  }
} as const;

export type PresetName = keyof typeof WEIGHT_PRESETS;

/**
 * Return the weight overrides for a named preset, or an empty object if the
 * name is unknown.
 */
export function getPresetWeights(name: string): WeightOverrides {
  return WEIGHT_PRESETS[name] ?? {};
}
