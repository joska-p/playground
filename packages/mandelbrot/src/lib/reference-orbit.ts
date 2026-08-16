/**
 * Perturbation rendering: only the reference center needs BigFloat precision. Each Z_n stays
 * bounded (|Z| < 2 until escape), so the orbit is stored as plain float32 and the GPU iterates the
 * tiny per-pixel delta against it.
 */

import { type BigFloat, add, mul, mulInt, sub, toNumber, zero } from './big-float';

export type ReferenceOrbit = {
    data: Float32Array;
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

const CHUNK_SIZE = 512;

type ReferenceState = {
    zx: BigFloat;
    zy: BigFloat;
    centerX: BigFloat;
    centerY: BigFloat;
};

/** One iteration of the reference; `next` is null once Z escapes. */
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

/** Same orbit, but yields to the event loop between chunks so a long run never blocks input. */
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
