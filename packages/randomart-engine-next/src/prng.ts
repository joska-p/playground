/**
 * Deterministic pseudo-random stream derived from a text seed.
 *
 * The random-art scheme requires a repeatable stream of bits/numbers derived
 * from the seed so that the same seed always produces the same art. We use a
 * small FNV-1a hash to fold the UTF-8 bytes of the seed into a 32-bit state and
 * then a mulberry32 generator to expand that state into a stream. This keeps the
 * library dependency-free while still being well-distributed.
 */

const textEncoder = new TextEncoder();

/** FNV-1a 32-bit hash of a string (proper UTF-8 encoding). */
export function fnv1a(text: string): number {
  let hash = 0x811c9dc5;
  const bytes = textEncoder.encode(text);
  for (const byte of bytes) {
    hash ^= byte;
    // 32-bit FNV prime multiply, done with shifts to stay in 32-bit range.
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * A deterministic number/byte generator seeded from a string.
 *
 * `next()` returns a float in [0, 1); `nextByte()` returns an int in [0, 255];
 * `nextInt(n)` returns an int in [0, n). The sequence is fully determined by the
 * seed string, matching the reproducibility requirement of hash visualization.
 */
export class SeededRandom {
  private state: number;

  constructor(seed: string) {
    // Mix the FNV hash a little so short seeds still spread across the state.
    this.state = (fnv1a(seed) ^ 0x9e3779b9) >>> 0;
    if (this.state === 0) this.state = 0x1;
  }

  /** mulberry32 step -> float in [0, 1). */
  next(): number {
    this.state = (this.state + 0x6d2b79f5) >>> 0;
    let t = this.state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Integer in [0, n). */
  nextInt(n: number): number {
    return Math.floor(this.next() * n);
  }

  /** Integer in [0, 255]. */
  nextByte(): number {
    return this.nextInt(256);
  }

  /** Float in [min, max). */
  nextRange(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
}
