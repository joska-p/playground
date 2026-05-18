import {
  lobToRgb,
  labToPickResult,
  hslToPickResult,
  lchToPickResult,
  lchToRgb,
  hslToRgb,
  rgbToRgb,
  rgbToPickResult,
} from "../core/color-api";
import type { PickResult } from "../core/color-api";
import type { BaseColor } from "../core/rules";

export type Axis = { label: string; min: number; max: number; step?: number };

export type ColorSpaceDef = {
  id: string;
  name: string;
  description?: string;
  xAxis: Axis;
  yAxis: Axis;
  zSlider: Axis; // The control for the "slice" depth
  toRGB: (x: number, y: number, z: number) => BaseColor;
  toPickResult: (x: number, y: number, z: number) => PickResult;
};

export const lab: ColorSpaceDef = {
  id: "lab",
  name: "OKLab",
  description: "OKLab color space",
  xAxis: { label: "a (green-red)", min: -0.4, max: 0.4 },
  yAxis: { label: "b (blue-yellow)", min: -0.4, max: 0.4 },
  zSlider: { label: "Lightness", min: 0, max: 1, step: 0.01 },
  toRGB: (x, y, z) => lobToRgb({ lightness: z, a: x, b: y }),
  toPickResult: (x, y, z) => labToPickResult({ lightness: z, a: x, b: y }),
};

export const lch: ColorSpaceDef = {
  id: "lch",
  name: "OKLCh",
  description: "OKLCh color space",
  xAxis: { label: "Chroma", min: 0, max: 0.4 },
  yAxis: { label: "Hue", min: 0, max: 360 },
  zSlider: { label: "Lightness", min: 0, max: 1, step: 0.01 },
  toRGB: (x, y, z) => lchToRgb({ lightness: z, chroma: x, hue: y }),
  toPickResult: (x, y, z) => lchToPickResult({ lightness: z, chroma: x, hue: y }),
};

export const hsl: ColorSpaceDef = {
  id: "hsl",
  name: "HSL",
  description: "HSL color space",
  xAxis: { label: "Hue", min: 0, max: 360 },
  yAxis: { label: "Saturation", min: 0, max: 100 },
  zSlider: { label: "Lightness", min: 0, max: 100, step: 1 },
  toRGB: (x, y, z) => hslToRgb({ hue: x, saturation: y, lightness: z }),
  toPickResult: (x, y, z) => hslToPickResult({ hue: x, saturation: y, lightness: z }),
};

export const rgb: ColorSpaceDef = {
  id: "rgb",
  name: "RGB",
  description: "RGB color space",
  xAxis: { label: "Red", min: 0, max: 255 },
  yAxis: { label: "Green", min: 0, max: 255 },
  zSlider: { label: "Blue", min: 0, max: 255, step: 1 },
  toRGB: (x, y, z) => rgbToRgb({ red: x, green: y, blue: z }),
  toPickResult: (x, y, z) => rgbToPickResult({ red: x, green: y, blue: z }),
};

export const COLOR_SPACES = { lab, lch, hsl, rgb };
