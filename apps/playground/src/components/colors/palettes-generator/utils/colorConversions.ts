/**
 * colorConversions.ts
 *
 * Pure, project-agnostic color conversion utilities.
 * - Exported names follow the blueprint's named-exports-only rule.
 * - Types use PascalCase naming.
 *
 * These functions are intentionally pure and have no DOM/React dependencies,
 * so they belong in `src/utils/` per the architectural blueprint.
 */

/**
 * RGBColor represents a color in 0..255 integer channels.
 */
export interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

/**
 * HSLColor represents a color with:
 * - hue: 0..360 (degrees)
 * - saturation: 0..100 (percent)
 * - lightness: 0..100 (percent)
 */
export interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
}

/**
 * Convert an RGB color to HSL.
 * Input channels expected in [0, 255]. Output values:
 * - hue in [0, 360]
 * - saturation in [0, 100]
 * - lightness in [0, 100]
 */
export function RGBToHSL({ red, green, blue }: RGBColor): HSLColor {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    // Hue calculation
    if (max === r) {
      h = (g - b) / delta;
    } else if (max === g) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) h += 360;

    // Saturation calculation
    if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
  } else {
    // achromatic
    h = 0;
    s = 0;
  }

  return {
    hue: Math.round(h),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100),
  };
}

/**
 * Helper for HSL -> RGB conversion
 * Given a temporary value p and q and a t component, compute color component.
 */
function hueToRGB(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * Convert HSL to RGB.
 * Input:
 * - hue: 0..360
 * - saturation: 0..100
 * - lightness: 0..100
 *
 * Output channels in [0, 255], rounded to integers.
 */
export function HSLToRGB({ hue, saturation, lightness }: HSLColor): RGBColor {
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  if (s === 0) {
    // achromatic (gray)
    const val = Math.round(l * 255);
    return { red: val, green: val, blue: val };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = hueToRGB(p, q, h + 1 / 3);
  const g = hueToRGB(p, q, h);
  const b = hueToRGB(p, q, h - 1 / 3);

  return {
    red: Math.round(r * 255),
    green: Math.round(g * 255),
    blue: Math.round(b * 255),
  };
}

/**
 * Convert an RGBColor to a hex string `#rrggbb`.
 * Input channels expected in [0, 255].
 */
export function RGBToHex({ red, green, blue }: RGBColor): string {
  const toHex = (n: number) => {
    // clamp to [0,255] and convert to two-digit hex
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    const hex = clamped.toString(16).padStart(2, "0");
    return hex;
  };
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

/**
 * Convert HSL to hex `#rrggbb` by delegating to HSLToRGB -> RGBToHex.
 */
export function HSLToHex(hsl: HSLColor): string {
  const rgb = HSLToRGB(hsl);
  return RGBToHex(rgb);
}

/**
 * Parse a hex color string `#rrggbb` or `#rgb` (case-insensitive) into RGBColor.
 * Throws on invalid input.
 */
export function hexToRGB(hex: string): RGBColor {
  if (typeof hex !== "string") {
    throw new TypeError("hex must be a string");
  }

  const sanitized = hex.trim().replace(/^#/, "");
  if (sanitized.length !== 3 && sanitized.length !== 6) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }
  if (sanitized.length === 3) {
    const r = parseInt(sanitized[0] + sanitized[0], 16);
    const g = parseInt(sanitized[1] + sanitized[1], 16);
    const b = parseInt(sanitized[2] + sanitized[2], 16);
    return { red: r, green: g, blue: b };
  } else if (sanitized.length === 6) {
    const r = parseInt(sanitized.slice(0, 2), 16);
    const g = parseInt(sanitized.slice(2, 4), 16);
    const b = parseInt(sanitized.slice(4, 6), 16);
    return { red: r, green: g, blue: b };
  }

  throw new Error(`Invalid hex color: "${hex}"`);
}

/**
 * Convert a hex color string to HSLColor (via hexToRGB -> RGBToHSL).
 */
export function hexToHSL(hex: string): HSLColor {
  const rgb = hexToRGB(hex);
  return RGBToHSL(rgb);
}
