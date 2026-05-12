import {
  oklabToRgb,
  oklabToPickResult,
  hslToPickResult,
  hsvToPickResult,
  oklchToPickResult,
  oklchToRgb,
  hslToRgb,
  hsvToRgb,
} from "../utils/color-utils";
import type { PickResult } from "../utils/color-utils";

export type Axis = { label: string; min: number; max: number; step?: number };

export type ColorSpaceDef = {
  id: string;
  name: string;
  description?: string;
  xAxis: Axis;
  yAxis: Axis;
  zSlider: Axis; // The control for the "slice" depth
  toRGB: (x: number, y: number, z: number) => [number, number, number];
  toPickResult: (x: number, y: number, z: number) => PickResult;
};

export const oklab: ColorSpaceDef = {
  id: "oklab",
  name: "OKLab",
  description: "OKLab color space",
  xAxis: { label: "a (green-red)", min: -0.4, max: 0.4 },
  yAxis: { label: "b (blue-yellow)", min: -0.4, max: 0.4 },
  zSlider: { label: "Lightness", min: 0, max: 1, step: 0.01 },
  toRGB: (a, b, l) => oklabToRgb(l, a, b),
  toPickResult: (a, b, l) => oklabToPickResult(l, a, b),
};

export const oklch: ColorSpaceDef = {
  id: "oklch",
  name: "OKLCh",
  description: "OKLCh color space",
  xAxis: { label: "Chroma", min: 0, max: 0.4 },
  yAxis: { label: "Hue", min: 0, max: 360 },
  zSlider: { label: "Lightness", min: 0, max: 1, step: 0.01 },
  toRGB: (c, h, l) => oklchToRgb(l, c, h),
  toPickResult: (c, h, l) => oklchToPickResult(l, c, h),
};

export const hsl: ColorSpaceDef = {
  id: "hsl",
  name: "HSL",
  description: "HSL color space",
  xAxis: { label: "Hue", min: 0, max: 360 },
  yAxis: { label: "Saturation", min: 0, max: 100 },
  zSlider: { label: "Lightness", min: 0, max: 100, step: 1 },
  toRGB: (h, s, l) => hslToRgb(h, s, l),
  toPickResult: (h, s, l) => hslToPickResult(h, s, l),
};

export const hsv: ColorSpaceDef = {
  id: "hsv",
  name: "HSV",
  description: "HSV color space",
  xAxis: { label: "Hue", min: 0, max: 360 },
  yAxis: { label: "Saturation", min: 0, max: 100 },
  zSlider: { label: "Value", min: 0, max: 100, step: 1 },
  toRGB: (h, s, v) => hsvToRgb(h, s, v),
  toPickResult: (h, s, v) => hsvToPickResult(h, s, v),
};

export const COLOR_SPACES = { oklab, oklch, hsl, hsv };
