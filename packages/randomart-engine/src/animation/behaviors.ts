import type { AnimationBehavior } from '../types';

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
  applyCode: ({ time, speed, color }) => `${color} = hueRotate(${color}, ${time} * ${speed});`
};

export const zoomBehavior: AnimationBehavior = {
  id: 'zoom',
  name: 'Zoom',
  glslFunction: ``,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) => `${spatial} *= (1.0 + 0.5 * sin(${time} * ${speed}));`
};

export const rippleBehavior: AnimationBehavior = {
  id: 'ripple',
  name: 'Ripple',
  glslFunction: ``,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} += 0.1 * sin(${spatial} * 5.0 + ${time} * ${speed});`
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
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = rotate2d(${time} * ${speed} * 0.5) * ${spatial};`
};

export const swirlBehavior: AnimationBehavior = {
  id: 'swirl',
  name: 'Swirl',
  glslFunction: `
vec2 swirl(vec2 coords, float angle) {
  float r = length(coords);
  float a = atan(coords.y, coords.x) + angle * (1.0 - r);
  return vec2(cos(a) * r, sin(a) * r);
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = swirl(${spatial}, sin(${time} * ${speed}) * 2.0);`
};

export const driftBehavior: AnimationBehavior = {
  id: 'drift',
  name: 'Drift',
  glslFunction: ``,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) => `${spatial} += ${time} * ${speed} * 0.1;`
};

export const expandBehavior: AnimationBehavior = {
  id: 'expand',
  name: 'Expand',
  glslFunction: ``,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) => `${spatial} /= (1.0 + ${time} * ${speed} * 0.1);`
};

export const kaleidoscopeBehavior: AnimationBehavior = {
  id: 'kaleidoscope',
  name: 'Kaleidoscope',
  glslFunction: `
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
};

export const domainWarpBehavior: AnimationBehavior = {
  id: 'domain-warp',
  name: 'Warp',
  glslFunction: `
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
};

export const mirrorTileBehavior: AnimationBehavior = {
  id: 'mirror-tile',
  name: 'Mirror',
  glslFunction: ``,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = abs(mod(${spatial} * 1.4 + ${time} * ${speed} * 0.08, 2.0) - 1.0);`
};

export const tunnelBehavior: AnimationBehavior = {
  id: 'tunnel',
  name: 'Tunnel',
  glslFunction: `
vec2 tunnel(vec2 coords, float t, float speed) {
  float r = length(coords) + 0.0001;
  float a = atan(coords.y, coords.x);
  float depth = fract(log(r) * 0.5 - t * speed * 0.2);
  return vec2(a / 3.14159265, depth * 2.0 - 1.0);
}
`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) => `${spatial} = tunnel(${spatial}, ${time}, ${speed});`
};

export const contrastPulseBehavior: AnimationBehavior = {
  id: 'contrast-pulse',
  name: 'Pulse',
  glslFunction: `
vec3 contrastPulse(vec3 color, float t, float speed) {
  float k = 1.5 + 1.0 * sin(t * speed * 0.5);
  return clamp((color - 0.5) * k + 0.5, 0.0, 1.0);
}
`,
  type: 'color',
  applyCode: ({ time, speed, color }) => `${color} = contrastPulse(${color}, ${time}, ${speed});`
};

export const goldenWanderBehavior: AnimationBehavior = {
  id: 'golden-wander',
  name: 'Wander',
  glslFunction: ``,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) => {
    const phi = '1.6180339887';
    return [
      `float gw_t = ${time} * ${speed} * 0.3;`,
      `${spatial} += vec2(sin(gw_t), cos(gw_t * ${phi})) * 0.4;`
    ].join('\n  ');
  }
};

export const noiseCrawlBehavior: AnimationBehavior = {
  id: 'noise-crawl',
  name: 'Crawl',
  glslFunction: ``,
  type: 'spatial',
  noiseDependencies: ['smoothNoise2'],
  applyCode: ({ time, speed, spatial }) =>
    [
      `vec2 nc_offset = smoothNoise2(${time} * ${speed} * 0.15) * 2.0 - 1.0;`,
      `${spatial} += nc_offset * 0.6;`
    ].join('\n  ')
};

export const colorDriftBehavior: AnimationBehavior = {
  id: 'color-drift',
  name: 'Color Drift',
  glslFunction: ``,
  type: 'color',
  noiseDependencies: ['smoothNoise'],
  applyCode: ({ time, speed, color }) =>
    [
      `float cd_t = ${time} * ${speed} * 0.1;`,
      `vec3 cd_tint = vec3(smoothNoise(cd_t), smoothNoise(cd_t + 17.3), smoothNoise(cd_t + 53.9));`,
      `${color} = mix(${color}, ${color} * (0.6 + 0.8 * cd_tint), 0.4);`
    ].join('\n  ')
};

export const recamanPulseBehavior: AnimationBehavior = {
  id: 'recaman-pulse',
  name: 'Recamán',
  glslFunction: `
vec2 recamanWarp(vec2 coords, float t, float speed) {
  float timeFactor = t * speed * 0.4;
  float r = length(coords);
  float theta = atan(coords.y, coords.x);

  // Instead of floor/fract steps, use smooth continuous trigonometric oscillations
  float waveSelector = sin(r * 4.0 + timeFactor);

  // Smoothly scale the warp magnitude without hard integer cuts
  float arcWarp = sin(theta * 2.0 + timeFactor) * (timeFactor * 0.01);

  // A smooth continuous pulse instead of a hard directional sign-flip snap
  r += waveSelector * 0.1 + arcWarp;

  return vec2(cos(theta) * r, sin(theta) * r);
}`,
  type: 'spatial',
  applyCode: ({ time, speed, spatial }) =>
    `${spatial} = recamanWarp(${spatial}, ${time}, ${speed});`
};

export const edgeDetectBehavior: AnimationBehavior = {
  id: 'edge-detect',
  name: 'Contour',
  type: 'color',
  noiseDependencies: ['smoothNoise'],
  glslFunction: `
vec3 applyLaplacianEdges(vec3 baseColor, vec2 uv, float time) {
    float centerLuminance = dot(baseColor, vec3(0.299, 0.587, 0.114));

    // Screen-space derivatives for clean edge isolation
    float dX = dFdx(centerLuminance);
    float dY = dFdy(centerLuminance);
    float edge = length(vec2(dX, dY));

    // Animate edge intensity slightly
    float intensityModifier = 1.0 + smoothNoise(time * 0.3) * 1.0;
    edge *= intensityModifier;

    // Generate a cycling neon color palette using cosine waves based on position + time
    vec3 edgeColor = 0.5 + 0.5 * cos(time + uv.xyx + vec3(0.0, 2.0, 4.0));

    // Boost the brightness of the neon line
    edgeColor *= 1.5;

    // Mix the glowing neon color into your generative base color matrix
    return mix(baseColor, edgeColor, smoothstep(0.04, 0.2, edge));
}
`,
  applyCode: ({ time, speed, color }) =>
    `${color} = applyLaplacianEdges(${color}, v_texCoord, ${time} * ${speed});`
};

export const mouseProximityBehavior: AnimationBehavior = {
  id: 'mouse-proximity',
  name: 'Mouse Field',
  type: 'spatial',
  glslFunction: ``,
  applyCode: ({ spatial }) => {
    return [
      `vec2 fragPx = vec2(v_texCoord.x * u_resolution.x, (1.0 - v_texCoord.y) * u_resolution.y);`,
      `float distToMouse = length(fragPx - u_mouse);`,
      `float force = 1.0 - smoothstep(0.0, 300.0, distToMouse);`,
      `${spatial} += normalize(fragPx - u_mouse) * force * 0.25;`
    ].join('\n  ');
  }
};

export const pixelationBehavior: AnimationBehavior = {
  id: 'pixelation',
  name: 'Pixelation',
  type: 'spatial',
  glslFunction: ``,
  applyCode: ({ time, speed, spatial }) => {
    return [
      `float pix_res = 20.0 + 80.0 * (0.5 + 0.5 * sin(${time} * ${speed} * 0.3));`,
      `${spatial} = floor(${spatial} * pix_res + 0.5) / pix_res;`
    ].join('\n  ');
  }
};

export const inversionBehavior: AnimationBehavior = {
  id: 'inversion',
  name: 'Inversion',
  type: 'color',
  glslFunction: ``,
  applyCode: ({ time, speed, color }) =>
    `${color} = mix(${color}, 1.0 - ${color}, 0.5 + 0.5 * sin(${time} * ${speed} * 0.5));`
};

export const chromaticAberrationBehavior: AnimationBehavior = {
  id: 'chromatic-aberration',
  name: 'Aberration',
  type: 'color',
  glslFunction: ``,
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float ca_offset = 0.003 * sin(${time} * ${speed} * 0.7);`,
      `vec2 ca_dir = normalize(${spatial}) * ca_offset;`,
      `${color}.r = ${color}.r + ca_dir.x;`,
      `${color}.b = ${color}.b - ca_dir.y;`
    ].join('\n  ');
  }
};

export const vignetteBehavior: AnimationBehavior = {
  id: 'vignette',
  name: 'Vignette',
  type: 'color',
  glslFunction: ``,
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float vig_t = ${time} * ${speed};`,
      `float vig_radius = 0.8 + 0.2 * sin(vig_t * 0.2);`,
      `float vig = 1.0 - smoothstep(vig_radius * 0.5, vig_radius, length(${spatial}));`,
      `${color} *= vig;`
    ].join('\n  ');
  }
};

export const filmGrainBehavior: AnimationBehavior = {
  id: 'film-grain',
  name: 'Grain',
  type: 'color',
  noiseDependencies: ['random2d'],
  glslFunction: ``,
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float grain_seed = fract(${time} * ${speed});`,
      `float grain = random2d(${spatial} * 100.0 + grain_seed) * 0.15;`,
      `${color} += grain - 0.075;`
    ].join('\n  ');
  }
};

export const scanLinesBehavior: AnimationBehavior = {
  id: 'scan-lines',
  name: 'Scan',
  type: 'color',
  glslFunction: ``,
  applyCode: ({ time, speed, spatial, color }) => {
    return [
      `float scan_freq = 80.0 + 40.0 * sin(${time} * ${speed} * 0.1);`,
      `float scan = 0.9 + 0.1 * sin(${spatial}.y * scan_freq);`,
      `${color} *= scan;`
    ].join('\n  ');
  }
};

export const voronoiBehavior: AnimationBehavior = {
  id: 'voronoi',
  name: 'Voronoi',
  glslFunction: `
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
  colorDriftBehavior,
  recamanPulseBehavior,
  edgeDetectBehavior,
  mouseProximityBehavior,
  pixelationBehavior,
  inversionBehavior,
  chromaticAberrationBehavior,
  vignetteBehavior,
  voronoiBehavior,
  filmGrainBehavior,
  scanLinesBehavior
];
