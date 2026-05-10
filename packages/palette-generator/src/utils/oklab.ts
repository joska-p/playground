/**
 * Oklab helper (no external deps)
 *
 * - srgb inputs/outputs are in 0..1
 * - Oklab L is expressed in 0..100 (public-facing)
 *
 * Place at: packages/palette-generator/src/utils/oklab.ts
 */

export type Oklab = { L: number; a: number; b: number };

/* sRGB <-> linear helpers */
function srgbToLinear(c: number): number {
  // c in [0,1]
  if (c <= 0.04045) return c / 12.92;
  return Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  // c in linear space
  if (c <= 0.0031308) return c * 12.92;
  return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

/* srgb (0..1) -> Oklab (L in 0..100) */
export function srgbToOklab(r: number, g: number, b: number): Oklab {
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);

  // linear RGB -> LMS
  const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
  const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
  const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;

  // non-linearity
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // LMS -> Oklab
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const ok_b = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  return { L: L * 100, a, b: ok_b };
}

/* Oklab (L 0..100) -> srgb (0..1) */
export function oklabToSrgb(L_in: number, a: number, b: number) {
  const L = L_in / 100;

  // Oklab -> LMS'
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  // cube
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // LMS -> linear sRGB
  const Rlin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const Glin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const Blin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // linear -> srgb (0..1)
  const r = clamp01(linearToSrgb(Rlin));
  const g = clamp01(linearToSrgb(Glin));
  const bOut = clamp01(linearToSrgb(Blin));

  return { r, g, b: bOut };
}

/* tiny gamut check */
export function isInGamutRgb(r: number, g: number, b: number): boolean {
  return r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1;
}
