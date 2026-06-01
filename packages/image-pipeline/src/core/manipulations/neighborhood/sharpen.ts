import { defineNeighbor } from "../../manipulation-factories";
import { applyKernel } from "./helpers";

export const sharpen = defineNeighbor<{ strength?: number }>(
  "sharpen",
  1,
  ({ options, source, destination, width, height }) => {
    const strength = options.strength ?? 1;
    const kernel = [0, -strength, 0, -strength, 1 + 4 * strength, -strength, 0, -strength, 0];
    applyKernel(source, destination, width, height, kernel, 3, 1);
  }
);
