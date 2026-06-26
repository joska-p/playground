import { SeededRandom } from '@repo/randomart-engine/random/SeededRandom'; //
import type { NextStepOptions, SequenceRule } from '../../rules/types';

export const fourierPathRule: SequenceRule = {
  name: 'Fourier Hash Path',
  id: 'fourier-hash-path',
  description:
    'Generates an alternating 2D coordinate sequence from a seed string for Fourier analysis.',
  maxSteps: 2000, // Provides 1000 total discrete coordinate vector pairs max

  getNext: (options: NextStepOptions): number => {
    const { index, seed = 'default-fourier-seed' } = options;

    const pairIndex = Math.floor(index / 2);
    const isYCoordinate = index % 2 === 1;

    // Normalize progress t linearly between 0.0 and 1.0 based on 500 coordinates resolution
    const totalPairs = 500;
    const t = pairIndex / totalPairs;

    // Utilize your exact SeededRandom routine
    const rng = new SeededRandom(seed);

    // Map random floats from .next() linearly into frequency multipliers
    const freqX = 1 + rng.next() * 4;
    const freqY = 1 + rng.next() * 4;

    // Parametric closed curve evaluation
    const x = Math.sin(t * Math.PI * 2 * freqX) * 150;
    const y = Math.cos(t * Math.PI * 2 * freqY) * 150;

    return isYCoordinate ? y : x;
  }
};
