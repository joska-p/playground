import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const hueRotate: ManipulationDefinition = {
  id: "hue-rotate",
  type: "pixel",
  fn: ((r, g, b, a, options) => {
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
  }) as PixelFn,
};
