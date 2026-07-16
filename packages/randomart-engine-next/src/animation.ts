/**
 * Fancy animation behaviors — curated registry.
 *
 * This is a trimmed + extended version of the original behaviors.ts:
 *   - Kept every behavior that produces a visually distinct, worthwhile effect.
 *   - Dropped: zoom, ripple, drift, expand, goldenWander, recamanPulse, inversion
 *     (either redundant with a stronger behavior, too subtle to read as animation,
 *     or — in the case of drift/expand — driven by unbounded time instead of a
 *     periodic function, so they never loop and just scroll/zoom forever).
 *   - Fixed chromaticAberration: it was shifting red by ca_dir.x and blue by
 *     ca_dir.y (different axes), so the split wasn't actually aligned.
 *   - Added 11 new behaviors aiming for more dramatic, "fancy" looks:
 *     spiralGalaxy, gravityLens, waveInterference, crystalFacet, glitchBlocks,
 *     liquidMetal (spatial); paletteCycle, neonGlowPulse, rgbGlitchSplit,
 *     auroraFlow, thermalVision (color).
 *
 * Assumes the same noise helpers as the original file are available in your
 * pipeline: smoothNoise(float)->float, smoothNoise2(float)->vec2, random2d(vec2)->float.
 * New behaviors that need noise reuse these via noiseDependencies, same convention
 * as the original noiseCrawl / colorDrift / edgeDetect / filmGrain.
 */

import type { AnimationBehavior } from './types.js';

// ---------------------------------------------------------------------------
// Spatial behaviors — kept from original
// ---------------------------------------------------------------------------

const rotateBehavior = {
  id: 'rotate',
  name: 'Rotate',
  glslFunction: `\
mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
  sin(_angle),cos(_angle));
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = rotate2d(${time} * ${speed} * 0.5) * ${spatial};`
} as const satisfies AnimationBehavior;

const swirlBehavior = {
  id: 'swirl',
  name: 'Swirl',
  glslFunction: `\
vec2 swirl(vec2 coords, float angle) {
  float r = length(coords);
  float a = atan(coords.y, coords.x) + angle * (1.0 - r);
  return vec2(cos(a) * r, sin(a) * r);
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = swirl(${spatial}, sin(${time} * ${speed}) * 2.0);`
} as const satisfies AnimationBehavior;

const kaleidoscopeBehavior = {
  id: 'kaleidoscope',
  name: 'Kaleidoscope',
  glslFunction: `\
vec2 kaleidoscope(vec2 coords, float t, float speed) {
  float rot = t * speed * 0.1;
  float c = cos(rot);
  float s = sin(rot);
  coords = vec2(c * coords.x - s * coords.y, s * coords.x + c * coords.y);

  float r = length(coords);
  float a = atan(coords.y, coords.x);

  float slice = 3.14159265 / 6.0;
  a = mod(a + slice, 2.0 * slice) - slice;
  a = abs(a);

  return r * vec2(cos(a), sin(a));
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = kaleidoscope(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const domainWarpBehavior = {
  id: 'domain-warp',
  name: 'Warp',
  glslFunction: `\
vec2 domainWarp(vec2 coords, float t, float speed) {
  vec2 q = vec2(
    sin(coords.y * 1.7 + t * speed * 0.6) * 0.5 + sin(coords.x * 2.3 + 1.2) * 0.3,
    cos(coords.x * 1.3 + t * speed * 0.4) * 0.5 + cos(coords.y * 1.9 + 0.7) * 0.3
  );
  return coords + q * 0.4;
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) => `${spatial} = domainWarp(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const mirrorTileBehavior = {
  id: 'mirror-tile',
  name: 'Mirror',
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = abs(mod(${spatial} * 1.4 + ${time} * ${speed} * 0.08, 2.0) - 1.0);`
} as const satisfies AnimationBehavior;

const tunnelBehavior = {
  id: 'tunnel',
  name: 'Tunnel',
  glslFunction: `\
vec2 tunnel(vec2 coords, float t, float speed) {
  float r = length(coords) + 0.0001;
  float a = atan(coords.y, coords.x);
  float depth = fract(log(r) * 0.5 - t * speed * 0.2);
  return vec2(a / 3.14159265, depth * 2.0 - 1.0);
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) => `${spatial} = tunnel(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const noiseCrawlBehavior = {
  id: 'noise-crawl',
  name: 'Crawl',
  type: 'spatial',
  noiseDependencies: ['smoothNoise2'],
  applyCode: ({ time, speed, spatial }) =>
    [
      `vec2 nc_offset = smoothNoise2(${time} * ${speed} * 0.15) * 2.0 - 1.0;`,
      `${spatial} += nc_offset * 0.6;`
    ].join('\n  ')
} as const satisfies AnimationBehavior;

const mouseProximityBehavior = {
  id: 'mouse-proximity',
  name: 'Mouse Field',
  type: 'spatial',
  applyCode: ({ spatial }) => {
    return [
      `vec2 fragPx = vec2(v_texCoord.x * u_resolution.x, (1.0 - v_texCoord.y) * u_resolution.y);`,
      `float distToMouse = length(fragPx - u_mouse);`,
      `float force = 1.0 - smoothstep(0.0, 300.0, distToMouse);`,
      `${spatial} += normalize(fragPx - u_mouse) * force * 0.25;`
    ].join('\n  ');
  }
} as const satisfies AnimationBehavior;

const pixelationBehavior = {
  id: 'pixelation',
  name: 'Pixelation',
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) => {
    return [
      `float pix_res = 20.0 + 80.0 * (0.5 + 0.5 * sin(${time} * ${speed} * 0.3));`,
      `${spatial} = floor(${spatial} * pix_res + 0.5) / pix_res;`
    ].join('\n  ');
  }
} as const satisfies AnimationBehavior;

const voronoiBehavior = {
  id: 'voronoi',
  name: 'Voronoi',
  glslFunction: `\
vec2 voronoiHash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

vec2 voronoiWarp(vec2 x, float t, float speed) {
  vec2 n = floor(x);
  vec2 f = fract(x);
  float md = 8.0;
  vec2 mr = x;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = voronoiHash(n + g);
      o = 0.5 + 0.5 * sin(t * speed + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < md) {
        md = d;
        mr = r;
      }
    }
  }
  return x + mr * (0.5 + 0.5 * sin(md * 3.14159));
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = voronoiWarp(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

// ---------------------------------------------------------------------------
// Spatial behaviors — new
// ---------------------------------------------------------------------------

const spiralGalaxyBehavior = {
  id: 'spiral-galaxy',
  name: 'Galaxy',
  glslFunction: `\
vec2 spiralGalaxy(vec2 coords, float t, float speed) {
  float r = length(coords);
  float a = atan(coords.y, coords.x);
  float spiralAmount = 3.0 * log(r + 0.001) + t * speed * 0.3;
  a += spiralAmount * 0.5;
  return vec2(cos(a), sin(a)) * r;
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = spiralGalaxy(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const gravityLensBehavior = {
  id: 'gravity-lens',
  name: 'Gravity Lens',
  glslFunction: `\
vec2 gravityLens(vec2 coords, float t, float speed) {
  vec2 center = 0.6 * vec2(cos(t * speed * 0.3), sin(t * speed * 0.37));
  vec2 delta = coords - center;
  float d = length(delta) + 0.05;
  float bend = 0.15 / (d * d);
  return coords - normalize(delta) * bend;
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = gravityLens(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const waveInterferenceBehavior = {
  id: 'wave-interference',
  name: 'Interference',
  glslFunction: `\
vec2 waveInterference(vec2 coords, float t, float speed) {
  vec2 p1 = vec2(0.5, 0.3);
  vec2 p2 = vec2(-0.4, -0.5);
  vec2 p3 = vec2(-0.3, 0.6);
  float d1 = length(coords - p1);
  float d2 = length(coords - p2);
  float d3 = length(coords - p3);
  float wave = sin(d1 * 10.0 - t * speed)
             + sin(d2 * 10.0 - t * speed * 1.3)
             + sin(d3 * 10.0 - t * speed * 0.8);
  vec2 dir = normalize(coords + 0.0001);
  return coords + dir * wave * 0.03;
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = waveInterference(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const crystalFacetBehavior = {
  id: 'crystal-facet',
  name: 'Crystal',
  glslFunction: `\
vec2 crystalHash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453123);
}

vec2 crystalFacet(vec2 x, float t, float speed) {
  vec2 scaled = x * 3.0;
  vec2 n = floor(scaled);
  vec2 f = fract(scaled);
  float minDist = 8.0;
  vec2 cellOffset = vec2(0.0);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 h = crystalHash(n + g);
      vec2 cellCenter = g + h;
      float d = length(cellCenter - f);
      if (d < minDist) {
        minDist = d;
        cellOffset = h;
      }
    }
  }
  float facetAngle = t * speed * 0.2 + cellOffset.x * 6.2831;
  mat2 rot = mat2(cos(facetAngle), -sin(facetAngle), sin(facetAngle), cos(facetAngle));
  return rot * x;
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = crystalFacet(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const glitchBlocksBehavior = {
  id: 'glitch-blocks',
  name: 'Glitch',
  glslFunction: `\
vec2 glitchBlocks(vec2 coords, float t, float speed) {
  float band = floor(coords.y * 12.0);
  float step_t = floor(t * speed * 4.0);
  float trigger = step(0.85, fract(sin(band * 12.9898 + step_t) * 43758.5453));
  float seed = fract(sin(band * 78.233 + step_t) * 43758.5453);
  float shift = (seed - 0.5) * 0.25 * trigger;
  coords.x += shift;
  return coords;
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = glitchBlocks(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const liquidMetalBehavior = {
  id: 'liquid-metal',
  name: 'Liquid Metal',
  type: 'spatial',
  noiseDependencies: ['smoothNoise2'],
  applyCode: ({ time, speed, spatial }) =>
    [
      `vec2 lm_a = smoothNoise2(${spatial}.x * 2.0 + ${time} * ${speed} * 0.2);`,
      `vec2 lm_b = smoothNoise2(${spatial}.y * 2.0 + ${time} * ${speed} * 0.2 + 7.0);`,
      `${spatial} += (lm_a + lm_b - 1.0) * 0.25;`
    ].join('\n  ')
} as const satisfies AnimationBehavior;

// ---------------------------------------------------------------------------
// Color behaviors — kept from original (chromaticAberration fixed)
// ---------------------------------------------------------------------------

const hueShiftBehavior = {
  id: 'hue-shift',
  name: 'Hue Shift',
  glslFunction: `\
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
  applyCode: ({ time, speed, color }) => `${color} = hueRotate(${color}, ${time} * ${speed});`
} as const satisfies AnimationBehavior;

const colorDriftBehavior = {
  id: 'color-drift',
  name: 'Color Drift',
  type: 'color',
  noiseDependencies: ['smoothNoise'],
  applyCode: ({ time, speed, color }) =>
    [
      `float cd_t = ${time} * ${speed} * 0.1;`,
      `vec3 cd_tint = vec3(smoothNoise(cd_t), smoothNoise(cd_t + 17.3), smoothNoise(cd_t + 53.9));`,
      `${color} = mix(${color}, ${color} * (0.6 + 0.8 * cd_tint), 0.4);`
    ].join('\n  ')
} as const satisfies AnimationBehavior;

const edgeDetectBehavior = {
  id: 'edge-detect',
  name: 'Contour',
  type: 'color',
  noiseDependencies: ['smoothNoise'],
  glslFunction: `\
vec3 applyLaplacianEdges(vec3 baseColor, vec2 uv, float time) {
    float centerLuminance = dot(baseColor, vec3(0.299, 0.587, 0.114));

    float dX = dFdx(centerLuminance);
    float dY = dFdy(centerLuminance);
    float edge = length(vec2(dX, dY));

    float intensityModifier = 1.0 + smoothNoise(time * 0.3) * 1.0;
    edge *= intensityModifier;

    vec3 edgeColor = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0.0, 2.0, 4.0));
    edgeColor *= 1.5;

    return mix(baseColor, edgeColor, smoothstep(0.04, 0.2, edge));
}
`,
  applyCode: ({ time, speed, color }) =>
    `${color} = applyLaplacianEdges(${color}, v_texCoord, ${time} * ${speed});`
} as const satisfies AnimationBehavior;

const chromaticAberrationBehavior = {
  id: 'chromatic-aberration',
  name: 'Aberration',
  type: 'color',
  applyCode: ({ time, speed, spatial, color }) => {
    // Fixed: red and blue are now shifted along the same axis (ca_dir.x)
    // in opposite directions, instead of mixing x for red and y for blue.
    return [
      `float ca_offset = 0.003 * sin(${time} * ${speed} * 0.7);`,
      `vec2 ca_dir = normalize(${spatial}) * ca_offset;`,
      `${color}.r = ${color}.r + ca_dir.x;`,
      `${color}.b = ${color}.b - ca_dir.x;`
    ].join('\n  ');
  }
} as const satisfies AnimationBehavior;

const vignetteBehavior = {
  id: 'vignette',
  name: 'Vignette',
  type: 'color',
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float vig_t = ${time} * ${speed};`,
      `float vig_radius = 0.8 + 0.2 * sin(vig_t * 0.2);`,
      `float vig = 1.0 - smoothstep(vig_radius * 0.5, vig_radius, length(${spatial}));`,
      `${color} *= vig;`
    ].join('\n  ');
  }
} as const satisfies AnimationBehavior;

const filmGrainBehavior = {
  id: 'film-grain',
  name: 'Grain',
  type: 'color',
  noiseDependencies: ['random2d'],
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float grain_seed = fract(${time} * ${speed});`,
      `float grain = random2d(${spatial} * 100.0 + grain_seed) * 0.15;`,
      `${color} += grain - 0.075;`
    ].join('\n  ');
  }
} as const satisfies AnimationBehavior;

const scanLinesBehavior = {
  id: 'scan-lines',
  name: 'Scan',
  type: 'color',
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float scan_freq = 80.0 + 40.0 * sin(${time} * ${speed} * 0.1);`,
      `float scan = 0.9 + 0.1 * sin(${spatial}.y * scan_freq);`,
      `${color} *= scan;`
    ].join('\n  ');
  }
} as const satisfies AnimationBehavior;

// ---------------------------------------------------------------------------
// Color behaviors — new
// ---------------------------------------------------------------------------

const paletteCycleBehavior = {
  id: 'palette-cycle',
  name: 'Palette Cycle',
  glslFunction: `\
vec3 iqPalette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.0, 0.33, 0.67);
  return a + b * cos(6.28318 * (c * t + d));
}

vec3 paletteCycleColor(vec3 baseColor, float t) {
  float lum = dot(baseColor, vec3(0.299, 0.587, 0.114));
  return iqPalette(lum + t * 0.15);
}
`,
  type: 'color',
  applyCode: ({ time, speed, color }) =>
    `${color} = mix(${color}, paletteCycleColor(${color}, ${time} * ${speed}), 0.85);`
} as const satisfies AnimationBehavior;

const neonGlowPulseBehavior = {
  id: 'neon-glow-pulse',
  name: 'Neon Glow',
  glslFunction: `\
vec3 neonGlow(vec3 color, float t, float speed) {
  float lum = dot(color, vec3(0.299, 0.587, 0.114));
  float pulse = 0.5 + 0.5 * sin(t * speed * 0.6);
  float glow = smoothstep(0.5, 0.9, lum) * pulse;
  return color + glow * vec3(0.3, 0.8, 1.0);
}
`,
  type: 'color',
  applyCode: ({ time, speed, color }) => `${color} = neonGlow(${color}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const rgbGlitchSplitBehavior = {
  id: 'rgb-glitch-split',
  name: 'RGB Split',
  glslFunction: `\
vec3 rgbGlitchSplit(vec3 color, vec2 coords, float t, float speed) {
  float band = floor(coords.y * 20.0);
  float step_t = floor(t * speed * 3.0);
  float trigger = step(0.9, fract(sin(band * 91.345 + step_t) * 43758.5453));
  float rShift = trigger * (fract(sin(band * 12.9898 + step_t) * 43758.5453) - 0.5) * 0.4;
  color.r += rShift;
  color.b -= rShift;
  return color;
}
`,
  type: 'color',
  applyCode: ({ time, speed, spatial, color }) =>
    `${color} = rgbGlitchSplit(${color}, ${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const auroraFlowBehavior = {
  id: 'aurora-flow',
  name: 'Aurora',
  glslFunction: `\
vec3 auroraFlow(vec3 color, vec2 coords, float t, float speed) {
  float wave1 = sin(coords.x * 3.0 + t * speed * 0.4);
  float wave2 = sin(coords.y * 2.0 - t * speed * 0.3 + wave1);
  vec3 aurora = vec3(
    0.2 + 0.3 * sin(wave2),
    0.5 + 0.4 * cos(wave1 * 1.3),
    0.6 + 0.3 * sin(wave1 + wave2)
  );
  return mix(color, color + aurora * 0.3, 0.5);
}
`,
  type: 'color',
  applyCode: ({ time, speed, spatial, color }) =>
    `${color} = auroraFlow(${color}, ${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const thermalVisionBehavior = {
  id: 'thermal-vision',
  name: 'Thermal',
  glslFunction: `\
vec3 thermalPalette(float t) {
  vec3 c1 = vec3(0.0, 0.0, 0.2);
  vec3 c2 = vec3(0.8, 0.0, 0.6);
  vec3 c3 = vec3(1.0, 0.6, 0.0);
  vec3 c4 = vec3(1.0, 1.0, 0.8);
  if (t < 0.33) return mix(c1, c2, t / 0.33);
  else if (t < 0.66) return mix(c2, c3, (t - 0.33) / 0.33);
  else return mix(c3, c4, (t - 0.66) / 0.34);
}

vec3 thermalVision(vec3 color, float t, float speed) {
  float lum = dot(color, vec3(0.299, 0.587, 0.114));
  float shift = fract(lum + t * speed * 0.05);
  return mix(color, thermalPalette(shift), 0.7);
}
`,
  type: 'color',
  applyCode: ({ time, speed, color }) => `${color} = thermalVision(${color}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const cosmicMaelstromBehavior = {
  id: 'cosmic-maelstrom',
  name: 'Cosmic Maelstrom',
  glslFunction: `
vec2 cosmicMaelstrom(vec2 coords, float t, float speed) {
  float r = length(coords);
  float theta = atan(coords.y, coords.x);

  // Prevent log(0) artifacts using max limit
  float logR = log(max(r, 0.04));

  // Multi-frequency wave resonance to twist space non-linearly
  float twist = 4.0 * logR + sin(r * 8.0 - t * speed) * 0.5;
  theta += twist * 0.4;

  // Radial pulse contraction
  float pulse = 1.0 + 0.15 * sin(t * speed * 0.8 - r * 3.0);
  return vec2(cos(theta), sin(theta)) * (r * pulse);
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = cosmicMaelstrom(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const quantumTessellationBehavior = {
  id: 'quantum-tessellation',
  name: 'Quantum Grid',
  glslFunction: `
vec2 quantumGridHash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453123);
}

vec2 quantumTessellation(vec2 p, float t, float speed) {
  vec2 scaled = p * 4.0;
  vec2 ip = floor(scaled);
  vec2 fp = fract(scaled);

  float minDist = 4.0;
  vec2 targetOffset = vec2(0.0);

  // Unrolled-style voronoi lattice with temporal pulsation
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = quantumGridHash(ip + g);
      o = 0.5 + 0.5 * sin(t * speed * 0.5 + o * 6.2831);
      vec2 r = g + o - fp;
      float d = dot(r, r);
      if (d < minDist) {
        minDist = d;
        targetOffset = o;
      }
    }
  }
  // Sub-facet rotational shear
  float angle = t * speed * 0.15 + (targetOffset.x - targetOffset.y) * 2.0;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  return mix(p, rot * p, smoothstep(0.1, 0.9, minDist));
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = quantumTessellation(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const gravityWellBehavior = {
  id: 'gravity-well',
  name: 'Singularity Lens',
  glslFunction: `
vec2 gravityWell(vec2 coords, float t, float speed) {
  // Dual-singularity orbiting attractor nodes
  vec2 p1 = 0.5 * vec2(cos(t * speed * 0.4), sin(t * speed * 0.4));
  vec2 p2 = 0.5 * vec2(cos(t * speed * 0.3 + 3.1415), sin(t * speed * 0.5));

  float d1 = length(coords - p1);
  float d2 = length(coords - p2);

  // Guarded inverse-distance pull maps
  vec2 pull1 = (p1 - coords) * (0.08 / (d1 * d1 + 0.04));
  vec2 pull2 = (p2 - coords) * (0.08 / (d2 * d2 + 0.04));

  return coords + pull1 + pull2;
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = gravityWell(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

const plasmaFluidBehavior = {
  id: 'plasma-fluid',
  name: 'Fluid Dynamics',
  type: 'spatial',
  noiseDependencies: ['smoothNoise2'],
  applyCode: ({ time, speed, spatial }) =>
    [
      `vec2 pf_uv = ${spatial} * 1.5;`,
      `vec2 pf_n1 = smoothNoise2(pf_uv + vec2(${time} * ${speed} * 0.1, ${time} * ${speed} * 0.05));`,
      `vec2 pf_n2 = smoothNoise2(pf_uv * 2.0 - pf_n1 + vec2(-${time} * ${speed} * 0.08, ${time} * ${speed} * 0.12));`,
      `${spatial} += (pf_n2 - 0.5) * 0.35;`
    ].join('\n  ')
} as const satisfies AnimationBehavior;

const cyberChromaGlitchBehavior = {
  id: 'cyber-chroma-glitch',
  name: 'Matrix Fragmentation',
  glslFunction: `
vec2 cyberGlitch(vec2 coords, float t, float speed) {
  float row = floor(coords.y * 24.0);
  float timeline = floor(t * speed * 6.0);

  // High-frequency hash evaluation for chaotic but precise snapping triggers
  float trigger = step(0.92, fract(sin(row * 41.134 + timeline) * 43758.5453));
  float shift = (fract(sin(row * 92.73 + timeline) * 23412.18) - 0.5) * 0.3 * trigger;

  coords.x += shift;
  return coords;
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = cyberGlitch(${spatial}, ${time}, ${speed});`
} as const satisfies AnimationBehavior;

// ===========================================================================
// Color Behaviors (Complex Chromatic Shifts & Spectral Bleeds)
// ===========================================================================

const spectralShiftBehavior = {
  id: 'spectral-shift',
  name: 'Cosine Palettizer',
  glslFunction: `
vec3 spectralPalette(float t) {
  // Inigo Quilez parametric design: highly intricate psychedelic gradients
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(2.0, 1.0, 0.0);
  vec3 d = vec3(0.5, 0.20, 0.25);
  return a + b * cos(6.28318 * (c * t + d));
}
`,
  type: 'color',
  applyCode: ({ time, speed, color }) =>
    [
      `float sp_lum = dot(${color}, vec3(0.299, 0.587, 0.114));`,
      `${color} = mix(${color}, spectralPalette(sp_lum + ${time} * ${speed} * 0.08), 0.85);`
    ].join('\n  ')
} as const satisfies AnimationBehavior;

const TrueChromaticAberrationBehavior = {
  id: 'true-chromatic-aberration',
  name: 'Spectral Dispersion',
  type: 'color',
  // Requires 'color' variables mapped cleanly to UV spaces to accurately emulate prism splits
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float t_ca = ${time} * ${speed} * 0.8;`,
      `vec2 ca_dir = normalize(${spatial} + vec2(0.0001)) * (0.015 * sin(t_ca));`,
      // Branchless edge clamping to prevent hard texture wrapping artifacts
      `float r_edge = clamp(${color}.r + ca_dir.x, 0.0, 1.0);`,
      `float g_edge = clamp(${color}.g + ca_dir.y, 0.0, 1.0);`,
      `float b_edge = clamp(${color}.b - ca_dir.x, 0.0, 1.0);`,
      `${color} = vec3(r_edge, mix(${color}.g, g_edge, 0.3), b_edge);`
    ].join('\n  ');
  }
} as const satisfies AnimationBehavior;

const iridescentSheenBehavior = {
  id: 'iridescent-sheen',
  name: 'Iridescence',
  glslFunction: `
vec3 applyIridescence(vec3 baseColor, vec2 coords, float t) {
  float factor = sin(coords.x * 2.5 + t) * cos(coords.y * 2.5 - t);
  vec3 sheen = 0.5 + 0.5 * cos(t + coords.xyx * 3.0 + vec3(0.0, 2.0, 4.0));
  return mix(baseColor, baseColor + sheen * 0.4, smoothstep(-0.5, 0.5, factor));
}
`,
  type: 'color',
  applyCode: ({ time, speed, spatial, color }) =>
    `${color} = applyIridescence(${color}, ${spatial}, ${time} * ${speed} * 0.5);`
} as const satisfies AnimationBehavior;

const thermalRadianceBehavior = {
  id: 'thermal-radiance',
  name: 'Thermal Infusion',
  glslFunction: `
vec3 branchlessThermal(float t) {
  // Complete replacement of conditional if-statements to prevent mobile GPU pipeline stalls
  vec3 c1 = vec3(0.0, 0.0, 0.15);
  vec3 c2 = vec3(0.7, 0.0, 0.55);
  vec3 c3 = vec3(1.0, 0.5, 0.0);
  vec3 c4 = vec3(0.98, 0.98, 0.8);

  float ramp1 = smoothstep(0.0, 0.33, t);
  float ramp2 = smoothstep(0.33, 0.66, t);
  float ramp3 = smoothstep(0.66, 1.0, t);

  vec3 col = mix(c1, c2, ramp1);
  col = mix(col, c3, ramp2);
  col = mix(col, c4, ramp3);
  return col;
}
`,
  type: 'color',
  applyCode: ({ time, speed, color }) =>
    [
      `float th_lum = dot(${color}, vec3(0.299, 0.587, 0.114));`,
      `float th_cycle = fract(th_lum + ${time} * ${speed} * 0.04);`,
      `${color} = mix(${color}, branchlessThermal(th_cycle), 0.75);`
    ].join('\n  ')
} as const satisfies AnimationBehavior;

const neonReactivePulseBehavior = {
  id: 'neon-reactive',
  name: 'Neon Reactive',
  type: 'color',
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float nr_lum = dot(${color}, vec3(0.299, 0.587, 0.114));`,
      `float nr_pulse = 0.5 + 0.5 * sin(${time} * ${speed} * 1.2 - length(${spatial}) * 2.0);`,
      `vec3 nr_glow = vec3(0.1, 0.85, 1.0) * smoothstep(0.45, 0.85, nr_lum) * nr_pulse;`,
      `${color} = clamp(${color} + nr_glow * 1.4, 0.0, 1.0);`
    ].join('\n  ');
  }
} as const satisfies AnimationBehavior;

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const animationRegistry = [
  // Spatial — kept
  rotateBehavior,
  swirlBehavior,
  kaleidoscopeBehavior,
  domainWarpBehavior,
  mirrorTileBehavior,
  tunnelBehavior,
  noiseCrawlBehavior,
  mouseProximityBehavior,
  pixelationBehavior,
  voronoiBehavior,
  // Spatial — new
  spiralGalaxyBehavior,
  gravityLensBehavior,
  waveInterferenceBehavior,
  crystalFacetBehavior,
  glitchBlocksBehavior,
  liquidMetalBehavior,
  cosmicMaelstromBehavior,
  quantumTessellationBehavior,
  gravityWellBehavior,
  plasmaFluidBehavior,
  cyberChromaGlitchBehavior,
  // Color — kept
  hueShiftBehavior,
  colorDriftBehavior,
  edgeDetectBehavior,
  chromaticAberrationBehavior,
  vignetteBehavior,
  filmGrainBehavior,
  scanLinesBehavior,
  spectralShiftBehavior,
  TrueChromaticAberrationBehavior,
  iridescentSheenBehavior,
  thermalRadianceBehavior,
  neonReactivePulseBehavior,
  // Color — new
  paletteCycleBehavior,
  neonGlowPulseBehavior,
  rgbGlitchSplitBehavior,
  auroraFlowBehavior,
  thermalVisionBehavior
] as const satisfies AnimationBehavior[];

export type AnimationBehaviorId = (typeof animationRegistry)[number]['id'];
