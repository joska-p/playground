import { defineNeighbor } from "../../manipulation-factories";
import { applyKernel } from "./helpers";

export const boxBlur = defineNeighbor<{ radius?: number }>(
  "box-blur",
  1,
  ({ options, source, destination, width, height }) => {
    const radius = options.radius ?? 1;
    const size = radius * 2 + 1;
    applyKernel(
      source,
      destination,
      width,
      height,
      new Array<number>(size * size).fill(1),
      size,
      size * size
    );
  }
);
