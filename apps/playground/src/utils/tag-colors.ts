export function hashToColor(input: string): string {
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i);
        hash = hash & hash;
    }

    const h = Math.abs(hash) % 360;
    const s = 0.12 + (Math.abs(hash >> 8) % 80) / 1000;
    const l = 0.55 + (Math.abs(hash >> 16) % 150) / 1000;

    return `oklch(${l.toFixed(2)} ${s.toFixed(2)} ${String(h)})`;
}
