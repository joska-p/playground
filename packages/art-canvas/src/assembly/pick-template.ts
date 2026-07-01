import type { Mood, SeededRandom, ShaderTemplate } from '../types';
import { applyMood } from './apply-mood';
import { TEMPLATE_REGISTRY } from './registries';

export function pickTemplate(rng: SeededRandom, mood: Mood): ShaderTemplate {
  return rng.pickWeighted(applyMood(TEMPLATE_REGISTRY, mood.templateWeights));
}
