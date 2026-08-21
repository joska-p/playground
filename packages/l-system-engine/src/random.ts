/** Mulberry32 — deterministic sequence per seed, so stochastic grammars reproduce across runs. */
export function createRandom(seed: number): () => number {
    let s = seed >>> 0; // ensure 32-bit unsigned

    return function random(): number {
        s += 0x6d2b79f5;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);

        t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
