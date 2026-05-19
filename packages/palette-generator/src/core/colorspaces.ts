import Color from "colorjs.io";

export type Axis = { label: string; min: number; max: number; step?: number };

export type ColorSpaceDef = {
  id: string;
  name: string;
  description?: string;
  xAxis: Axis;
  yAxis: Axis;
  zSlider: Axis; // The control for the "slice" depth
  getColor: (x: number, y: number, z: number) => Color;
};

export const oklab: ColorSpaceDef = {
  id: "oklab",
  name: "OKLab",
  description: "OKLab color space",
  xAxis: { label: "a (green-red)", min: -0.4, max: 0.4 },
  yAxis: { label: "b (blue-yellow)", min: -0.4, max: 0.4 },
  zSlider: { label: "Lightness", min: 0, max: 1, step: 0.01 },
  getColor: (x, y, z) => new Color("oklab", [z, x, y]),
};

export const oklch: ColorSpaceDef = {
  id: "oklch",
  name: "OKLCh",
  description: "OKLCh color space",
  xAxis: { label: "Chroma", min: 0, max: 0.4 },
  yAxis: { label: "Hue", min: 0, max: 360 },
  zSlider: { label: "Lightness", min: 0, max: 1, step: 0.01 },
  getColor: (x, y, z) => new Color("oklch", [z, x, y]),
};

export const hsl: ColorSpaceDef = {
  id: "hsl",
  name: "HSL",
  description: "HSL color space",
  xAxis: { label: "Hue", min: 0, max: 360 },
  yAxis: { label: "Saturation", min: 0, max: 100 },
  zSlider: { label: "Lightness", min: 0, max: 100, step: 1 },
  getColor: (x, y, z) => new Color("hsl", [x, y, z]),
};

export const srgb: ColorSpaceDef = {
  id: "srgb",
  name: "sRGB",
  description: "sRGB color space",
  xAxis: { label: "Red", min: 0, max: 255 },
  yAxis: { label: "Green", min: 0, max: 255 },
  zSlider: { label: "Blue", min: 0, max: 255, step: 1 },
  getColor: (x, y, z) => new Color("srgb", [x / 255, y / 255, z / 255]),
};

export const COLOR_SPACES = { oklab, oklch, hsl, srgb };
