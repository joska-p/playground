import type { PalettePreset } from '../types';

const PALETTE_REGISTRY: PalettePreset[] = [
  {
    name: 'iridescent_opal',
    weight: 1.5,
    a: 'vec3(0.5, 0.5, 0.5)',
    b: 'vec3(0.5, 0.5, 0.5)',
    c: 'vec3(1.0, 1.0, 1.0)',
    d: 'vec3(0.0, 0.33, 0.67)'
  },
  {
    name: 'neon_cyber',
    weight: 1.0,
    a: 'vec3(0.5, 0.5, 0.5)',
    b: 'vec3(0.5, 0.5, 0.5)',
    c: 'vec3(2.0, 1.0, 2.0)',
    d: 'vec3(0.0, 0.33, 0.67)'
  },
  {
    name: 'biomorphic_flesh',
    weight: 1.2,
    a: 'vec3(0.5, 0.5, 0.5)',
    b: 'vec3(0.5, 0.5, 0.5)',
    c: 'vec3(1.0, 0.5, 1.0)',
    d: 'vec3(0.5, 0.0, 0.0)'
  },
  {
    name: 'volcanic_magma',
    weight: 1.0,
    a: 'vec3(0.5, 0.5, 0.5)',
    b: 'vec3(0.5, 0.5, 0.5)',
    c: 'vec3(2.0, 1.0, 0.0)',
    d: 'vec3(0.5, 0.20, 0.25)'
  },
  {
    name: 'deep_ocean',
    weight: 1.3,
    a: 'vec3(0.5, 0.5, 0.5)',
    b: 'vec3(0.5, 0.5, 0.5)',
    c: 'vec3(1.0, 0.7, 0.4)',
    d: 'vec3(0.0, 0.15, 0.20)'
  }
];

export { PALETTE_REGISTRY };
