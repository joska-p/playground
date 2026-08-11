/**
 * Splits a float64 into a double-single (hi, lo) pair of float32s:
 *
 * Hi = fround(value), lo = fround(value - hi)
 *
 * Such that hi + lo ≈ value and |lo| ≤ 2⁻²⁴ · |hi|. Together the pair carries ~48 significant bits
 * (~2.8e-15 relative error), which the fragment shader's double-single arithmetic consumes via the
 * `u_centerRe` / `u_centerIm` uniforms (each declared as `vec2(hi, lo)`).
 *
 * `value - hi` is exact in float64 (hi is a float32 and thus exactly representable), so the only
 * rounding introduced is on the residual.
 *
 * @param value The double-precision value to split.
 * @returns A tuple containing the high and low float32 components.
 */
export function splitDouble(value: number): [number, number] {
    const hi = Math.fround(value);
    const lo = Math.fround(value - hi);
    return [hi, lo];
}
