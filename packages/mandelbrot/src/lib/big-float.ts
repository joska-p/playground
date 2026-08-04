/**
 * BigFloat: binary fixed-point real numbers backed by BigInt.
 *
 * A value is represented as `m * 2^(-prec)`, where `m` is an arbitrary
 * precision signed integer (BigInt) and `prec` is the number of fractional
 * bits. All BigFloats that interact must share the same `prec`.
 *
 * For Mandelbrot deep-zoom we only need arbitrary precision for a *single*
 * point (the reference orbit center); every per-pixel value stays bounded and
 * lives in ordinary floats on the GPU. That is why fixed-point (rather than a
 * full arbitrary-precision float) is enough here and stays fast: the integer
 * part of every coordinate we care about is tiny (|x| < 2), so the mantissa
 * grows only with zoom depth.
 *
 * No third-party dependencies — just native BigInt.
 */

export type BigFloat = {
  /** Signed mantissa. The real value is `m / 2^prec`. */
  readonly m: bigint
  /** Number of fractional bits. */
  readonly prec: number
}

const ZERO = BigInt(0)
const ONE = BigInt(1)
const TWO = BigInt(2)

/** Arithmetic right shift with round-to-nearest (ties away from zero). */
function shrRound(x: bigint, n: number): bigint {
  if (n <= 0) return x << BigInt(-n)
  const bn = BigInt(n)
  const half = ONE << (bn - ONE)
  if (x >= ZERO) return (x + half) >> bn
  return -((-x + half) >> bn)
}

/** Create a BigFloat from a JS number at the given precision. */
export function fromNumber(value: number, prec: number): BigFloat {
  if (!Number.isFinite(value)) return { m: ZERO, prec }
  // Decompose into integer + fractional using scaling by 2^prec.
  // We build it in chunks to avoid precision loss for large prec.
  const negative = value < 0
  let v = Math.abs(value)
  const intPart = Math.floor(v)
  v -= intPart
  let m = BigInt(intPart) << BigInt(prec)
  // Accumulate fractional bits 30 at a time (safe for double mantissa).
  let shift = 0
  const CHUNK = 30
  while (v > 0 && shift < prec) {
    const take = Math.min(CHUNK, prec - shift)
    v *= 2 ** take
    const bits = Math.floor(v)
    v -= bits
    m += BigInt(bits) << BigInt(prec - shift - take)
    shift += take
  }
  return { m: negative ? -m : m, prec }
}

/** Convert to a JS number (may lose precision, used for display / GPU scale). */
export function toNumber(a: BigFloat): number {
  const neg = a.m < ZERO
  const m = neg ? -a.m : a.m
  // Take the top ~53 significant bits to preserve as much as possible.
  const bits = m.toString(2).length
  const drop = Math.max(0, bits - 53)
  const top = Number(m >> BigInt(drop))
  const value = top * 2 ** (drop - a.prec)
  return neg ? -value : value
}

/** Re-scale a BigFloat to a new precision (grows/shrinks fractional bits). */
export function withPrec(a: BigFloat, prec: number): BigFloat {
  if (a.prec === prec) return a
  return { m: shrRound(a.m, a.prec - prec), prec }
}

function align(a: BigFloat, b: BigFloat): [bigint, bigint, number] {
  if (a.prec === b.prec) return [a.m, b.m, a.prec]
  const prec = Math.max(a.prec, b.prec)
  return [a.m << BigInt(prec - a.prec), b.m << BigInt(prec - b.prec), prec]
}

export function add(a: BigFloat, b: BigFloat): BigFloat {
  const [am, bm, prec] = align(a, b)
  return { m: am + bm, prec }
}

export function sub(a: BigFloat, b: BigFloat): BigFloat {
  const [am, bm, prec] = align(a, b)
  return { m: am - bm, prec }
}

export function mul(a: BigFloat, b: BigFloat): BigFloat {
  const [am, bm, prec] = align(a, b)
  return { m: shrRound(am * bm, prec), prec }
}

/** Multiply by a small integer (exact, cheap). */
export function mulInt(a: BigFloat, k: number): BigFloat {
  return { m: a.m * BigInt(k), prec: a.prec }
}

/** a * 2^k (exact, cheap) — used for zoom scaling. */
export function scale2(a: BigFloat, k: number): BigFloat {
  if (k >= 0) return { m: a.m << BigInt(k), prec: a.prec }
  return { m: shrRound(a.m, -k), prec: a.prec }
}

export function cmp(a: BigFloat, b: BigFloat): number {
  const [am, bm] = align(a, b)
  return am < bm ? -1 : am > bm ? 1 : 0
}

export function zero(prec: number): BigFloat {
  return { m: ZERO, prec }
}

/** Squared magnitude |x + iy|^2 as a JS number (values here are bounded). */
export function magSq(x: BigFloat, y: BigFloat): number {
  const xn = toNumber(x)
  const yn = toNumber(y)
  return xn * xn + yn * yn
}

export { TWO as _TWO }
