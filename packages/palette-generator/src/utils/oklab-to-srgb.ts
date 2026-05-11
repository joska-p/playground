// Utilities to convert OKLab (lightness, greenRedAxis, blueYellowAxis) to 8-bit sRGB.
//
// Numeric constants are extracted and named. Comments explain non-obvious math
// assuming no prior knowledge of OKLab.

////////////////////////////////////////////////////////////////////////////////
// Matrix constants and transfer thresholds
////////////////////////////////////////////////////////////////////////////////

/**
 * Matrix coefficients used to compute the pre-cube LMS-like channels from OKLab.
 * These coefficients come from the Oklab definition: preL = L + c1*a + c2*b, etc.
 * Names indicate the contribution of the a (green–red) and b (blue–yellow) axes.
 */
export const PRE_L_A = 0.3963377774; // preL += PRE_L_A * greenRedAxis
export const PRE_L_B = 0.2158037573; // preL += PRE_L_B * blueYellowAxis

export const PRE_M_A = -0.1055613458; // preM += PRE_M_A * greenRedAxis
export const PRE_M_B = -0.0638541728; // preM += PRE_M_B * blueYellowAxis

export const PRE_S_A = -0.0894841775; // preS += PRE_S_A * greenRedAxis
export const PRE_S_B = -1.291485548; // preS += PRE_S_B * blueYellowAxis

/**
 * Inverse matrix coefficients mapping cubed LMS (linear cone-like responses)
 * to linear sRGB. These are taken from the Oklab -> linear sRGB inverse transform.
 * Each row maps (l, m, s) -> R, G, B respectively.
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
 * sRGB transfer (gamma) function threshold and constants.
 * The sRGB standard uses a linear segment for very small values and a power function otherwise.
 */
export const SRGB_LINEAR_THRESHOLD = 0.0031308;
export const SRGB_LINEAR_SCALE = 12.92;
export const SRGB_POWER_A = 1.055;
export const SRGB_POWER_GAMMA = 1 / 2.4; // exponent used for gamma curve
export const SRGB_POWER_B = 0.055;

////////////////////////////////////////////////////////////////////////////////
// Small helpers and core functions (with descriptive names)
////////////////////////////////////////////////////////////////////////////////

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

/** cube helper (x^3) */
export const cube = (x: number) => x * x * x;

/**
 * Convert cubed LMS (linear cone-like responses) to linear sRGB channels.
 * The inputs l, m, s are the cubed preL/preM/preS values (i.e., linear cone-like responses).
 * The returned values are linear RGB (not gamma-corrected) and may be outside [0,1].
 */
export function lmsToLinearSRGB(l: number, m: number, s: number): [number, number, number] {
  const linearR = LMS_TO_LINEAR_R_L * l + LMS_TO_LINEAR_R_M * m + LMS_TO_LINEAR_R_S * s;
  const linearG = LMS_TO_LINEAR_G_L * l + LMS_TO_LINEAR_G_M * m + LMS_TO_LINEAR_G_S * s;
  const linearB = LMS_TO_LINEAR_B_L * l + LMS_TO_LINEAR_B_M * m + LMS_TO_LINEAR_B_S * s;
  return [linearR, linearG, linearB];
}

/**
 * Convert a single linear sRGB channel to gamma-corrected sRGB in 0..1.
 * Implements the standard sRGB transfer function: linear segment for very small values,
 * power curve elsewhere. See SRGB_* constants above.
 */
export function linearToSRGBGamma(channel: number) {
  return channel <= SRGB_LINEAR_THRESHOLD
    ? SRGB_LINEAR_SCALE * channel
    : SRGB_POWER_A * Math.pow(channel, SRGB_POWER_GAMMA) - SRGB_POWER_B;
}

/** Clip numeric value to [0,1] */
export const clip01 = (v: number) => Math.min(Math.max(v, 0), 1);

////////////////////////////////////////////////////////////////////////////////
// High-level pipeline
////////////////////////////////////////////////////////////////////////////////

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

  // Cube to obtain linear cone-like responses
  const l = cube(preL);
  const m = cube(preM);
  const s = cube(preS);

  // Convert to linear sRGB
  let [linearR, linearG, linearB] = lmsToLinearSRGB(l, m, s);

  // Simple gamut clipping (prevents negative or >1 values before gamma)
  linearR = clip01(linearR);
  linearG = clip01(linearG);
  linearB = clip01(linearB);

  // Gamma-correct and convert to 8-bit integers
  const R = Math.round(255 * linearToSRGBGamma(linearR));
  const G = Math.round(255 * linearToSRGBGamma(linearG));
  const B = Math.round(255 * linearToSRGBGamma(linearB));

  return [R, G, B];
}
