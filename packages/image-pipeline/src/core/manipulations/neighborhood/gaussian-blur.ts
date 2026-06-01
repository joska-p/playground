import type { ManipulationDefinition, NeighborhoodFn } from "../../image-pipeline.types";
import { applyKernel } from "./helpers";

export const gaussianBlur: ManipulationDefinition = {
  id: "gaussian-blur",
  type: "neighborhood",
  radius: 1,
  fn: ((src, dest, width, height, options) => {
    const radius = (options["radius"] as number) ?? 1;
    const size = radius * 2 + 1;
    const sigma = radius / 2 + 0.5;
    const kernel: number[] = [];
    let total = 0;
    for (let ky = 0; ky < size; ky++) {
      for (let kx = 0; kx < size; kx++) {
        const dx = kx - radius, dy = ky - radius;
        const v = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        kernel.push(v);
        total += v;
      }
    }
    applyKernel(src, dest, width, height, kernel, size, total);
  }) as NeighborhoodFn,
};
