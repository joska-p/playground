/**
 * Mulberry32 — a fast, high-quality 32-bit seeded PRNG.
 * Returns a function that yields values in [0, 1) each time it is called.
 * The sequence is fully determined by the seed, making stochastic grammars
 * reproducible across runs.
 */
export function createRandom(seed: number): () => number {
  let s = seed >>> 0; // ensure 32-bit unsigned
  return function random(): number {
    s += 0x6d2b79f5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
