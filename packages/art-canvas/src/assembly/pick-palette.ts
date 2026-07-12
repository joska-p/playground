import { PALETTE_REGISTRY, type PalettePresetName } from '../palettes/registry';
import { applyMood } from './apply-mood';
import type { Mood } from './moods';
import type { SeededRandom } from './seeded-random';

export function pickPalette(rng: SeededRandom, mood: Mood, selectedPalette?: PalettePresetName) {
  let palette;
  if (selectedPalette) {
    palette = PALETTE_REGISTRY.find((p) => p.name === selectedPalette) ?? PALETTE_REGISTRY[0];
  } else {
    palette = rng.pickWeighted(applyMood(PALETTE_REGISTRY, mood.paletteWeights));
  }

  return palette;
}
