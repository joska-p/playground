import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const threshold: ManipulationDefinition = {
  id: "threshold",
  type: "pixel",
  fn: ((r, g, b, a, options) => {
    const t = (options["threshold"] as number) ?? 128;
    const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const v = l >= t ? 255 : 0;
    return [v, v, v, a];
  }) as PixelFn,
};
