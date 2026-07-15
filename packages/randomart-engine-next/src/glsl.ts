/**
 * GLSL helper function definitions and dependency resolver.
 *
 * Provides a registry of reusable GLSL functions (random, noise, recaman, etc.)
 * and a topological dependency resolver that emits them in dependency order.
 * New library functions are added here and wired into the compiler in S6.
 */

export type GlslFunction = {
  id: string;
  glsl: string;
  dependencies?: string[];
};

const random2d = {
  id: 'random2d',
  glsl: `float random2d(vec2 co) {
  float dot_ = dot(co, vec2(12.9898, 78.233));
  return fract(sin(dot_) * 43758.5453);
}`
} as const satisfies GlslFunction;

const hash1 = {
  id: 'hash1',
  glsl: `float hash1(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}`
} as const satisfies GlslFunction;

const smoothNoise = {
  id: 'smoothNoise',
  dependencies: ['hash1'],
  glsl: `float smoothNoise(float t) {
  float i = floor(t);
  float f = fract(t);
  float u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(hash1(i), hash1(i + 1.0), u);
}`
} as const satisfies GlslFunction;

const smoothNoise2 = {
  id: 'smoothNoise2',
  dependencies: ['smoothNoise'],
  glsl: `vec2 smoothNoise2(float t) {
  return vec2(smoothNoise(t), smoothNoise(t + 31.71));
}`
} as const satisfies GlslFunction;

const pseudoRecaman = {
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
} as const satisfies GlslFunction;

const fbmNoise = {
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
} as const satisfies GlslFunction;

export const glslFunctions = [
  random2d,
  hash1,
  smoothNoise,
  smoothNoise2,
  pseudoRecaman,
  fbmNoise
] as const satisfies GlslFunction[];

export type GlslFunctionsIds = (typeof glslFunctions)[number]['id'];

export const functionById = new Map<string, GlslFunction>(glslFunctions.map((f) => [f.id, f]));

/**
 * Given a list of required GLSL function IDs, returns the concatenated GLSL
 * source with dependencies resolved in topological order.
 *
 * Throws on dependency cycles.
 */
export function resolveGlslDeps(requiredIds: string[]): string {
  const visited = new Set<string>();
  const resolving = new Set<string>();
  const path: string[] = [];
  const ordered: GlslFunction[] = [];

  function resolve(id: string) {
    if (visited.has(id)) return;
    if (resolving.has(id)) {
      const cycleStart = path.indexOf(id);
      const cycle = path.slice(cycleStart).concat(id);
      throw new Error(`Dependency cycle detected: ${cycle.join(' → ')}`);
    }
    resolving.add(id);
    path.push(id);
    const fn = functionById.get(id);
    if (!fn) {
      path.pop();
      resolving.delete(id);
      visited.add(id);
      return;
    }
    for (const dep of fn.dependencies ?? []) {
      resolve(dep);
    }
    path.pop();
    resolving.delete(id);
    visited.add(id);
    ordered.push(fn);
  }

  for (const id of requiredIds) {
    resolve(id);
  }

  return ordered.map((f) => f.glsl).join('\n\n');
}
