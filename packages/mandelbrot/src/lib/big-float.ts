/**
 * Binary fixed-point real backed by BigInt: `m * 2^-prec`. All values that interact must share the
 * same `prec`.
 */

export type BigFloat = {
    readonly m: bigint;
    readonly prec: number;
};

const ZERO = BigInt(0);
const ONE = BigInt(1);

/** Round-to-nearest shift — truncation would drift across many rescale steps. */
function shrRound(x: bigint, n: number): bigint {
    if (n <= 0) return x << BigInt(-n);
    const bn = BigInt(n);
    const half = ONE << (bn - ONE);
    if (x >= ZERO) return (x + half) >> bn;
    return -((-x + half) >> bn);
}

export function fromNumber(value: number, prec: number): BigFloat {
    if (!Number.isFinite(value)) return { m: ZERO, prec };
    const negative = value < 0;
    let v = Math.abs(value);
    const intPart = Math.floor(v);
    v -= intPart;
    let m = BigInt(intPart) << BigInt(prec);
    // Accumulate the fraction 30 bits at a time: a double mantissa only has 53 exact bits.
    let shift = 0;
    const CHUNK = 30;
    while (v > 0 && shift < prec) {
        const take = Math.min(CHUNK, prec - shift);
        v *= 2 ** take;
        const bits = Math.floor(v);
        v -= bits;
        m += BigInt(bits) << BigInt(prec - shift - take);
        shift += take;
    }
    return { m: negative ? -m : m, prec };
}

/** May lose precision; only for display and GPU scale. */
export function toNumber(a: BigFloat): number {
    const neg = a.m < ZERO;
    const m = neg ? -a.m : a.m;
    // Take the top ~53 significant bits to preserve as much as possible.
    const bits = m.toString(2).length;
    const drop = Math.max(0, bits - 53);
    const top = Number(m >> BigInt(drop));
    const value = top * 2 ** (drop - a.prec);
    return neg ? -value : value;
}

export function withPrec(a: BigFloat, prec: number): BigFloat {
    if (a.prec === prec) return a;
    return { m: shrRound(a.m, a.prec - prec), prec };
}

function align(a: BigFloat, b: BigFloat): [bigint, bigint, number] {
    if (a.prec === b.prec) return [a.m, b.m, a.prec];
    const prec = Math.max(a.prec, b.prec);
    return [a.m << BigInt(prec - a.prec), b.m << BigInt(prec - b.prec), prec];
}

export function add(a: BigFloat, b: BigFloat): BigFloat {
    const [am, bm, prec] = align(a, b);
    return { m: am + bm, prec };
}

export function sub(a: BigFloat, b: BigFloat): BigFloat {
    const [am, bm, prec] = align(a, b);
    return { m: am - bm, prec };
}

export function mul(a: BigFloat, b: BigFloat): BigFloat {
    const [am, bm, prec] = align(a, b);
    return { m: shrRound(am * bm, prec), prec };
}

/** Exact — no rounding, unlike `mul`. */
export function mulInt(a: BigFloat, k: number): BigFloat {
    return { m: a.m * BigInt(k), prec: a.prec };
}

export function zero(prec: number): BigFloat {
    return { m: ZERO, prec };
}
