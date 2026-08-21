// Double-single (hi, lo) pair: value - hi is exact in float64 (hi is a float32),
// so only the residual rounds.
export function splitDouble(value: number): [number, number] {
    const hi = Math.fround(value);
    const lo = Math.fround(value - hi);

    return [hi, lo];
}
