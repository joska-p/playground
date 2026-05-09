import type { HSLColor } from "../utils/colorConversions.js";
import type { Palette } from "./config.js";

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
};

function normHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

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

function generatePalette(baseColor: HSLColor, params: GeneratorParams): Palette {
  const hues = generateHues(params.scheme, baseColor.hue, params.count, params.angle);

  return {
    id: `palette-${hues.reduce((acc, hue) => acc + hue, 0)}`,
    colors: hues.map((hue, i) => ({
      hue,
      saturation: baseColor.saturation,
      lightness:
        params.scheme === "monochromatic"
          ? varyLightness(i, params.count, baseColor.lightness, params.lightnessSpread)
          : baseColor.lightness,
    })),
  };
}

function interpolatePalette(colors: HSLColor[], count: number): Palette {
  if (colors.length === 0) return { id: "0", colors: [] };
  if (colors.length === 1)
    return { id: "1", colors: Array.from({ length: count }, () => ({ ...colors[0]! })) };
  if (count <= colors.length) return { id: "2", colors: colors.slice(0, count) };

  const paletteId = `palette-${colors.reduce((acc, color) => acc + color.hue, 0)}`;
  const palette: Palette = { id: paletteId, colors: [] };
  const segments = colors.length - 1;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const segIndex = Math.min(Math.floor(t * segments), segments - 1);
    const localT = t * segments - segIndex;

    const a = colors[segIndex]!;
    const b = colors[segIndex + 1]!;

    let hueDiff = b.hue - a.hue;
    if (hueDiff > 180) hueDiff -= 360;
    if (hueDiff < -180) hueDiff += 360;

    palette.colors.push({
      hue: normHue(a.hue + hueDiff * localT),
      saturation: a.saturation + (b.saturation - a.saturation) * localT,
      lightness: a.lightness + (b.lightness - a.lightness) * localT,
    });
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
