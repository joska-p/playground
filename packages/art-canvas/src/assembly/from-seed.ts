import { MOOD_REGISTRY } from './moods';
import { PALETTE_REGISTRY } from '../palettes/registry';
import { noiseField } from '../shaders/modules/shapes/noiseField';
import { sdBox } from '../shaders/modules/shapes/sdBox';
import { voronoiModule } from '../shaders/modules/shapes/voronoi';
import { domainWarp } from '../shaders/modules/space/domainWarp';
import { flowField } from '../shaders/modules/space/flowField';
import { mouseAttractor } from '../shaders/modules/space/mouseAttractor';
import { polarCoords } from '../shaders/modules/space/polarCoords';
import { repeatSpace } from '../shaders/modules/space/repeatSpace';
import { rotate2d } from '../shaders/modules/space/rotate2d';
import { ClassicTemplate } from '../shaders/templates/classic';
import { DirectNoiseTemplate } from '../shaders/templates/DirectNoiseTemplate';
import noisePreamble from '../shaders/preamble/noise2d.glsl?raw';
import fbmPreamble from '../shaders/preamble/fbm.glsl?raw';
import type { Mood, SeededRandom, ShaderModule, ShaderTemplate } from '../types';
import { createSeededRandom } from './seeded-random';

const PREAMBLE_REGISTRY: Record<string, string> = {
  noise2d: noisePreamble,
  fbm: fbmPreamble,
};

const SPACE_REGISTRY: ShaderModule[] = [
  domainWarp,
  flowField,
  rotate2d,
  repeatSpace,
  polarCoords,
  mouseAttractor
];
const SHAPE_REGISTRY: ShaderModule[] = [voronoiModule, noiseField, sdBox];

const TEMPLATE_REGISTRY: ShaderTemplate[] = [
  ClassicTemplate,
  DirectNoiseTemplate
  // MultiFieldTemplate, OneShotTemplate, etc.
];

function applyMood<T extends { name: string; weight?: number }>(
  registry: readonly T[],
  moodWeights?: Record<string, number>
): T[] {
  if (!moodWeights) return [...registry];
  return registry.map((item) => ({
    ...item,
    weight: (item.weight ?? 1.0) * (moodWeights[item.name] ?? 1.0),
  }));
}

function processArgs(mod: ShaderModule, rng: SeededRandom): Record<string, string> {
  const resolvedArgs: Record<string, string> = { uv: 'uv' };
  if (!mod.params) return resolvedArgs;

  for (const [paramName, rule] of Object.entries(mod.params)) {
    if (rule.type === 'global' || rule.type === 'literal') {
      resolvedArgs[paramName] = String(rule.value);
    } else if (rule.type === 'range') {
      resolvedArgs[paramName] = rng.range(rule.min, rule.max, rule.precision ?? 3);
    }
  }
  return resolvedArgs;
}

export function generateShaderFromSeed(seed: string, complexity: number = 3): string {
  const rng = createSeededRandom(seed);
  const activeModules: ShaderModule[] = [];

  // 0. Pick mood — biases everything downstream
  const mood: Mood = rng.pickWeighted(MOOD_REGISTRY);
  const effectiveComplexity = Math.max(
    1,
    Math.min(5, complexity + (mood.complexityBias ?? 0))
  );

  // 1. Pick the structural grammar, biased by mood
  const pickedTemplate = rng.pickWeighted(
    applyMood(TEMPLATE_REGISTRY, mood.templateWeights)
  );

  // 2. Resolve spaces, shapes, and effects — biased by mood
  const moodSpaceRegistry = applyMood(SPACE_REGISTRY, mood.moduleWeights);
  let spaceBlock = '';

  for (let d = 0; d < effectiveComplexity; d++) {
    const space = rng.pickWeighted(moodSpaceRegistry);
    activeModules.push(space);
    spaceBlock += `\n${space.getCall(processArgs(space, rng))}`;
  }

  const moodShapeRegistry = applyMood(SHAPE_REGISTRY, mood.moduleWeights);
  const shape = rng.pickWeighted(moodShapeRegistry);
  activeModules.push(shape);

  // 3. Collect unique preamble deps from template + modules
  const deps = Array.from(
    new Set([
      ...(pickedTemplate.deps ?? []),
      ...activeModules.flatMap((m) => m.deps ?? []),
    ])
  );
  const preambleCode = deps.map((name) => PREAMBLE_REGISTRY[name]).join('\n');
  const moduleCode = Array.from(new Set(activeModules.map((m) => m.code))).join('\n');
  const uniqueInjectedCode = preambleCode
    ? preambleCode + '\n' + moduleCode
    : moduleCode;
  const palette = rng.pickWeighted(
    applyMood(PALETTE_REGISTRY, mood.paletteWeights)
  );

  // 4. Delegate compilation to the chosen grammar sentence
  return pickedTemplate.generate({
    complexity: effectiveComplexity,
    rng,
    spaceBlock,
    shapeBlock: shape.getCall(processArgs(shape, rng)),
    effectBlock: '', // Assemble conditional effects here
    palette,
    uniqueInjectedCode
  });
}
