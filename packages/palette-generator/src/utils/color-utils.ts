/**
 * Shared constants and functions for OKLab/OKLCH to sRGB conversion.
 */

export const PRE_L_A = 0.3963377774;
export const PRE_L_B = 0.2158037573;
export const PRE_M_A = -0.1055613458;
export const PRE_M_B = -0.0638541728;
export const PRE_S_A = -0.0894841775;
export const PRE_S_B = -1.291485548;

export const LMS_TO_LINEAR_R_L = 4.0767416621;
export const LMS_TO_LINEAR_R_M = -3.3077115913;
export const LMS_TO_LINEAR_R_S = 0.2309699292;

export const LMS_TO_LINEAR_G_L = -1.2684380046;
export const LMS_TO_LINEAR_G_M = 2.6097574011;
export const LMS_TO_LINEAR_G_S = -0.3413193965;

export const LMS_TO_LINEAR_B_L = -0.0041960863;
export const LMS_TO_LINEAR_B_M = -0.7034186147;
export const LMS_TO_LINEAR_B_S = 1.707614701;

export const SRGB_LINEAR_THRESHOLD = 0.0031308;
export const SRGB_LINEAR_SCALE = 12.92;
export const SRGB_POWER_A = 1.055;
export const SRGB_POWER_GAMMA = 1 / 2.4;
export const SRGB_POWER_B = 0.055;

export const cube = (x: number) => x * x * x;
export const clip01 = (v: number) => Math.min(Math.max(v, 0), 1);

export function linearToSRGBGamma(channel: number) {
  return channel <= SRGB_LINEAR_THRESHOLD
    ? SRGB_LINEAR_SCALE * channel
    : SRGB_POWER_A * Math.pow(channel, SRGB_POWER_GAMMA) - SRGB_POWER_B;
}

export function lmsToLinearSRGB(l: number, m: number, s: number): [number, number, number] {
  const linearR = LMS_TO_LINEAR_R_L * l + LMS_TO_LINEAR_R_M * m + LMS_TO_LINEAR_R_S * s;
  const linearG = LMS_TO_LINEAR_G_L * l + LMS_TO_LINEAR_G_M * m + LMS_TO_LINEAR_G_S * s;
  const linearB = LMS_TO_LINEAR_B_L * l + LMS_TO_LINEAR_B_M * m + LMS_TO_LINEAR_B_S * s;
  return [linearR, linearG, linearB];
}

export function oklabToPreCubeLMS(lightness: number, a: number, b: number) {
  const preL = lightness + PRE_L_A * a + PRE_L_B * b;
  const preM = lightness + PRE_M_A * a + PRE_M_B * b;
  const preS = lightness + PRE_S_A * a + PRE_S_B * b;
  return { preL, preM, preS };
}

export function oklabTo8bit(lightness: number, a: number, b: number): [number, number, number] {
  const { preL, preM, preS } = oklabToPreCubeLMS(lightness, a, b);
  const l = cube(preL);
  const m = cube(preM);
  const s = cube(preS);

  let [r, g, bl] = lmsToLinearSRGB(l, m, s);
  r = clip01(r);
  g = clip01(g);
  bl = clip01(bl);

  return [
    Math.round(255 * linearToSRGBGamma(r)),
    Math.round(255 * linearToSRGBGamma(g)),
    Math.round(255 * linearToSRGBGamma(bl)),
  ];
}

export function oklchToOklab(
  lightness: number,
  chroma: number,
  hueDegrees: number
): { lightness: number; a: number; b: number } {
  const hueRadians = (hueDegrees * Math.PI) / 180;
  const a = chroma * Math.cos(hueRadians);
  const b = chroma * Math.sin(hueRadians);
  return { lightness, a, b };
}

export function oklabToOklch(
  lightness: number,
  a: number,
  b: number
): { lightness: number; chroma: number; hueDegrees: number } {
  const chroma = Math.sqrt(a * a + b * b);
  let hueDegrees = (Math.atan2(b, a) * 180) / Math.PI;
  if (hueDegrees < 0) hueDegrees += 360;
  return { lightness, chroma, hueDegrees };
}

export function oklchTo8bit(
  lightness: number,
  chroma: number,
  hueDegrees: number
): [number, number, number] {
  const { a, b } = oklchToOklab(lightness, chroma, hueDegrees);
  return oklabTo8bit(lightness, a, b);
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

// ---------------------------------------------------------------------------
// PickResult — the canonical color object returned by the color picker
// ---------------------------------------------------------------------------

/**
 * All string values use CSS Color Level 4 modern syntax (space-separated, no commas).
 *
 * hex    "#1f7832"
 * rgb    "rgb(31 120 50)"
 * oklab  "oklab(0.75 -0.10 0.08)"
 * oklch  "oklch(0.75 0.13 141.2)"
 */
export type PickResult = {
  hex: string;
  rgb: string;
  oklab: string;
  oklch: string;
};

function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

function toRgbString(r: number, g: number, b: number): string {
  return `rgb(${r} ${g} ${b})`;
}

function toOklabString(lightness: number, a: number, b: number): string {
  return `oklab(${round(lightness, 4)} ${round(a, 4)} ${round(b, 4)})`;
}

function toOklchString(lightness: number, chroma: number, hueDegrees: number): string {
  return `oklch(${round(lightness, 4)} ${round(chroma, 4)} ${round(hueDegrees, 2)})`;
}

/**
 * Build a PickResult from OKLab coordinates.
 * Use this in useCanvasSlice when the active colorspace is oklab.
 */
export function oklabToPickResult(lightness: number, a: number, b: number): PickResult {
  const [r, g, b8] = oklabTo8bit(lightness, a, b);
  const { chroma, hueDegrees } = oklabToOklch(lightness, a, b);

  return {
    hex: rgbToHex(r, g, b8),
    rgb: toRgbString(r, g, b8),
    oklab: toOklabString(lightness, a, b),
    oklch: toOklchString(lightness, chroma, hueDegrees),
  };
}

/**
 * Build a PickResult from OKLCH coordinates.
 * Use this in useCanvasSlice when the active colorspace is oklch.
 */
export function oklchToPickResult(
  lightness: number,
  chroma: number,
  hueDegrees: number
): PickResult {
  const { a, b } = oklchToOklab(lightness, chroma, hueDegrees);
  const [r, g, b8] = oklabTo8bit(lightness, a, b);

  return {
    hex: rgbToHex(r, g, b8),
    rgb: toRgbString(r, g, b8),
    oklab: toOklabString(lightness, a, b),
    oklch: toOklchString(lightness, chroma, hueDegrees),
  };
}
