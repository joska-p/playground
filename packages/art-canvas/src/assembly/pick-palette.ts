import { applyMood } from './apply-mood';
import { PALETTE_REGISTRY } from '../palettes/registry';
import type { Mood, PalettePreset, SeededRandom } from '../types';

export function pickPalette(
  rng: SeededRandom,
  mood: Mood,
  selectedPalette?: string
): PalettePreset {
  return selectedPalette
    ? PALETTE_REGISTRY.find((p) => p.name === selectedPalette) ??
        PALETTE_REGISTRY[0]
    : rng.pickWeighted(applyMood(PALETTE_REGISTRY, mood.paletteWeights));
}
