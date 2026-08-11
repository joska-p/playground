/**
 * High-precision reference orbit for the perturbation renderer.
 *
 * Perturbation theory factors every pixel's orbit as Z_n = X_n + dz_n, where X_0 = 0, X_{n+1} =
 * X_n^2 + C_ref, and C_ref is the view center. X is computed once on the CPU in float64 and
 * streamed to the GPU as a float32 data texture; per-pixel deltas then iterate in double-single
 * (DS) on the GPU.
 *
 * PRECISION LIMITS (do not exceed silently):
 *
 * - Float64 gives ~15-16 significant digits, so centers are only trustworthy to ~1e15–1e16 zoom. For
 *   true 1e100 zoom, swap the float64 math here for a BigInt / decimal.js implementation, keeping
 *   this module's output shape (an interleaved Float32Array of (Xr, Xi) pairs for the GPU
 *   texture).
 * - The GPU delta loop now uses double-single (~48-bit mantissa). This pushes the practical floor for
 *   the per-pixel offset from ~1e7–1e8 (plain float32) to roughly 1e14–1e15 relative to the
 *   reference, provided the centre itself is still accurate. The float32 `u_camera.z` uniform
 *   (glaze's zoom built-in) still overflows past ~3.4e38.
 * - Reaching 1e100 also requires a scaled / regioned perturbation scheme or a full multiprecision
 *   reference, not just DS deltas.
 *
 * GLITCH NOTE: pixels that stay inside past `referenceIterations` (the iteration where the
 * reference escaped) cannot be resolved from a single reference orbit and render as interior.
 * Glitch detection / additional reference orbits are future work.
 */
export type ReferenceOrbit = {
    /** Interleaved float32 pairs [X0r, X0i, X1r, X1i, ...] — one RG texel per iteration. */
    data: Float32Array;
    /** Texture width / loop bound: total iterations the orbit was computed for. */
    orbitLength: number;
    /**
     * Number of valid texels. When the reference escapes we now also store the escaping value
     * itself, so referenceIterations = escapeIndex + 2 and the shader can always form Z = X_{i+1} +
     * dz exactly while data is available. When the reference never escapes, referenceIterations ==
     * orbitLength.
     */
    referenceIterations: number;
};

/**
 * Mirrors the loop-count formula baked into mandelbrot.glsl (DS shader) so the CPU orbit texture
 * and the shader's loop never disagree on the iteration count.
 */
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
 * Compute the reference orbit.
 *
 * Storage layout (important for the DS shader): data[0] = X₀ = 0 data[1] = X₁ … data[k] = Xₖ (last
 * non-escaped or the escaping value)
 *
 * If the reference escapes while computing X_{e+1} from X_e we still write the (large) escaped
 * value into the next slot and set referenceIterations = e + 2 so the shader’s “i+1 <
 * referenceIterations” test succeeds for the escaping step and zFull = X_{e+1} + dz is exact.
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

    // Store X₀
    data[0] = 0.0;
    data[1] = 0.0;

    for (let i = 0; i < maxIterations; i++) {
        // Advance: X_{i+1} = Xᵢ² + C
        const nextZr = zr * zr - zi * zi + centerRe;
        const nextZi = 2.0 * zr * zi + centerIm;

        // Always store the newly computed value (even if it has already escaped).
        // Slot index = i+1
        data[(i + 1) * 2] = nextZr;
        data[(i + 1) * 2 + 1] = nextZi;

        zr = nextZr;
        zi = nextZi;

        if (zr * zr + zi * zi > bailoutSquared) {
            // We have stored X₀ … X_{i+1}.  The escape happened on the transition
            // from X_i → X_{i+1}.  referenceIterations = i+2 means the shader may
            // legally fetch texel (i+1) when reconstructing zFull for step i.
            referenceIterations = i + 2;
            break;
        }
    }

    // orbitLength is the texture width the shader will bind.
    // We never need more than referenceIterations texels, but we keep the
    // original maxIterations as an upper bound for the loop guard.
    const orbitLength = Math.min(capacity, Math.max(referenceIterations, maxIterations));

    // If we never escaped, referenceIterations stays at maxIterations and the
    // last stored value is X_maxIterations (index maxIterations).
    // The returned data view can be trimmed to the actually used length.
    const used = Math.min(orbitLength, referenceIterations);
    return {
        data: data.subarray(0, used * 2),
        orbitLength: used,
        referenceIterations: used
    };
}

/**
 * Compute a second reference a small distance away from the primary. The offset is ~2–3 pixels in
 * complex plane so it is still useful for the current view but statistically less likely to hit the
 * same glitch-prone location.
 */
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
