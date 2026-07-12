import type { Mood, MoodName } from './moods';
import { MOOD_REGISTRY } from './moods';
import type { SeededRandom } from './seeded-random';

export function pickMood(rng: SeededRandom, selectedMood?: MoodName) {
  let mood;
  if (selectedMood) {
    mood = MOOD_REGISTRY.find((m) => m.name === selectedMood);
  } else {
    mood = rng.pickWeighted(MOOD_REGISTRY);
  }
  return mood;
}

export function effectiveComplexity(complexity: number, mood: Mood): number {
  return Math.max(1, Math.min(5, complexity + mood.complexityBias));
}
