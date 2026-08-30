export function mulberry32(seed: number) {
    return function random() {
        let t = (seed += 0x6d2b79f5);

        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** FNV-1a 32-bit — stable across sessions, good avalanche for short names. */
export function hashString(input: string): number {
    let h = 2166136261;
    const s = input.normalize('NFKC');

    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }

    return h >>> 0;
}

export function hashHex(seed: number): string {
    return seed.toString(16).padStart(8, '0');
}

export function pick<T>(rand: () => number, items: readonly T[]): T {
    return items[Math.floor(rand() * items.length)];
}

export function randRange(rand: () => number, min: number, max: number) {
    return min + rand() * (max - min);
}

export function randInt(rand: () => number, min: number, max: number) {
    return min + Math.floor(rand() * (max - min + 1));
}
