/**
 * Look model: the color/lighting/iteration knobs a renderer exposes, and the
 * mapping from the UI state to the shader-facing params. Pure data — the
 * control panel is a view of `LookState`, the renderer consumes `LookParams`.
 */

export type LookState = {
    /** Iteration budget as a % multiplier; the effective count scales with zoom. */
    maxIter: number;
    colorFreq: number;
    colorOffset: number;
    /** Degrees in the UI (converted to radians by `lookToParams`). */
    lightAngle: number;
    lightHeight: number;
    glow: number;
    chroma: number;
    baseL: number;
};

export type LookParams = {
    colorFreq: number;
    colorOffset: number;
    lightAngle: number;
    lightHeight: number;
    glow: number;
    chroma: number;
    baseL: number;
};

export const DEFAULT_LOOK: LookState = {
    // maxIter here is a *budget* multiplier (%); the effective iteration count
    // scales with zoom depth so deep zooms keep resolving border detail.
    maxIter: 100,
    colorFreq: 8,
    colorOffset: 0.62,
    lightAngle: 135,
    lightHeight: 1.35,
    glow: 0.35,
    chroma: 0.14,
    baseL: 0.62
};

/** Hard ceiling to protect the GPU/CPU from runaway iteration counts. */
export const MAX_ITER_CAP = 60000;

/**
 * Effective iteration count for a zoom depth. Detail near the border needs
 * more iterations the deeper we go — roughly linear in zoom (log2 mag), scaled
 * by the user's budget slider (100 = default).
 */
export function effectiveMaxIter(budgetPct: number, zoom: number): number {
    const base = 256 + zoom * 96;
    return Math.min(MAX_ITER_CAP, Math.round((base * budgetPct) / 100));
}

export function lookToParams(s: LookState): LookParams {
    return {
        colorFreq: s.colorFreq,
        colorOffset: s.colorOffset,
        lightAngle: (s.lightAngle * Math.PI) / 180,
        lightHeight: s.lightHeight,
        glow: s.glow,
        chroma: s.chroma,
        baseL: s.baseL
    };
}
