/**
 * Color-palette handling for mapping expression values to pixels.
 *
 * An expression value v in [-1, 1] is normalized to t in [0, 1] and mapped onto
 * a palette by linear interpolation between adjacent stops. When no palette is
 * supplied we fall back to a grayscale gradient, as specified by the task.
 */

export type RGB = {
  r: number;
  g: number;
  b: number;
}

/** Parse a `#rgb` or `#rrggbb` hex color into RGB (0-255). */
export function parseHex(hex: string): RGB {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/**
 * Build a color mapper from a palette of hex strings.
 *
 * @param palette Optional list of hex colors. If omitted or empty, a grayscale
 *                gradient (black -> white) is used.
 * @returns A function mapping v in [-1, 1] to an RGB triple.
 */
export function makeColorMapper(palette?: string[]): (v: number) => RGB {
  const stops: RGB[] =
    palette && palette.length > 0
      ? palette.map(parseHex)
      : [
          { r: 0, g: 0, b: 0 },
          { r: 255, g: 255, b: 255 },
        ];

  if (stops.length === 1) {
    const only = stops[0]!;
    return () => only;
  }

  return (v: number): RGB => {
    const t = Math.min(1, Math.max(0, (v + 1) / 2));
    const scaled = t * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(scaled));
    const frac = scaled - i;
    const a = stops[i]!;
    const b = stops[i + 1]!;
    return {
      r: Math.round(a.r + (b.r - a.r) * frac),
      g: Math.round(a.g + (b.g - a.g) * frac),
      b: Math.round(a.b + (b.b - a.b) * frac),
    };
  };
}
