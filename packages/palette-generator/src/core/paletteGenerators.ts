import type { HSLColor, RGBColor } from "../utils/colorConversions.js";
import type { Palette } from "./config.js";
import { HSLToRGB, RGBToHSL, hexToRGB, contrastRatioRgb } from "../utils/colorConversions.js";
import { srgbToOklab, oklabToSrgb, isInGamutRgb } from "../utils/oklab.js";
import type { Oklab } from "../utils/oklab.js";

const MIN_LIGHTNESS = 5;
const MAX_LIGHTNESS = 95;

type SchemeType =
  | "monochromatic"
  | "analogous"
  | "complementary"
  | "split-complementary"
  | "triadic"
  | "tetradic";

type GeneratorParams = {
  scheme: SchemeType;
  count: number;
  angle: number;
  lightnessSpread: number;
  // Optional accessibility: ensure each swatch meets a minimum contrast ratio against a background color
  ensureContrast?: { min: number; against?: string };
};

function normHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/* generate a set of hues (in HSL degrees) using existing logic */
function generateHues(scheme: SchemeType, baseHue: number, count: number, angle: number): number[] {
  const half = Math.floor(count / 2);

  switch (scheme) {
    case "monochromatic":
      return Array.from({ length: count }, () => baseHue);

    case "analogous": {
      const hues: number[] = [];
      for (let i = -half; i < count - half; i++) {
        hues.push(normHue(baseHue + i * angle));
      }
      return hues;
    }

    case "complementary": {
      const comp = normHue(baseHue + 180);
      if (count <= 2) return [baseHue, comp];

      const hues: number[] = [baseHue];
      for (let i = 1; i < count - 1; i++) {
        const t = i / (count - 1);
        const h = normHue(baseHue + t * 180);
        if (h !== hues[hues.length - 1]) hues.push(h);
      }
      hues.push(comp);
      return hues;
    }

    case "split-complementary": {
      const comp = normHue(baseHue + 180);
      const hues = [normHue(comp - angle), baseHue, normHue(comp + angle)];
      if (count <= 3) return hues;

      const result: number[] = [];
      for (let i = 0; i < count; i++) {
        result.push(hues[i % hues.length]!);
      }
      return result;
    }

    case "triadic": {
      const hues = [baseHue, normHue(baseHue + 120), normHue(baseHue + 240)];
      if (count <= 3) return hues;

      const result: number[] = [];
      for (let i = 0; i < count; i++) {
        result.push(hues[i % hues.length]!);
      }
      return result;
    }

    case "tetradic": {
      const hues = [
        baseHue,
        normHue(baseHue + angle),
        normHue(baseHue + 180),
        normHue(baseHue + 180 + angle),
      ];
      if (count <= 4) return hues;

      const result: number[] = [];
      for (let i = 0; i < count; i++) {
        result.push(hues[i % hues.length]!);
      }
      return result;
    }

    default:
      return [];
  }
}

function varyLightness(
  index: number,
  count: number,
  baseLightness: number,
  spread: number
): number {
  if (count <= 1) return clamp(baseLightness, MIN_LIGHTNESS, MAX_LIGHTNESS);
  const step = spread / (count - 1);
  return clamp(baseLightness - spread / 2 + index * step, MIN_LIGHTNESS, MAX_LIGHTNESS);
}

/* Small numeric helpers */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* reduce chroma (scale a,b) until color fits in sRGB gamut */
function reduceChromaUntilGamut(ok: Oklab, maxIterations = 20): Oklab {
  const { L } = ok;
  const { a, b } = ok;

  // quick check
  const initialRgb = oklabToSrgb(L, a, b);
  if (isInGamutRgb(initialRgb.r, initialRgb.g, initialRgb.b)) return ok;

  // progressively reduce chroma
  for (let i = 1; i <= maxIterations; i++) {
    const factor = Math.pow(0.85, i); // geometric decay
    const aa = a * factor;
    const bb = b * factor;
    const rgb = oklabToSrgb(L, aa, bb);
    if (isInGamutRgb(rgb.r, rgb.g, rgb.b)) {
      return { L, a: aa, b: bb };
    }
  }

  // last resort: clamp to zero chroma (neutral gray at same L)
  return { L, a: 0, b: 0 };
}

/* Try to adjust L (only) to meet a contrast target against a background; returns an Oklab in-gamut candidate. */
function adjustLForContrast(orig: Oklab, ensure?: { min: number; against?: string }) {
  if (!ensure) return { ok: orig, adjusted: false };

  const minRatio = ensure.min;
  const againstHex = ensure.against ?? "#ffffff";

  // background rgb ints 0..255
  let bgRgb: RGBColor = { red: 255, green: 255, blue: 255 };
  try {
    bgRgb = hexToRGB(againstHex);
  } catch {
    // keep default white background if parsing fails
  }

  // quick test for current L
  const testCandidate = (Ltrial: number) => {
    const reduced = reduceChromaUntilGamut({ L: Ltrial, a: orig.a, b: orig.b });
    const srgb = oklabToSrgb(reduced.L, reduced.a, reduced.b);
    const rgbInt = {
      red: Math.round(Math.min(255, Math.max(0, srgb.r * 255))),
      green: Math.round(Math.min(255, Math.max(0, srgb.g * 255))),
      blue: Math.round(Math.min(255, Math.max(0, srgb.b * 255))),
    };
    const ratio = contrastRatioRgb(rgbInt, bgRgb);
    return { ratio, reduced };
  };

  const current = testCandidate(orig.L);
  if (current.ratio >= minRatio) return { ok: current.reduced, adjusted: false };

  const blackTest = testCandidate(0);
  const whiteTest = testCandidate(100);

  // choose side (0 or 100) that gives better contrast
  const targetL = blackTest.ratio >= whiteTest.ratio ? 0 : 100;
  const targetTest = targetL === 0 ? blackTest : whiteTest;
  if (targetTest.ratio < minRatio) {
    // cannot reach threshold even at extreme; return best effort
    return { ok: targetTest.reduced, adjusted: true };
  }

  // binary search between orig.L and targetL
  const eps = 0.1; // precision in L
  if (targetL > orig.L) {
    // increase L until ratio >= min
    let low = orig.L;
    let high = targetL;
    let lastOk = current.reduced;
    for (let i = 0; i < 24 && high - low > eps; i++) {
      const mid = (low + high) / 2;
      const midTest = testCandidate(mid);
      if (midTest.ratio < minRatio) {
        low = mid;
      } else {
        high = mid;
        lastOk = midTest.reduced;
      }
    }
    return { ok: lastOk, adjusted: true };
  } else {
    // decrease L until ratio >= min
    let low = targetL;
    let high = orig.L;
    let lastOk = current.reduced;
    for (let i = 0; i < 24 && high - low > eps; i++) {
      const mid = (low + high) / 2;
      const midTest = testCandidate(mid);
      if (midTest.ratio < minRatio) {
        high = mid;
      } else {
        low = mid;
        lastOk = midTest.reduced;
      }
    }
    return { ok: lastOk, adjusted: true };
  }
}

/**
 * Generate a palette from a base HSL color using existing scheme generation,
 * but perform interpolation in Oklab (perceptual) space for nicer perceptual steps.
 */
function generatePalette(baseColor: HSLColor, params: GeneratorParams): Palette {
  const hues = generateHues(params.scheme, baseColor.hue, params.count, params.angle);

  const colors = hues.map((hue, i) => ({
    hue,
    saturation: baseColor.saturation,
    lightness:
      params.scheme === "monochromatic"
        ? varyLightness(i, params.count, baseColor.lightness, params.lightnessSpread)
        : baseColor.lightness,
  }));

  // interpolate perceptually in Oklab
  return interpolatePalette(colors, params.count, params);
}

/**
 * Interpolate between HSL colors but do the interpolation in Oklab space.
 * Returns a Palette with HSLColor entries (compatible with existing UI).
 */
function interpolatePalette(colors: HSLColor[], count: number, params?: GeneratorParams): Palette {
  if (colors.length === 0) return { id: "0", colors: [] };
  if (colors.length === 1)
    return { id: "1", colors: Array.from({ length: count }, () => ({ ...colors[0]! })) };
  if (count <= colors.length) return { id: "2", colors: colors.slice(0, count) };

  const paletteId = `palette-${colors.reduce((acc, color) => acc + color.hue, 0)}`;
  const palette: Palette = { id: paletteId, colors: [] };
  const segments = colors.length - 1;

  // pre-convert endpoint HSLs into Oklab
  const oklabEndpoints: Oklab[] = colors.map((c) => {
    const rgb = HSLToRGB(c); // returns 0..255 ints
    const sr = rgb.red / 255;
    const sg = rgb.green / 255;
    const sb = rgb.blue / 255;
    return srgbToOklab(sr, sg, sb);
  });

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const segIndex = Math.min(Math.floor(t * segments), segments - 1);
    const localT = t * segments - segIndex;

    const aOk = oklabEndpoints[segIndex]!;
    const bOk = oklabEndpoints[segIndex + 1]!;

    // linear interpolation in Oklab components
    const L = lerp(aOk.L, bOk.L, localT);
    const aa = lerp(aOk.a, bOk.a, localT);
    const bb = lerp(aOk.b, bOk.b, localT);

    // reduce chroma if needed to keep conversion in-gamut
    let adjusted = reduceChromaUntilGamut({ L, a: aa, b: bb });

    // optional contrast adjustment (mutates L and possibly a/b via gamut-reduction)
    if (params?.ensureContrast) {
      const adjustedContrast = adjustLForContrast(adjusted, params.ensureContrast);
      adjusted = adjustedContrast.ok;
      // we won't store metadata in the Palette object to avoid changing UI shapes;
      // the adjusted color is used directly.
    }

    // convert Oklab -> srgb -> integer RGB -> HSL (UI friendly)
    const srgb = oklabToSrgb(adjusted.L, adjusted.a, adjusted.b);
    const rgbInt = {
      red: Math.round(Math.min(255, Math.max(0, srgb.r * 255))),
      green: Math.round(Math.min(255, Math.max(0, srgb.g * 255))),
      blue: Math.round(Math.min(255, Math.max(0, srgb.b * 255))),
    };

    const hsl = RGBToHSL(rgbInt);

    palette.colors.push(hsl);
  }

  return palette;
}

const SCHEME_LABELS: Record<SchemeType, string> = {
  monochromatic: "Monochromatic",
  analogous: "Analogous",
  complementary: "Complementary",
  "split-complementary": "Split-Comp",
  triadic: "Triadic",
  tetradic: "Tetradic",
};

const SCHEME_DEFAULTS: Record<SchemeType, Pick<GeneratorParams, "angle" | "lightnessSpread">> = {
  monochromatic: { angle: 30, lightnessSpread: 40 },
  analogous: { angle: 30, lightnessSpread: 40 },
  complementary: { angle: 30, lightnessSpread: 40 },
  "split-complementary": { angle: 30, lightnessSpread: 40 },
  triadic: { angle: 30, lightnessSpread: 40 },
  tetradic: { angle: 60, lightnessSpread: 40 },
};

export type { SchemeType, GeneratorParams };
export { SCHEME_LABELS, SCHEME_DEFAULTS, generatePalette, generateHues, interpolatePalette };
