import type { SeededRandom } from '../types';

const HISTORY_LIMIT = 1024;

export function createSeededRandom(seedString: string): SeededRandom {
  let seed: number;
  const initialHash: number = (() => {
    let hash = 2166136261;
    for (let i = 0; i < seedString.length; i++) {
      hash ^= seedString.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash) || 1;
  })();
  seed = initialHash;

  const choiceHistory: number[] = [];

  const next = (): number => {
    let z = (seed += 0x6d2b79f5);
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    const result = ((z ^ (z >>> 14)) >>> 0) / 4294967296;

    if (choiceHistory.length < HISTORY_LIMIT) {
      choiceHistory.push(result);
    }

    return result;
  };

  const pick = <T>(arr: T[]): T => {
    if (arr.length === 0) throw new Error('Cannot pick from empty array!');
    const index = Math.floor(next() * arr.length);
    return arr[index]!;
  };

  const pickWeighted = <T extends { weight?: number }>(arr: T[]): T => {
    if (arr.length === 0) throw new Error('Cannot pick from empty array!');
    const totalWeight = arr.reduce((sum, item) => sum + (item.weight ?? 1.0), 0);
    let target = next() * totalWeight;

    for (const item of arr) {
      target -= item.weight ?? 1.0;
      if (target <= 0) return item;
    }
    return arr[arr.length - 1]!;
  };

  const range = (min: number, max: number, precision: number = 3): string => {
    const val = next() * (max - min) + min;
    return val.toFixed(precision);
  };

  return {
    next,
    pick,
    pickWeighted,
    range,
    get choiceHistory() {
      return [...choiceHistory];
    },
    get initialHash() {
      return initialHash;
    }
  };
}
