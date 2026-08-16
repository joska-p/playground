/**
 * App-side rules deciding when a stored reference orbit is no longer good enough, plus a token that
 * lets a newer request supersede an in-flight one. The worker pool only dispatches — these
 * decisions live here.
 */

import { toNumber } from './big-float';
import { type LookState, effectiveMaxIter } from './mandelbrot/look';
import { type View, pixelSpacing, reprecision } from './mandelbrot/view';

/**
 * Recompute once the reference has drifted this far from the view center (fraction of viewport
 * height).
 */
export const MAX_REF_DRIFT = 0.35;
/** ...or the view has zoomed this many octaves away from the stored reference. */
export const MAX_ZOOM_DRIFT = 2;
/** ...or the view now needs more than this multiple of the stored orbit length. */
export const MAX_ORBIT_GROWTH = 1.3;

/** Whether the view moved too far for the stored reference to still cover it. */
export function needsRecompute(
    view: View,
    ref: View | null,
    refLength: number,
    look: LookState,
    viewportHeightPx: number
): boolean {
    if (!ref) return true;

    const spacing = pixelSpacing(view.zoom, viewportHeightPx);
    const rv = reprecision(view);
    const dxPx = (toNumber(rv.cx) - toNumber(ref.cx)) / spacing;
    const dyPx = (toNumber(rv.cy) - toNumber(ref.cy)) / spacing;
    const distPx = Math.hypot(dxPx, dyPx);

    const zoomDrift = Math.abs(view.zoom - ref.zoom);
    const wantIters = effectiveMaxIter(look.maxIter, view.zoom);
    const needMoreIters = wantIters > refLength * MAX_ORBIT_GROWTH;

    return distPx > viewportHeightPx * MAX_REF_DRIFT || zoomDrift > MAX_ZOOM_DRIFT || needMoreIters;
}

/** Monotonic token: a newer request supersedes any older in-flight one. */
export class Superseder {
    private nextToken = 0;

    /** New token; any older one is stale. */
    begin(): number {
        return ++this.nextToken;
    }

    isCurrent(token: number): boolean {
        return token === this.nextToken;
    }
}
