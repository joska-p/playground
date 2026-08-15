export type ReferenceOrbit = {
    /** Interleaved (Xr, Xi) float32 pairs, one RG texel per iteration. */
    data: Float32Array;
    /** Total iterations computed = texture width / shader loop bound. */
    orbitLength: number;
    /**
     * Valid texel count. On escape the escaping value is stored too, so
     * referenceIterations = escapeIndex + 2 and the shader can always build Z = X_{i+1} + dz;
     * else == orbitLength.
     */
    referenceIterations: number;
};

// Must mirror the loop-count formula in mandelbrot.glsl so CPU and shader never disagree.
export function computeMaxIterations(
    zoom: number,
    iterationBase: number,
    iterationScale: number,
    iterationCap: number
): number {
    const n = iterationBase + Math.log2(Math.max(1, zoom)) * 1.44269504089 * iterationScale;
    return Math.min(Math.floor(n), iterationCap);
}

/**
 * data[0] = X₀, data[k] = Xₖ (last non-escaped or the escaping value). If the reference escapes
 * while computing X_{e+1} from X_e, the escaped value is still written to slot e+1 and
 * referenceIterations = e + 2, so the shader's "i+1 < referenceIterations" holds for the escaping
 * step and zFull = X_{e+1} + dz is exact.
 */
export function computeReferenceOrbit(
    centerRe: number,
    centerIm: number,
    maxIterations: number,
    bailoutSquared = 65536.0
): ReferenceOrbit {
    // Allocate one extra slot so we can always store the escaping value.
    const capacity = maxIterations + 1;
    const data = new Float32Array(capacity * 2);

    let zr = 0.0;
    let zi = 0.0;
    let referenceIterations = maxIterations; // default: never escaped

    data[0] = 0.0;
    data[1] = 0.0;

    for (let i = 0; i < maxIterations; i++) {
        const nextZr = zr * zr - zi * zi + centerRe;
        const nextZi = 2.0 * zr * zi + centerIm;

        data[(i + 1) * 2] = nextZr;
        data[(i + 1) * 2 + 1] = nextZi;

        zr = nextZr;
        zi = nextZi;

        if (zr * zr + zi * zi > bailoutSquared) {
            referenceIterations = i + 2;
            break;
        }
    }

    const orbitLength = Math.min(capacity, Math.max(referenceIterations, maxIterations));

    const used = Math.min(orbitLength, referenceIterations);
    return {
        data: data.subarray(0, used * 2),
        orbitLength: used,
        referenceIterations: used
    };
}

// Offset ~2-3 px in the complex plane: still useful for the view, but less likely to hit the same glitch.
export function computeSecondaryOrbit(
    centerRe: number,
    centerIm: number,
    scale: number, // 3 / zoom
    maxIterations: number,
    bailoutSquared = 65536.0
): ReferenceOrbit {
    // ~2.5 pixels offset, rotated so it is not axis-aligned
    const offset = scale * 2.5;
    const re = centerRe + offset * 0.7;
    const im = centerIm + offset * 0.7;
    return computeReferenceOrbit(re, im, maxIterations, bailoutSquared);
}
