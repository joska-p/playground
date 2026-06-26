import { SeededRandom } from '@repo/randomart-engine/random/SeededRandom';
import type { NextStepOptions, SequenceRule } from '../../rules/types';

// Cache multiple harmonic layers derived from the string hash
let cachedSeed: string | null = null;
let harmonics: Array<{ freqX: number; freqY: number; amp: number }> = [];

function generateHarmonics(seed: string) {
  if (seed === cachedSeed) return harmonics;

  const rng = new SeededRandom(seed);
  harmonics = [];

  // Generate 4 distinct layers of complexity to map the string to a unique shape
  for (let i = 0; i < 4; i++) {
    harmonics.push({
      freqX: 1 + Math.floor(rng.next() * 12), // Integer frequencies map well to closed loops
      freqY: 1 + Math.floor(rng.next() * 12),
      amp: 150 / (i + 1) // Decreasing amplitude for finer detail layers
    });
  }

  cachedSeed = seed;
  return harmonics;
}

export const fourierPathRule: SequenceRule = {
  name: 'Fourier Hash Path',
  id: 'fourier-hash-path',
  description:
    'Generates an intricate, multi-harmonic 2D coordinate sequence derived from a seed string.',
  maxSteps: 0, // Signals playback mode

  getNext: (options: NextStepOptions): number => {
    const { index, seed = 'default-fourier-seed' } = options;

    const pairIndex = Math.floor(index / 2);
    const isYCoordinate = index % 2 === 1;

    // Fetch the unique geometry layers for this specific string hash
    const currentHarmonics = generateHarmonics(seed);

    // Normalize progress t between 0.0 and 1.0
    const totalPairs = 500;
    const t = pairIndex / totalPairs;

    let value = 0;

    // Accumulate the waves to create a complex continuous shape
    for (const layer of currentHarmonics) {
      if (isYCoordinate) {
        value += Math.cos(t * Math.PI * 2 * layer.freqY) * layer.amp;
      } else {
        value += Math.sin(t * Math.PI * 2 * layer.freqX) * layer.amp;
      }
    }

    return value;
  }
};
