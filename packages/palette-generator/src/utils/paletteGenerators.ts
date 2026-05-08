import type { Palette, BaseColor } from "../store/usePaletteStore.js";

interface AnalogousParams {
  split: number;
  length: number;
}

function generateAnalogous(baseColor: BaseColor, { split, length }: AnalogousParams): Palette {
  const { hue, saturation, lightness } = baseColor;
  const palette: Palette = [];
  const angle = 30;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    const newHue = (((hue + i * angle) % 360) + split * Math.sign(i)) % 360;
    palette.push({
      hue: ((newHue % 360) + 360) % 360,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

interface ComplementaryParams {
  split: number;
  length: number;
}

function generateComplementary(baseColor: BaseColor, { split, length }: ComplementaryParams): Palette {
  const { hue, saturation, lightness } = baseColor;
  const palette: Palette = [];
  const angle = 180;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    const currentHue = (((hue + i * angle) % 360) + split * Math.sign(i)) % 360;
    palette.push({
      hue: ((currentHue % 360) + 360) % 360,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

interface MonochromaticParams {
  angle: number;
  length: number;
}

function generateMonochromatic(baseColor: BaseColor, { angle, length }: MonochromaticParams): Palette {
  const { hue, saturation, lightness } = baseColor;
  const palette: Palette = [];

  const min = 5;
  const max = 95;

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    const currentLightness = (lightness + i * angle) % 100;
    const currentLightnessClamped = Math.min(Math.max(currentLightness, min), max);
    palette.push({
      hue,
      saturation,
      lightness: currentLightnessClamped,
    });
  }

  return palette.sort((a, b) => a.lightness - b.lightness);
}

interface XadicParams {
  angle: number;
  length: number;
}

function generateXadic(baseColor: BaseColor, { angle, length }: XadicParams): Palette {
  const { hue, saturation, lightness } = baseColor;
  const palette: Palette = [];

  for (let i = -Math.floor(length / 2); i < Math.ceil(length / 2); i++) {
    const newHue = (hue + i * angle + 360) % 360;
    palette.push({
      hue: newHue,
      saturation,
      lightness,
    });
  }

  return palette.sort((a, b) => a.hue - b.hue);
}

export type { AnalogousParams, ComplementaryParams, MonochromaticParams, XadicParams };
export { generateAnalogous, generateComplementary, generateMonochromatic, generateXadic };
