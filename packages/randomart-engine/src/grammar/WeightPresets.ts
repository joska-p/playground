export const WEIGHT_PRESETS = {
  balanced: {},
  organic: {
    sin: 2.0,
    cos: 1.5,
    sqrt: 1.2,
    abs: 1.5,
    fbm: 1.5,
    voronoi: 0.3,
    'banded-noise': 0.2,
    modulo: 0.1,
    'less-than': 0.1,
    'greater-than': 0.1,
    step: 0.1
  },
  geometric: {
    sin: 0.5,
    cos: 0.5,
    abs: 2.0,
    fract: 2.0,
    modulo: 1.5,
    fbm: 0.2,
    voronoi: 1.5,
    sweep: 1.5,
    radial: 1.5,
    'less-than': 1.0,
    'greater-than': 1.0,
    step: 1.0
  },
  chaotic: {
    sin: 2.5,
    cos: 2.0,
    multiply: 2.0,
    pow: 2.0,
    exp: 2.0,
    random: 1.5,
    fbm: 2.0,
    voronoi: 1.5,
    'recaman-pattern': 1.5,
    if: 1.5,
    smoothstep: 0.2
  }
} as const;

export type PresetName = keyof typeof WEIGHT_PRESETS;
