export type AnimationBehavior = {
  id: string;
  name: string;
  // GLSL function definition
  glslFunction: string;
  // How to apply it in the shader
  // "spatial" applies to UV before evaluation
  // "color" applies to final color
  type: 'spatial' | 'color';
  // Code to insert in main()
  applyCode: (timeVar: string, speedVar: string) => string;
};

export const hueShiftBehavior: AnimationBehavior = {
  id: 'hue-shift',
  name: 'Hue Shift',
  glslFunction: `
vec3 hueRotate(vec3 color, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec3(
    (0.299 + 0.701*c + 0.168*s) * color.r + (0.587 - 0.587*c + 0.330*s) * color.g + (0.114 - 0.114*c - 0.331*s) * color.b,
    (0.299 - 0.299*c - 0.328*s) * color.r + (0.587 + 0.413*c + 0.035*s) * color.g + (0.114 - 0.114*c + 0.292*s) * color.b,
    (0.299 - 0.299*c + 1.250*s) * color.r + (0.587 - 0.587*c - 1.050*s) * color.g + (0.114 + 0.886*c - 0.203*s) * color.b
  );
}
`,
  type: 'color',
  applyCode: (timeVar, speedVar) =>
    `color = hueRotate(color, ${timeVar} * ${speedVar});`
};

export const zoomBehavior: AnimationBehavior = {
  id: 'zoom',
  name: 'Zoom',
  glslFunction: ``, // No extra function needed, just math
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    `uv *= (1.0 + 0.5 * sin(${timeVar} * ${speedVar}));`
};

export const rippleBehavior: AnimationBehavior = {
  id: 'ripple',
  name: 'Ripple',
  glslFunction: ``,
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    `uv += 0.1 * sin(uv * 5.0 + ${timeVar} * ${speedVar});`
};

export const rotateBehavior: AnimationBehavior = {
  id: 'rotate',
  name: 'Rotate',
  glslFunction: `
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}
`,
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    `uv = rotate2d(${timeVar} * ${speedVar} * 0.5) * uv;`
};

export const swirlBehavior: AnimationBehavior = {
  id: 'swirl',
  name: 'Swirl',
  glslFunction: `
vec2 swirl(vec2 uv, float angle) {
    float r = length(uv);
    float a = atan(uv.y, uv.x) + angle * (1.0 - r);
    return vec2(cos(a) * r, sin(a) * r);
}
`,
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    `uv = swirl(uv, sin(${timeVar} * ${speedVar}) * 2.0);`
};

export const driftBehavior: AnimationBehavior = {
  id: 'drift',
  name: 'Drift',
  glslFunction: ``,
  type: 'spatial',
  applyCode: (timeVar, speedVar) => `uv += ${timeVar} * ${speedVar} * 0.1;`
};

export const expandBehavior: AnimationBehavior = {
  id: 'expand',
  name: 'Expand',
  glslFunction: ``,
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    `uv /= (1.0 + ${timeVar} * ${speedVar} * 0.1);`
};

// ---------------------------------------------------------------------------
// New behaviors
// ---------------------------------------------------------------------------

export const kaleidoscopeBehavior: AnimationBehavior = {
  id: 'kaleidoscope',
  name: 'Kaleidoscope',
  glslFunction: `
vec2 kaleidoscope(vec2 uv, float t, float speed) {
  // Slowly rotate the input so the fold angle changes over time
  float rot = t * speed * 0.1;
  float c = cos(rot);
  float s = sin(rot);
  uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

  float r = length(uv);
  float a = atan(uv.y, uv.x);

  // Fold into one 1/6 slice and mirror
  float slice = 3.14159265 / 6.0;
  a = mod(a + slice, 2.0 * slice) - slice;
  a = abs(a);

  return r * vec2(cos(a), sin(a));
}
`,
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    `uv = kaleidoscope(uv, ${timeVar}, ${speedVar});`
};

export const domainWarpBehavior: AnimationBehavior = {
  id: 'domain-warp',
  name: 'Domain Warp',
  glslFunction: `
vec2 domainWarp(vec2 uv, float t, float speed) {
  // Two layers of sin/cos at different frequencies and phases
  // so different regions of the image warp independently
  vec2 q = vec2(
    sin(uv.y * 1.7 + t * speed * 0.6) * 0.5 + sin(uv.x * 2.3 + 1.2) * 0.3,
    cos(uv.x * 1.3 + t * speed * 0.4) * 0.5 + cos(uv.y * 1.9 + 0.7) * 0.3
  );
  return uv + q * 0.4;
}
`,
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    `uv = domainWarp(uv, ${timeVar}, ${speedVar});`
};

export const mirrorTileBehavior: AnimationBehavior = {
  id: 'mirror-tile',
  name: 'Mirror Tile',
  // Triangle wave: mod(x, 2) - 1 gives a sawtooth, abs() folds it into a mirror
  glslFunction: ``,
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    `uv = abs(mod(uv * 1.4 + ${timeVar} * ${speedVar} * 0.08, 2.0) - 1.0);`
};

export const tunnelBehavior: AnimationBehavior = {
  id: 'tunnel',
  name: 'Tunnel',
  glslFunction: `
vec2 tunnel(vec2 uv, float t, float speed) {
  float r = length(uv) + 0.0001; // avoid log(0)
  float a = atan(uv.y, uv.x);
  // log(r) turns radial zoom into translation — animating by t creates
  // an infinite forward-zoom through the centre of the pattern
  float depth = fract(log(r) * 0.5 - t * speed * 0.2);
  return vec2(a / 3.14159265, depth * 2.0 - 1.0);
}
`,
  type: 'spatial',
  applyCode: (timeVar, speedVar) => `uv = tunnel(uv, ${timeVar}, ${speedVar});`
};

export const contrastPulseBehavior: AnimationBehavior = {
  id: 'contrast-pulse',
  name: 'Contrast Pulse',
  glslFunction: `
vec3 contrastPulse(vec3 color, float t, float speed) {
  // Oscillates between flat (k≈0.5) and punchy (k≈2.5)
  float k = 1.5 + 1.0 * sin(t * speed * 0.5);
  return clamp((color - 0.5) * k + 0.5, 0.0, 1.0);
}
`,
  type: 'color',
  applyCode: (timeVar, speedVar) =>
    `color = contrastPulse(color, ${timeVar}, ${speedVar});`
};

// ---------------------------------------------------------------------------
// Non-cyclic behaviors
// ---------------------------------------------------------------------------
// Two strategies are used here:
//
// 1. GOLDEN RATIO frequencies — sin/cos at ω and ω*φ (φ ≈ 1.618).
//    Because φ is irrational, the Lissajous path never exactly closes.
//    Theoretically infinite period; visually indistinguishable from aperiodic.
//
// 2. SMOOTH VALUE NOISE — hash two adjacent integer time-steps and smoothstep
//    between them (see smoothNoise / smoothNoise2 in the GLSL preamble).
//    Gives a genuinely unpredictable-looking wander with no visible period.
// ---------------------------------------------------------------------------

// Spatial — UV drifts along a Lissajous path that never closes.
// At φ:1 frequency ratio the trajectory is quasi-periodic with infinite period.
export const goldenWanderBehavior: AnimationBehavior = {
  id: 'golden-wander',
  name: 'Golden Wander',
  glslFunction: ``,
  type: 'spatial',
  applyCode: (timeVar, speedVar) => {
    const phi = '1.6180339887';
    return [
      `float gw_t = ${timeVar} * ${speedVar} * 0.3;`,
      `uv += vec2(sin(gw_t), cos(gw_t * ${phi})) * 0.4;`
    ].join('\n  ');
  }
};

// Spatial — UV crawls through space driven by smooth noise.
// Each axis uses an independent noise channel so the path is 2D and irregular.
export const noiseCrawlBehavior: AnimationBehavior = {
  id: 'noise-crawl',
  name: 'Noise Crawl',
  glslFunction: ``, // uses smoothNoise2 from preamble
  type: 'spatial',
  applyCode: (timeVar, speedVar) =>
    [
      `vec2 nc_offset = smoothNoise2(${timeVar} * ${speedVar} * 0.15) * 2.0 - 1.0;`,
      `uv += nc_offset * 0.6;`
    ].join('\n  ')
};

// Color — RGB channels drift independently through smooth noise.
// Produces a slow, unpredictable color tint that never settles into a cycle.
export const colorDriftBehavior: AnimationBehavior = {
  id: 'color-drift',
  name: 'Color Drift',
  glslFunction: ``, // uses smoothNoise from preamble
  type: 'color',
  applyCode: (timeVar, speedVar) =>
    [
      `float cd_t = ${timeVar} * ${speedVar} * 0.1;`,
      // Three channels sampled at offsets far enough apart to be uncorrelated
      `vec3 cd_tint = vec3(smoothNoise(cd_t), smoothNoise(cd_t + 17.3), smoothNoise(cd_t + 53.9));`,
      // Mix toward the tint subtly — full replacement would wash out the art
      `color = mix(color, color * (0.6 + 0.8 * cd_tint), 0.4);`
    ].join('\n  ')
};

export const animationRegistry: AnimationBehavior[] = [
  hueShiftBehavior,
  zoomBehavior,
  rippleBehavior,
  rotateBehavior,
  swirlBehavior,
  driftBehavior,
  expandBehavior,
  kaleidoscopeBehavior,
  domainWarpBehavior,
  mirrorTileBehavior,
  tunnelBehavior,
  contrastPulseBehavior,
  goldenWanderBehavior,
  noiseCrawlBehavior,
  colorDriftBehavior
];
