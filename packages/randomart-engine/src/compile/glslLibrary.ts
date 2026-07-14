export type GlslFunction = {
  id: string;
  glsl: string;
  dependencies?: string[];
};

const random2d: GlslFunction = {
  id: 'random2d',
  glsl: `float random2d(vec2 co) {
  float dot_ = dot(co, vec2(12.9898, 78.233));
  return fract(sin(dot_) * 43758.5453);
}`
};

const hash1: GlslFunction = {
  id: 'hash1',
  glsl: `float hash1(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}`
};

const smoothNoise: GlslFunction = {
  id: 'smoothNoise',
  dependencies: ['hash1'],
  glsl: `float smoothNoise(float t) {
  float i = floor(t);
  float f = fract(t);
  float u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(hash1(i), hash1(i + 1.0), u);
}`
};

const smoothNoise2: GlslFunction = {
  id: 'smoothNoise2',
  dependencies: ['smoothNoise'],
  glsl: `vec2 smoothNoise2(float t) {
  return vec2(smoothNoise(t), smoothNoise(t + 31.71));
}`
};

const pseudoRecaman: GlslFunction = {
  id: 'pseudoRecaman',
  glsl: `float pseudoRecaman(vec2 coords) {
  float d = length(coords);
  float continuousStep = clamp(d * 15.0, 1.0, 15.0);
  int lowStep = int(floor(continuousStep));
  float stepFract = fract(continuousStep);

  float val = 0.0;
  float nextVal = 0.0;

  for(int i = 1; i < 16; i++) {
    if (i <= lowStep + 1) {
      float flip = fract(sin(val * 12.9898) * 43758.5453);
      float nextFlipped = (flip > 0.5 && (val - float(i)) > 0.0) ? (val - float(i)) : (val + float(i));

      if (i <= lowStep) {
        val = nextFlipped;
      }
      if (i == lowStep + 1) {
        nextVal = nextFlipped;
      }
    }
  }

  float finalVal = mix(val, nextVal, stepFract);
  return fract(finalVal * 0.2);
}`
};

const voronoiHash: GlslFunction = {
  id: 'voronoiHash',
  glsl: `vec2 voronoiHash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}`
};

const voronoiCells: GlslFunction = {
  id: 'voronoiCells',
  dependencies: ['voronoiHash'],
  glsl: `float voronoiCells(vec2 p) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float md = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = voronoiHash(n + g);
      o = 0.5 + 0.5 * sin(u_time * 0.0 + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      md = min(md, d);
    }
  }
  return md * 2.0 - 1.0;
}`
};

const fbmNoise: GlslFunction = {
  id: 'fbmNoise',
  dependencies: ['random2d'],
  glsl: `float fbmNoise(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * random2d(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value * 2.0 - 1.0;
}`
};

export const glslFunctions: GlslFunction[] = [
  random2d,
  hash1,
  smoothNoise,
  smoothNoise2,
  pseudoRecaman,
  voronoiHash,
  voronoiCells,
  fbmNoise
];

const functionById = new Map<string, GlslFunction>(glslFunctions.map((f) => [f.id, f]));

export function resolveGlslDeps(requiredIds: string[]): string {
  const visited = new Set<string>();
  const ordered: GlslFunction[] = [];

  function resolve(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const fn = functionById.get(id);
    if (!fn) return;
    for (const dep of fn.dependencies ?? []) {
      resolve(dep);
    }
    ordered.push(fn);
  }

  for (const id of requiredIds) {
    resolve(id);
  }

  return ordered.map((f) => f.glsl).join('\n\n');
}
