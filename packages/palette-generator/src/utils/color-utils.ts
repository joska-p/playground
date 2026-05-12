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
  const linearRed = LMS_TO_LINEAR_R_L * l + LMS_TO_LINEAR_R_M * m + LMS_TO_LINEAR_R_S * s;
  const linearGreen = LMS_TO_LINEAR_G_L * l + LMS_TO_LINEAR_G_M * m + LMS_TO_LINEAR_G_S * s;
  const linearBlue = LMS_TO_LINEAR_B_L * l + LMS_TO_LINEAR_B_M * m + LMS_TO_LINEAR_B_S * s;
  return [linearRed, linearGreen, linearBlue];
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

  let [linearRed, linearGreen, linearBlue] = lmsToLinearSRGB(l, m, s);
  linearRed = clip01(linearRed);
  linearGreen = clip01(linearGreen);
  linearBlue = clip01(linearBlue);

  return [
    Math.round(255 * linearToSRGBGamma(linearRed)),
    Math.round(255 * linearToSRGBGamma(linearGreen)),
    Math.round(255 * linearToSRGBGamma(linearBlue)),
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

export function rgbToHsl(red: number, green: number, blue: number) {
  const redNorm = red / 255;
  const greenNorm = green / 255;
  const blueNorm = blue / 255;

  const max = Math.max(redNorm, greenNorm, blueNorm);
  const min = Math.min(redNorm, greenNorm, blueNorm);
  const lightness = (max + min) / 2;

  let hue = 0;
  let saturation = 0;

  if (max !== min) {
    const delta = max - min;
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case redNorm:
        hue = (greenNorm - blueNorm) / delta + (greenNorm < blueNorm ? 6 : 0);
        break;
      case greenNorm:
        hue = (blueNorm - redNorm) / delta + 2;
        break;
      case blueNorm:
        hue = (redNorm - greenNorm) / delta + 4;
        break;
    }
    hue /= 6;
  }

  return {
    hue: Math.round(hue * 360),
    saturation: Math.round(saturation * 100),
    lightness: Math.round(lightness * 100),
  };
}

export function hslToRgb(
  hue: number,
  saturation: number,
  lightness: number
): [number, number, number] {
  const saturationNorm = saturation / 100;
  const lightnessNorm = lightness / 100;

  const k = (n: number) => (n + hue / 30) % 12;
  const a = saturationNorm * Math.min(lightnessNorm, 1 - lightnessNorm);
  const f = (n: number) =>
    lightnessNorm - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

export function rgbToHsv(red: number, green: number, blue: number) {
  const redNorm = red / 255;
  const greenNorm = green / 255;
  const blueNorm = blue / 255;

  const max = Math.max(redNorm, greenNorm, blueNorm);
  const min = Math.min(redNorm, greenNorm, blueNorm);
  const delta = max - min;

  let hue = 0;
  const saturation = max === 0 ? 0 : delta / max;
  const value = max;

  if (delta !== 0) {
    switch (max) {
      case redNorm:
        hue = (greenNorm - blueNorm) / delta + (greenNorm < blueNorm ? 6 : 0);
        break;
      case greenNorm:
        hue = (blueNorm - redNorm) / delta + 2;
        break;
      case blueNorm:
        hue = (redNorm - greenNorm) / delta + 4;
        break;
    }
    hue /= 6;
  }

  return {
    hue: Math.round(hue * 360),
    saturation: Math.round(saturation * 100),
    value: Math.round(value * 100),
  };
}

export function hsvToRgb(hue: number, saturation: number, value: number): [number, number, number] {
  const saturationNorm = saturation / 100;
  const valueNorm = value / 100;

  const chroma = valueNorm * saturationNorm;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = valueNorm - chroma;

  let redPrime = 0,
    greenPrime = 0,
    bluePrime = 0;

  if (hue >= 0 && hue < 60) {
    [redPrime, greenPrime, bluePrime] = [chroma, x, 0];
  } else if (hue >= 60 && hue < 120) {
    [redPrime, greenPrime, bluePrime] = [x, chroma, 0];
  } else if (hue >= 120 && hue < 180) {
    [redPrime, greenPrime, bluePrime] = [0, chroma, x];
  } else if (hue >= 180 && hue < 240) {
    [redPrime, greenPrime, bluePrime] = [0, x, chroma];
  } else if (hue >= 240 && hue < 300) {
    [redPrime, greenPrime, bluePrime] = [x, 0, chroma];
  } else if (hue >= 300 && hue <= 360) {
    [redPrime, greenPrime, bluePrime] = [chroma, 0, x];
  }

  return [
    Math.round((redPrime + m) * 255),
    Math.round((greenPrime + m) * 255),
    Math.round((bluePrime + m) * 255),
  ];
}

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
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function toHsvString(hue: number, saturation: number, value: number): string {
  return `hsv(${hue} ${saturation}% ${value}%)`;
}

function toOklabString(lightness: number, a: number, b: number): string {
  return `oklab(${round(lightness, 4)} ${round(a, 4)} ${round(b, 4)})`;
}

function toOklchString(lightness: number, chroma: number, hueDegrees: number): string {
  return `oklch(${round(lightness, 4)} ${round(chroma, 4)} ${round(hueDegrees, 2)})`;
}

/**
 * Build a PickResult from OKLab coordinates.
 */
export function oklabToPickResult(lightness: number, a: number, b: number): PickResult {
  const [red, green, blue] = oklabToRgb(lightness, a, b);
  const { chroma, hueDegrees } = oklabToOklch(lightness, a, b);

  // Corrected: Convert RGB to HSL/HSV values before formatting strings
  const hsl = rgbToHsl(red, green, blue);
  const hsv = rgbToHsv(red, green, blue);

  return {
    hex: rgbToHex(red, green, blue),
    rgb: toRgbString(red, green, blue),
    hsl: toHslString(hsl.hue, hsl.saturation, hsl.lightness),
    hsv: toHsvString(hsv.hue, hsv.saturation, hsv.value),
    oklab: toOklabString(lightness, a, b),
    oklch: toOklchString(lightness, chroma, hueDegrees),
  };
}

/**
 * Build a PickResult from OKLCH coordinates.
 */
export function oklchToPickResult(
  lightness: number,
  chroma: number,
  hueDegrees: number
): PickResult {
  const { a, b } = oklchToOklab(lightness, chroma, hueDegrees);
  const [red, green, blue] = oklabToRgb(lightness, a, b);

  const hsl = rgbToHsl(red, green, blue);
  const hsv = rgbToHsv(red, green, blue);

  return {
    hex: rgbToHex(red, green, blue),
    rgb: toRgbString(red, green, blue),
    hsl: toHslString(hsl.hue, hsl.saturation, hsl.lightness),
    hsv: toHsvString(hsv.hue, hsv.saturation, hsv.value),
    oklab: toOklabString(lightness, a, b),
    oklch: toOklchString(lightness, chroma, hueDegrees),
  };
}
