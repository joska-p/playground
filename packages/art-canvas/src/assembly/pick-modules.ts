import { applyMood } from './apply-mood';
import { SPACE_REGISTRY, SHAPE_REGISTRY } from './registries';
import type { Mood, SeededRandom, ShaderModule } from '../types';

function processArgs(
  mod: ShaderModule,
  rng: SeededRandom
): Record<string, string> {
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

export function pickModules(
  rng: SeededRandom,
  mood: Mood,
  effectiveComplexity: number
): { activeModules: ShaderModule[]; spaceBlock: string; shapeBlock: string } {
  const activeModules: ShaderModule[] = [];

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

  return {
    activeModules,
    spaceBlock,
    shapeBlock: shape.getCall(processArgs(shape, rng)),
  };
}
