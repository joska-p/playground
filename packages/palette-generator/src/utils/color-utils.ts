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

export function oklchToOklab(lightness: number, chroma: number, hueDegrees: number) {
  const hueRadians = (hueDegrees * Math.PI) / 180;
  const a = chroma * Math.cos(hueRadians);
  const b = chroma * Math.sin(hueRadians);
  return { lightness, a, b };
}

export function oklchTo8bit(lightness: number, chroma: number, hueDegrees: number): [number, number, number] {
  const { a, b } = oklchToOklab(lightness, chroma, hueDegrees);
  return oklabTo8bit(lightness, a, b);
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}
