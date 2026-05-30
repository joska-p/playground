import { registerManipulation } from "./index";
import type { PixelFn } from "./types";

const pixelFn = (fn: PixelFn) => fn;

// ─── Brightness ───────────────────────────────────────────────────────────────
registerManipulation({
  id: "brightness",
  type: "pixel",
  fn: pixelFn((r, g, b, a, opts) => {
    const v = (opts["value"] as number) ?? 1;
    return [r * v, g * v, b * v, a];
  }),
});

// ─── Contrast ─────────────────────────────────────────────────────────────────
registerManipulation({
  id: "contrast",
  type: "pixel",
  fn: pixelFn((r, g, b, a, opts) => {
    const v = (opts["value"] as number) ?? 1;
    return [(r - 128) * v + 128, (g - 128) * v + 128, (b - 128) * v + 128, a];
  }),
});

// ─── Grayscale ────────────────────────────────────────────────────────────────
registerManipulation({
  id: "grayscale",
  type: "pixel",
  fn: pixelFn((r, g, b, a) => {
    const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
    return [l, l, l, a];
  }),
});

// ─── Sepia ────────────────────────────────────────────────────────────────────
registerManipulation({
  id: "sepia",
  type: "pixel",
  fn: pixelFn((r, g, b, a) => [
    r * 0.393 + g * 0.769 + b * 0.189,
    r * 0.349 + g * 0.686 + b * 0.168,
    r * 0.272 + g * 0.534 + b * 0.131,
    a,
  ]),
});

// ─── Invert ───────────────────────────────────────────────────────────────────
registerManipulation({
  id: "invert",
  type: "pixel",
  fn: pixelFn((r, g, b, a) => [255 - r, 255 - g, 255 - b, a]),
});

// ─── Saturation ───────────────────────────────────────────────────────────────
registerManipulation({
  id: "saturation",
  type: "pixel",
  fn: pixelFn((r, g, b, a, opts) => {
    const v = (opts["value"] as number) ?? 1;
    const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
    return [l + (r - l) * v, l + (g - l) * v, l + (b - l) * v, a];
  }),
});

// ─── Hue rotate ───────────────────────────────────────────────────────────────
registerManipulation({
  id: "hue-rotate",
  type: "pixel",
  fn: pixelFn((r, g, b, a, opts) => {
    const deg = (opts["degrees"] as number) ?? 0;
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
});

// ─── Opacity ──────────────────────────────────────────────────────────────────
registerManipulation({
  id: "opacity",
  type: "pixel",
  fn: pixelFn((r, g, b, a, opts) => {
    const v = (opts["value"] as number) ?? 1;
    return [r, g, b, a * v];
  }),
});

// ─── Threshold ────────────────────────────────────────────────────────────────
registerManipulation({
  id: "threshold",
  type: "pixel",
  fn: pixelFn((r, g, b, a, opts) => {
    const t = (opts["threshold"] as number) ?? 128;
    const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const v = l >= t ? 255 : 0;
    return [v, v, v, a];
  }),
});
