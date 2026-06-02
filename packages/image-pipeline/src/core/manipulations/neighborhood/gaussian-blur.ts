import { defineNeighbor } from "../../manipulation-factories";
import { applyKernel } from "./helpers";

export const gaussianBlur = defineNeighbor<{ radius?: number }>(
  "gaussian-blur",
  1,
  ({ options, source, destination, width, height }) => {
    const radius = options.radius ?? 1;
    const size = radius * 2 + 1;
    const sigma = radius / 2 + 0.5;
    const kernel: number[] = [];
    let total = 0;
    for (let ky = 0; ky < size; ky++) {
      for (let kx = 0; kx < size; kx++) {
        const dx = kx - radius,
          dy = ky - radius;
        const v = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
        kernel.push(v);
        total += v;
      }
    }
    applyKernel(source, destination, width, height, kernel, size, total);
  },
  {
    name: "Gaussian Blur",
    description: "Applies a gaussian blur.",
    defaultArgs: { radius: 1 },
    argDefinitions: [{ key: "radius", label: "Radius", min: 1, max: 10, step: 1 }],
  }
);
