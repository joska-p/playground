/** Bring positions into a predictable range for rendering. */
import type { SimNode } from './sim-types.js';

// ── Configuration ────────────────────────────────────────────────────────────

export type NormalizeConfig = {
    /** Max distance from the origin after scaling */
    targetMax: number;
};

const DEFAULT_NORMALIZE_CONFIG: NormalizeConfig = {
    targetMax: 500
};

// ── Result ───────────────────────────────────────────────────────────────────

export type NormalizeResult = {
    simNodes: SimNode[];
    stats: string[];
};

// ── Stage implementation ─────────────────────────────────────────────────────

export function normalizeCoords(
    simNodes: SimNode[],
    config: Partial<NormalizeConfig> = {}
): NormalizeResult {
    const cfg = { ...DEFAULT_NORMALIZE_CONFIG, ...config };
    const stats: string[] = [];

    let maxCoord = 0;

    for (const n of simNodes) {
        if (n.x !== undefined && Math.abs(n.x) > maxCoord) maxCoord = Math.abs(n.x);

        if (n.y !== undefined && Math.abs(n.y) > maxCoord) maxCoord = Math.abs(n.y);

        if (n.z !== undefined && Math.abs(n.z) > maxCoord) maxCoord = Math.abs(n.z);
    }

    if (maxCoord > 0) {
        const scale = cfg.targetMax / maxCoord;

        for (const n of simNodes) {
            if (n.x !== undefined) n.x *= scale;

            if (n.y !== undefined) n.y *= scale;

            if (n.z !== undefined) n.z *= scale;
        }

        stats.push(`Normalised coordinates (scale factor: ${scale.toFixed(4)})`);
    }

    return { simNodes, stats };
}
