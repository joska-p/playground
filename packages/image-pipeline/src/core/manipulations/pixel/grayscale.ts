import type { ManipulationDefinition, PixelFn } from "../../image-pipeline.types";

export const grayscale: ManipulationDefinition = {
  id: "grayscale",
  type: "pixel",
  fn: ((r, g, b, a) => {
    const l = r * 0.2126 + g * 0.7152 + b * 0.0722;
    return [l, l, l, a];
  }) as PixelFn,
};
