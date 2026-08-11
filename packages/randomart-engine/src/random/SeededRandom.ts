const HISTORY_LIMIT = 1024;

/**
 * A deterministic seeded PRNG (Mulberry32) that reproduces the same sequence of
 * values for the same seed string — the engine's source of reproducible variety.
 */
export class SeededRandom {
    private seed: number;

    /** Hash of the seed string, stable across runs. */
    public readonly initialHash: number;

    /** The most recent values produced by {@link next}, capped at a fixed limit. */
    public choiceHistory: number[] = [];

    /** Creates a PRNG from a seed string; the same string always yields the same sequence. */
    constructor(seedString: string) {
        // A more robust string hashing algorithm (MurmurHash-inspired)
        let hash = 2166136261;
        for (let i = 0; i < seedString.length; i++) {
            hash ^= seedString.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        this.initialHash = Math.abs(hash) || 1;
        this.seed = this.initialHash;
    }

    // Mulberry32 generator: excellent distribution for procedural generation
    /** Returns the next pseudorandom float in [0, 1). */
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
}
