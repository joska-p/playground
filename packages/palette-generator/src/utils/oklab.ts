// utilities for OKLab -> sRGB conversion (small, testable functions)

/**
 * Convert OKLab (L, a, b) to intermediate LMS-like values (before cube).
 * Uses Oklab reference matrix coefficients.
 */
export function oklabToLMSprime(L: number, a: number, b: number) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  return { l_: l_, m_: m_, s_: s_ };
}

/** cube (x^3) helper */
export const cube = (x: number) => x * x * x;

/** Convert cubed LMS -> linear sRGB using Oklab inverse matrix */
export function lmsToLinearSRGB(l: number, m: number, s: number): [number, number, number] {
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return [r, g, b];
}

/** linear sRGB -> gamma-corrected sRGB 0..1 */
export function linearToSRGBGamma(c: number) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

/** Clip to [0,1] */
export const clip01 = (v: number) => Math.min(Math.max(v, 0), 1);

/** Convenience: full pipeline OKLab -> [0..255,0..255,0..255] with simple clipping */
export function oklabTo8bit(L: number, a: number, b: number): [number, number, number] {
  const { l_: l_, m_: m_, s_: s_ } = oklabToLMSprime(L, a, b);
  const l = cube(l_),
    m = cube(m_),
    s = cube(s_);
  let [rLin, gLin, bLin] = lmsToLinearSRGB(l, m, s);

  // simple gamut clipping
  rLin = clip01(rLin);
  gLin = clip01(gLin);
  bLin = clip01(bLin);

  const r = Math.round(255 * linearToSRGBGamma(rLin));
  const g = Math.round(255 * linearToSRGBGamma(gLin));
  const bl = Math.round(255 * linearToSRGBGamma(bLin));
  return [r, g, bl];
}
