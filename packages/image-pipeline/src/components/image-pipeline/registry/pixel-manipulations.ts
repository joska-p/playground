import type { ManipulationDefinition, PixelFn } from "../image-pipeline.types";

const wrapPixelFunction = (fn: PixelFn) => fn;

export const PIXEL_MANIPULATIONS: ManipulationDefinition[] = [
  {
    id: "brightness",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a, options) => {
      const v = (options["value"] as number) ?? 1;
      return [r * v, g * v, b * v, a];
    }),
  },
  {
    id: "contrast",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a, options) => {
      const v = (options["value"] as number) ?? 1;
      return [(r - 128) * v + 128, (g - 128) * v + 128, (b - 128) * v + 128, a];
    }),
  },
  {
    id: "grayscale",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a) => {
      const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
      return [l, l, l, a];
    }),
  },
  {
    id: "sepia",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a) => [
      r * 0.393 + g * 0.769 + b * 0.189,
      r * 0.349 + g * 0.686 + b * 0.168,
      r * 0.272 + g * 0.534 + b * 0.131,
      a,
    ]),
  },
  {
    id: "invert",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a) => [255 - r, 255 - g, 255 - b, a]),
  },
  {
    id: "saturation",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a, options) => {
      const v = (options["value"] as number) ?? 1;
      const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
      return [l + (r - l) * v, l + (g - l) * v, l + (b - l) * v, a];
    }),
  },
  {
    id: "hue-rotate",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a, options) => {
      const deg = (options["degrees"] as number) ?? 0;
      const angle = (deg * Math.PI) / 180;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const s3 = Math.sqrt(1 / 3);
      const base = (1 - cosA) / 3;
      const nr = r * (cosA + base) + g * (base - s3 * sinA) + b * (base + s3 * sinA);
      const ng = r * (base + s3 * sinA) + g * (cosA + base) + b * (base - s3 * sinA);
      const nb = r * (base - s3 * sinA) + g * (base + s3 * sinA) + b * (cosA + base);
      return [nr, ng, nb, a];
    }),
  },
  {
    id: "opacity",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a, options) => {
      const v = (options["value"] as number) ?? 1;
      return [r, g, b, a * v];
    }),
  },
  {
    id: "threshold",
    type: "pixel",
    fn: wrapPixelFunction((r, g, b, a, options) => {
      const t = (options["threshold"] as number) ?? 128;
      const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const v = l >= t ? 255 : 0;
      return [v, v, v, a];
    }),
  },
];
