import { oklabTo8bit, oklchTo8bit } from "./color-utils";

export type SliderDef = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
};

export type ColorSpaceDef = {
  id: string;
  name: string;
  xLabel: string;
  yLabel: string;
  /** Key in params that controls the x-axis range half-width (oklab) or max value (oklch chroma) */
  xRangeKey: string;
  /** Key in params that controls the y-axis range half-width (oklab) or max value (oklch hue) */
  yRangeKey: string;
  lightnessKey: string;
  defaultParams: Record<string, number>;
  sliders: SliderDef[];
  toRGB: (lightness: number, xVal: number, yVal: number) => [number, number, number];
  toCSS: (lightness: number, xVal: number, yVal: number) => string;
};

export const oklab: ColorSpaceDef = {
  id: "oklab",
  name: "OKLab",
  xLabel: "a",
  yLabel: "b",
  xRangeKey: "aRange",
  yRangeKey: "bRange",
  lightnessKey: "lightness",
  defaultParams: { lightness: 0.75, aRange: 0.4, bRange: 0.4 },
  sliders: [
    { key: "lightness", label: "Lightness", min: 0, max: 1, step: 0.01 },
    { key: "aRange", label: "a range", min: 0.1, max: 0.5, step: 0.01 },
    { key: "bRange", label: "b range", min: 0.1, max: 0.5, step: 0.01 },
  ],
  toRGB: oklabTo8bit,
  toCSS: (l, a, b) => `oklab(${l.toFixed(3)} ${a.toFixed(3)} ${b.toFixed(3)})`,
};

export const oklch: ColorSpaceDef = {
  id: "oklch",
  name: "OKLCh",
  xLabel: "chroma",
  yLabel: "hue",
  // xVal will be mapped 0..chromaMax (one-sided: always positive)
  // yVal will be mapped 0..360 degrees
  xRangeKey: "chromaMax",
  yRangeKey: "hueMax",
  lightnessKey: "lightness",
  defaultParams: { lightness: 0.75, chromaMax: 0.37, hueMax: 360 },
  sliders: [
    { key: "lightness", label: "Lightness", min: 0, max: 1, step: 0.01 },
    { key: "chromaMax", label: "Max chroma", min: 0.05, max: 0.4, step: 0.005 },
  ],
  toRGB: oklchTo8bit,
  toCSS: (l, c, h) => `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`,
};
