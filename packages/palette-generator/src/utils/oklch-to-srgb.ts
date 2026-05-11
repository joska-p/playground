// Utilities to convert OKLCH (lightness, chroma, hueDegrees) -> 8-bit sRGB.
// Includes OKLCH <-> OKLab helpers and the OKLab -> sRGB pipeline with named constants.

/* ---------------------------
   Mathematical / matrix constants
   --------------------------- */

/**
 * Coefficients for computing pre-cube LMS-like channels from OKLab:
 * preL = lightness + PRE_L_A * greenRedAxis + PRE_L_B * blueYellowAxis
 * (taken from the Oklab definition).
 */
export const PRE_L_A = 0.3963377774;
export const PRE_L_B = 0.2158037573;
export const PRE_M_A = -0.1055613458;
export const PRE_M_B = -0.0638541728;
export const PRE_S_A = -0.0894841775;
export const PRE_S_B = -1.291485548;

/**
 * Inverse matrix coefficients mapping cubed LMS (linear cone-like responses)
 * to linear sRGB channels (rows for R, G, B).
 */
export const LMS_TO_LINEAR_R_L = 4.0767416621;
export const LMS_TO_LINEAR_R_M = -3.3077115913;
export const LMS_TO_LINEAR_R_S = 0.2309699292;

export const LMS_TO_LINEAR_G_L = -1.2684380046;
export const LMS_TO_LINEAR_G_M = 2.6097574011;
export const LMS_TO_LINEAR_G_S = -0.3413193965;

export const LMS_TO_LINEAR_B_L = -0.0041960863;
export const LMS_TO_LINEAR_B_M = -0.7034186147;
export const LMS_TO_LINEAR_B_S = 1.707614701;

/**
 * sRGB transfer (gamma) function constants.
 */
export const SRGB_LINEAR_THRESHOLD = 0.0031308;
export const SRGB_LINEAR_SCALE = 12.92;
export const SRGB_POWER_A = 1.055;
export const SRGB_POWER_GAMMA = 1 / 2.4;
export const SRGB_POWER_B = 0.055;

/* ---------------------------
   Small numeric helpers
   --------------------------- */

/** cube (x^3) helper */
export const cube = (x: number) => x * x * x;

/** Clip numeric value to [0,1] */
export const clip01 = (v: number) => Math.min(Math.max(v, 0), 1);

/* ---------------------------
   OKLCH <-> OKLab helpers
   --------------------------- */

/**
 * Convert OKLCH to OKLab.
 * OKLCH uses polar coordinates for the chromatic components:
 *  - lightness: same as OKLab L
 *  - chroma: radius (distance) from neutral gray in the a/b plane
 *  - hueDegrees: angle in degrees, 0° = positive a (red), 90° = positive b (yellow)
 *
 * Returns { lightness, greenRedAxis, blueYellowAxis } (OKLab a/b as Cartesian).
 */
export function oklchToOklab(lightness: number, chroma: number, hueDegrees: number) {
  const hueRadians = (hueDegrees * Math.PI) / 180;
  const greenRedAxis = chroma * Math.cos(hueRadians);
  const blueYellowAxis = chroma * Math.sin(hueRadians);
  return { lightness, greenRedAxis, blueYellowAxis };
}

/**
 * Convert OKLab to OKLCH.
 * Returns { lightness, chroma, hueDegrees } where hueDegrees is in [0,360).
 * chroma is the Euclidean norm of the chromatic axes.
 */
export function oklabToOklch(lightness: number, greenRedAxis: number, blueYellowAxis: number) {
  const chroma = Math.hypot(greenRedAxis, blueYellowAxis); // sqrt(a^2 + b^2)
  const hueRadians = Math.atan2(blueYellowAxis, greenRedAxis); // returns -PI..PI
  let hueDegrees = (hueRadians * 180) / Math.PI;
  if (hueDegrees < 0) hueDegrees += 360;
  return { lightness, chroma, hueDegrees };
}

/* ---------------------------
   OKLab -> sRGB pipeline (same as earlier, with descriptive names)
   --------------------------- */

/**
 * Convert OKLab (lightness, greenRedAxis, blueYellowAxis) to the pre-cube LMS-like channels.
 * These "pre" channels are linear combinations of OKLab channels that are cubed later
 * to produce linear, cone-like responses (approximation used by Oklab).
 */
export function oklabToPreCubeLMS(lightness: number, greenRedAxis: number, blueYellowAxis: number) {
  const preL = lightness + PRE_L_A * greenRedAxis + PRE_L_B * blueYellowAxis;
  const preM = lightness + PRE_M_A * greenRedAxis + PRE_M_B * blueYellowAxis;
  const preS = lightness + PRE_S_A * greenRedAxis + PRE_S_B * blueYellowAxis;
  return { preL, preM, preS };
}

/**
 * Convert cubed LMS (linear cone-like responses) to linear sRGB channels.
 * The inputs l, m, s are the cubed preL/preM/preS values (i.e., linear cone-like responses).
 * Returned values are linear RGB (not gamma-corrected) and may be outside [0,1].
 */
export function lmsToLinearSRGB(l: number, m: number, s: number): [number, number, number] {
  const linearR = LMS_TO_LINEAR_R_L * l + LMS_TO_LINEAR_R_M * m + LMS_TO_LINEAR_R_S * s;
  const linearG = LMS_TO_LINEAR_G_L * l + LMS_TO_LINEAR_G_M * m + LMS_TO_LINEAR_G_S * s;
  const linearB = LMS_TO_LINEAR_B_L * l + LMS_TO_LINEAR_B_M * m + LMS_TO_LINEAR_B_S * s;
  return [linearR, linearG, linearB];
}

/**
 * Convert a single linear sRGB channel to gamma-corrected sRGB in 0..1.
 * Implements the standard sRGB transfer function.
 */
export function linearToSRGBGamma(channel: number) {
  return channel <= SRGB_LINEAR_THRESHOLD
    ? SRGB_LINEAR_SCALE * channel
    : SRGB_POWER_A * Math.pow(channel, SRGB_POWER_GAMMA) - SRGB_POWER_B;
}

/**
 * Full pipeline: OKLab (lightness, greenRedAxis, blueYellowAxis) -> 8-bit sRGB tuple [R,G,B].
 * Steps:
 *  - compute pre-cube LMS-like channels from OKLab using PRE_* coefficients
 *  - cube them to produce linear cone-like responses (l, m, s)
 *  - convert to linear sRGB with the inverse matrix (LMS_TO_LINEAR_*)
 *  - clip each linear channel to [0,1]
 *  - apply sRGB gamma curve and scale to 0..255, rounding to integers
 */
export function oklabTo8bit(
  lightness: number,
  greenRedAxis: number,
  blueYellowAxis: number
): [number, number, number] {
  const { preL, preM, preS } = oklabToPreCubeLMS(lightness, greenRedAxis, blueYellowAxis);

  const l = cube(preL);
  const m = cube(preM);
  const s = cube(preS);

  let [linearR, linearG, linearB] = lmsToLinearSRGB(l, m, s);

  linearR = clip01(linearR);
  linearG = clip01(linearG);
  linearB = clip01(linearB);

  const R = Math.round(255 * linearToSRGBGamma(linearR));
  const G = Math.round(255 * linearToSRGBGamma(linearG));
  const B = Math.round(255 * linearToSRGBGamma(linearB));

  return [R, G, B];
}

/* ---------------------------
   Convenience: OKLCH -> 8-bit sRGB
   --------------------------- */

/**
 * Convert OKLCH (lightness, chroma, hueDegrees) directly to 8-bit sRGB [R,G,B].
 * Internally converts OKLCH -> OKLab -> sRGB pipeline above.
 */
export function oklchTo8bit(
  lightness: number,
  chroma: number,
  hueDegrees: number
): [number, number, number] {
  const {
    lightness: L,
    greenRedAxis,
    blueYellowAxis,
  } = oklchToOklab(lightness, chroma, hueDegrees);
  return oklabTo8bit(L, greenRedAxis, blueYellowAxis);
}
