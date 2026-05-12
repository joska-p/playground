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

export function oklabToRgb(lightness: number, a: number, b: number): [number, number, number] {
  const { preL, preM, preS } = oklabToPreCubeLMS(lightness, a, b);
  const l = cube(preL);
  const m = cube(preM);
  const s = cube(preS);

  let [red, green, blue] = lmsToLinearSRGB(l, m, s);
  red = clip01(red);
  green = clip01(green);
  blue = clip01(blue);

  return [
    Math.round(255 * linearToSRGBGamma(red)),
    Math.round(255 * linearToSRGBGamma(green)),
    Math.round(255 * linearToSRGBGamma(blue)),
  ];
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

export function oklchToRgb(
  lightness: number,
  chroma: number,
  hueDegrees: number
): [number, number, number] {
  const { a, b } = oklchToOklab(lightness, chroma, hueDegrees);
  return oklabToRgb(lightness, a, b);
}

export function rgbToHex(red: number, green: number, blue: number): string {
  return "#" + [red, green, blue].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function rgbToHsl(r: number, g: number, b: number) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100),
  };
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): { red: number; green: number; blue: number } {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) => lNorm - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return {
    red: Math.round(255 * f(0)),
    green: Math.round(255 * f(8)),
    blue: Math.round(255 * f(4)),
  };
}

export function rgbToHsv(r: number, g: number, b: number) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    value: Math.round(v * 100),
  };
}

export function hsvToRgb(
  h: number,
  s: number,
  v: number
): { red: number; green: number; blue: number } {
  // Normalize Saturation and Value to 0-1
  const sNorm = s / 100;
  const vNorm = v / 100;

  const c = vNorm * sNorm; // Chroma
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vNorm - c;

  let rPrime = 0,
    gPrime = 0,
    bPrime = 0;

  if (h >= 0 && h < 60) {
    [rPrime, gPrime, bPrime] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [rPrime, gPrime, bPrime] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [rPrime, gPrime, bPrime] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [rPrime, gPrime, bPrime] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [rPrime, gPrime, bPrime] = [x, 0, c];
  } else if (h >= 300 && h <= 360) {
    [rPrime, gPrime, bPrime] = [c, 0, x];
  }

  return {
    red: Math.round((rPrime + m) * 255),
    green: Math.round((gPrime + m) * 255),
    blue: Math.round((bPrime + m) * 255),
  };
}

// ---------------------------------------------------------------------------
// PickResult — the canonical color object returned by the color picker
// ---------------------------------------------------------------------------

/**
 * All string values use CSS Color Level 4 modern syntax (space-separated, no commas).
 *
 * hex    "#1f7832"
 * rgb    "rgb(31 120 50)"
 * hsl    "hsl(140 50% 30%)"
 * hsv    "hsv(140 50% 30%)"
 * oklab  "oklab(0.75 -0.10 0.08)"
 * oklch  "oklch(0.75 0.13 141.2)"
 */
export type PickResult = {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  oklab: string;
  oklch: string;
};

function round(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

function toRgbString(red: number, green: number, blue: number): string {
  return `rgb(${red} ${green} ${blue})`;
}

function toHslString(hue: number, saturation: number, lightness: number): string {
  return `hsl(${hue} ${saturation} ${lightness})`;
}

function toHsvString(hue: number, saturation: number, value: number): string {
  return `hsv(${hue} ${saturation} ${value})`;
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
  const [red, green, blue] = oklabToRgb(lightness, a, b);
  const { chroma, hueDegrees } = oklabToOklch(lightness, a, b);

  return {
    hex: rgbToHex(red, green, blue),
    rgb: toRgbString(red, green, blue),
    hsl: toHslString(red, green, blue),
    hsv: toHsvString(red, green, blue),
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
  const [red, green, blue] = oklabToRgb(lightness, a, b);

  return {
    hex: rgbToHex(red, green, blue),
    rgb: toRgbString(red, green, blue),
    hsl: toHslString(red, green, blue),
    hsv: toHsvString(red, green, blue),
    oklab: toOklabString(lightness, a, b),
    oklch: toOklchString(lightness, chroma, hueDegrees),
  };
}
