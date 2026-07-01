import type { Mood, SeededRandom } from '../types';
import { MOOD_REGISTRY } from './moods';

export function pickMood(rng: SeededRandom, selectedMood?: string): Mood {
  return selectedMood
    ? (MOOD_REGISTRY.find((m) => m.name === selectedMood) ?? MOOD_REGISTRY[0])
    : rng.pickWeighted(MOOD_REGISTRY);
}

export function effectiveComplexity(complexity: number, mood: Mood): number {
  return Math.max(1, Math.min(5, complexity + (mood.complexityBias ?? 0)));
}
