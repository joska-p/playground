type PalettePreset = {
  name: string;
  weight?: number;
  a: string;
  b: string;
  c: string;
  d: string;
};

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
    a: 'vec3(0.8, 0.5, 0.4)',
    b: 'vec3(0.2, 0.4, 0.2)',
    c: 'vec3(2.0, 1.0, 1.0)',
    d: 'vec3(0.0, 0.25, 0.25)'
  },
  {
    name: 'biomorphic_flesh',
    weight: 1.2,
    a: 'vec3(0.65, 0.5, 0.5)',
    b: 'vec3(0.35, 0.2, 0.2)',
    c: 'vec3(1.0, 1.0, 1.0)',
    d: 'vec3(0.0, 0.1, 0.2)'
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
    c: 'vec3(1.0, 1.0, 0.5)',
    d: 'vec3(0.8, 0.9, 0.3)'
  }
];

export { PALETTE_REGISTRY };
