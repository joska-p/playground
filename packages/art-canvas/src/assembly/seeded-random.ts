const HISTORY_LIMIT = 1024;

export class SeededRandom {
  private seed: number;
  public readonly initialHash: number;
  public choiceHistory: number[] = [];

  constructor(seedString: string) {
    let hash = 2166136261;
    for (let i = 0; i < seedString.length; i++) {
      hash ^= seedString.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    this.initialHash = Math.abs(hash) || 1;
    this.seed = this.initialHash;
  }

  next(): number {
    let z = (this.seed += 0x6d2b79f5);
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    const result = ((z ^ (z >>> 14)) >>> 0) / 4294967296;

    if (this.choiceHistory.length < HISTORY_LIMIT) {
      this.choiceHistory.push(result);
    }

    return result;
  }

  pick<T>(arr: T[]): T {
    if (arr.length === 0) {
      throw new Error('SeededRandom.pick() was called with an empty array!');
    }
    const index = Math.floor(this.next() * arr.length);
    return arr[index]!;
  }

  pickWeighted<T extends { weight?: number }>(arr: T[]): T {
    if (arr.length === 0) throw new Error('Cannot pick from empty array!');
    const totalWeight = arr.reduce((sum, item) => sum + (item.weight ?? 1.0), 0);
    let target = this.next() * totalWeight;

    for (const item of arr) {
      target -= item.weight ?? 1.0;
      if (target <= 0) return item;
    }
    return arr[arr.length - 1]!;
  }

  range(min: number, max: number, precision: number = 3): string {
    const val = this.next() * (max - min) + min;
    return val.toFixed(precision);
  }
}
