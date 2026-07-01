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
import type { SeededRandom, ShaderModule, ShaderTemplate } from '../types';
import { createSeededRandom } from './seeded-random';

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

export function generateShaderFromSeed(seed: string): string {
  const rng = createSeededRandom(seed);
  const activeModules: ShaderModule[] = [];

  // 1. Pick the structural grammar first
  const pickedTemplate = rng.pickWeighted(TEMPLATE_REGISTRY);

  // 2. Resolve spaces, shapes, and effects as needed
  // (You can even let the template dictate how many modules it wants!)
  let spaceBlock = '';
  const depth = pickedTemplate.name === 'direct-noise' ? 4 : 2; // Dynamic constraints!

  for (let d = 0; d < depth; d++) {
    const space = rng.pickWeighted(SPACE_REGISTRY);
    activeModules.push(space);
    spaceBlock += `\n${space.getCall(processArgs(space, rng))}`;
  }

  const shape = rng.pickWeighted(SHAPE_REGISTRY);
  activeModules.push(shape);

  // 3. Clean injection code setup
  const uniqueInjectedCode = Array.from(new Set(activeModules.map((m) => m.code))).join('\n');
  const palette = rng.pickWeighted(PALETTE_REGISTRY);

  // 4. Delegate compilation to the chosen grammar sentence
  return pickedTemplate.generate({
    rng,
    spaceBlock,
    shapeBlock: shape.getCall(processArgs(shape, rng)),
    effectBlock: '', // Assemble conditional effects here
    palette,
    uniqueInjectedCode
  });
}
