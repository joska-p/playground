/**
 * High-precision reference orbit for the perturbation renderer.
 *
 * Perturbation theory factors every pixel's orbit as Z_n = X_n + dz_n, where
 * X_0 = 0, X_{n+1} = X_n^2 + C_ref, and C_ref is the view center. X is computed
 * once on the CPU in float64 and streamed to the GPU as a float32 data texture;
 * per-pixel deltas then iterate in plain `highp float`.
 *
 * PRECISION LIMITS (do not exceed silently):
 * - float64 gives ~15-16 significant digits, so centers are only trustworthy to
 *   ~1e15 zoom. For true 1e100 zoom, swap the float64 math here for a BigInt /
 *   decimal.js implementation, keeping this module's output shape (an interleaved
 *   Float32Array of (Xr, Xi) pairs for the GPU texture).
 * - The GPU delta loop itself is float32; its practical floor for the per-pixel
 *   offset is ~1e28, and the float32 `u_zoom` uniform overflows past ~3.4e38.
 *   Reaching 1e100 also requires upgrading the GPU delta math (double-single
 *   delta, or a scaled / regioned perturbation scheme), not just this orbit.
 *
 * GLITCH NOTE: pixels that stay inside past `referenceIterations` (the iteration
 * where the reference escaped) cannot be resolved from a single reference orbit
 * and render as interior. Glitch detection / additional reference orbits are
 * future work.
 */
export type ReferenceOrbit = {
  /** Interleaved float32 pairs [X0r, X0i, X1r, X1i, ...] — one RG texel per iteration. */
  data: Float32Array;
  /** Texture width / loop bound: total iterations the orbit was computed for. */
  orbitLength: number;
  /**
   * Number of valid texels. Equals `escapeIndex + 1` when the reference escaped,
   * otherwise `orbitLength`. The shader stops looping here, so the escaping term
   * itself is still reachable by pixels that diverge with the reference.
   */
  referenceIterations: number;
};

/**
 * Mirrors the loop-count formula baked into mandelbrot.glsl (DS shader) so the
 * CPU orbit texture and the shader's loop never disagree on the iteration count.
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

export function computeReferenceOrbit(
  centerRe: number,
  centerIm: number,
  maxIterations: number,
  bailoutSquared = 65536.0
): ReferenceOrbit {
  // Store X₀, X₁, X₂, …  (value *before* each update)
  const data = new Float32Array(maxIterations * 2);
  let zr = 0.0;
  let zi = 0.0;
  let referenceIterations = maxIterations;

  for (let i = 0; i < maxIterations; i++) {
    // Store current Xᵢ first
    data[i * 2] = zr;
    data[i * 2 + 1] = zi;

    // Then advance: X_{i+1} = Xᵢ² + C
    const nextZr = zr * zr - zi * zi + centerRe;
    zi = 2.0 * zr * zi + centerIm;
    zr = nextZr;

    if (zr * zr + zi * zi > bailoutSquared) {
      // We have stored X₀ … Xᵢ. The escape happened on the way to X_{i+1}.
      // referenceIterations = i+1 means the shader may use up to texel i.
      referenceIterations = i + 1;
      break;
    }
  }

  return { data, orbitLength: maxIterations, referenceIterations };
}
