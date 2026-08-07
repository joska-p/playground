/**
 * High-precision reference orbit for perturbation-based Mandelbrot rendering.
 *
 * The whole point of perturbation theory: we only ever need arbitrary
 * precision for ONE point. We iterate Z_{n+1} = Z_n^2 + C for the reference
 * center C using BigFloat (BigInt-backed fixed point), but we store each Z_n
 * as an ordinary pair of floats — they are always bounded (|Z| < ~2 until
 * escape), so floats capture them fine. The GPU then iterates only the tiny
 * per-pixel delta against this stored orbit.
 */

import { type BigFloat, add, sub, mul, mulInt, toNumber, zero } from './big-float';

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
 * Compute the reference orbit. `C` is the center; Z starts at 0.
 * Escape radius is large (not 2) so the reference keeps producing useful
 * values as long as possible before diverging.
 */
export function computeReferenceOrbit({
    centerX,
    centerY,
    maxIter
}: ReferenceParams): ReferenceOrbit {
    const prec = centerX.prec;
    const data = new Float32Array(maxIter * 2);

    let zx = zero(prec);
    let zy = zero(prec);

    let n = 0;

    for (; n < maxIter; n++) {
        // Store current Z_n as floats.
        const fx = toNumber(zx);
        const fy = toNumber(zy);
        data[n * 2] = fx;
        data[n * 2 + 1] = fy;

        // Escape check on the cheap float copy.
        if (fx * fx + fy * fy > 1e12) {
            n++;
            break;
        }

        // Z = Z^2 + C  (all in BigFloat).
        // Z^2 = (x^2 - y^2) + i(2xy)
        const x2 = mul(zx, zx);
        const y2 = mul(zy, zy);
        const xy = mul(zx, zy);

        const nextX = add(sub(x2, y2), centerX);
        const nextY = add(mulInt(xy, 2), centerY);

        zx = nextX;
        zy = nextY;
    }

    return {
        data: data.subarray(0, n * 2),
        length: n
    };
}
