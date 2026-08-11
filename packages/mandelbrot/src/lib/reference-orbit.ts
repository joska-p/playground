/**
 * High-precision reference orbit for perturbation-based Mandelbrot rendering.
 *
 * The whole point of perturbation theory: we only ever need arbitrary precision for ONE point. We
 * iterate Z_{n+1} = Z_n^2 + C for the reference center C using BigFloat (BigInt-backed fixed
 * point), but we store each Z_n as an ordinary pair of floats — they are always bounded (|Z| < ~2
 * until escape), so floats capture them fine. The GPU then iterates only the tiny per-pixel delta
 * against this stored orbit.
 *
 * Two entry points share `stepReference`:
 *
 * - `computeReferenceOrbit` — synchronous, for the worker (off main thread).
 * - `computeReferenceOrbitAsync` — chunked, yields to the event loop between chunks; used by the
 *   no-worker fallback so the UI never freezes.
 */

import { type BigFloat, add, mul, mulInt, sub, toNumber, zero } from './big-float';

export type ReferenceOrbit = {
    /** Interleaved [x0, y0, x1, y1, ...] of the reference orbit, as float32. */
    data: Float32Array;
    /** Number of stored iterations (orbit length). */
    length: number;
};

export type ReferenceParams = {
    centerX: BigFloat;
    centerY: BigFloat;
    maxIter: number;
};

/**
 * Escape radius is large (not 2) so the reference keeps producing useful values as long as possible
 * before diverging.
 */
const ESCAPE_RADIUS_SQ = 1e12;

/** Iterations between event-loop yields in the chunked fallback. */
const CHUNK_SIZE = 512;

type ReferenceState = {
    zx: BigFloat;
    zy: BigFloat;
    centerX: BigFloat;
    centerY: BigFloat;
};

/**
 * Advance the reference by one iteration: float-copy the current Z_n (the caller stores it) and
 * return the next state, or `next: null` when Z_n escaped.
 */
function stepReference(state: ReferenceState): {
    next: ReferenceState | null;
    fx: number;
    fy: number;
} {
    const { zx, zy, centerX, centerY } = state;
    const fx = toNumber(zx);
    const fy = toNumber(zy);
    if (fx * fx + fy * fy > ESCAPE_RADIUS_SQ) return { next: null, fx, fy };

    // Z = Z^2 + C, with Z^2 = (x^2 - y^2) + i(2xy).
    return {
        next: {
            zx: add(sub(mul(zx, zx), mul(zy, zy)), centerX),
            zy: add(mulInt(mul(zx, zy), 2), centerY),
            centerX,
            centerY
        },
        fx,
        fy
    };
}

function initialState({ centerX, centerY }: ReferenceParams): ReferenceState {
    return {
        zx: zero(centerX.prec),
        zy: zero(centerY.prec),
        centerX,
        centerY
    };
}

function finished(data: Float32Array, n: number): ReferenceOrbit {
    return { data: data.subarray(0, n * 2), length: n };
}

/** Compute the reference orbit. `C` is the center; Z starts at 0. */
export function computeReferenceOrbit(params: ReferenceParams): ReferenceOrbit {
    const data = new Float32Array(params.maxIter * 2);
    let state = initialState(params);

    let n = 0;
    for (; n < params.maxIter; n++) {
        const { next, fx, fy } = stepReference(state);
        data[n * 2] = fx;
        data[n * 2 + 1] = fy;
        if (next === null) {
            n++;
            break;
        }
        state = next;
    }
    return finished(data, n);
}

/**
 * Same orbit as `computeReferenceOrbit`, but yields to the event loop every `CHUNK_SIZE` iterations
 * so a long run never blocks rendering or input.
 */
export async function computeReferenceOrbitAsync(params: ReferenceParams): Promise<ReferenceOrbit> {
    const data = new Float32Array(params.maxIter * 2);
    let state = initialState(params);

    let n = 0;
    for (; n < params.maxIter; n++) {
        const { next, fx, fy } = stepReference(state);
        data[n * 2] = fx;
        data[n * 2 + 1] = fy;
        if (next === null) {
            n++;
            break;
        }
        state = next;
        if (n % CHUNK_SIZE === 0) {
            await new Promise<void>((resolve) => setTimeout(resolve, 0));
        }
    }
    return finished(data, n);
}
