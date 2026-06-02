import { defineNeighbor } from "../../manipulation-factories";
import { clamp, getPixel } from "./helpers";

export const edgeDetect = defineNeighbor(
  "edge-detect",
  1,
  ({ source, destination, width, height }) => {
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    const half = 1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const gradientX = [0, 0, 0];
        const gradientY = [0, 0, 0];
        for (let ky = 0; ky < 3; ky++) {
          for (let kx = 0; kx < 3; kx++) {
            const wx = sobelX[ky * 3 + kx] ?? 0;
            const wy = sobelY[ky * 3 + kx] ?? 0;
            for (let c = 0; c < 3; c++) {
              gradientX[c] += getPixel(source, x + kx - half, y + ky - half, width, height, c) * wx;
              gradientY[c] += getPixel(source, x + kx - half, y + ky - half, width, height, c) * wy;
            }
          }
        }
        const i = (y * width + x) * 4;
        for (let c = 0; c < 3; c++) {
          destination[i + c] = clamp(
            Math.sqrt(gradientX[c] * gradientX[c] + gradientY[c] * gradientY[c])
          );
        }
        destination[i + 3] = getPixel(source, x, y, width, height, 3);
      }
    }
  },
  {
    name: "Edge Detect",
    description: "Detects edges using the Sobel operator.",
    defaultArgs: {},
    argDefinitions: [],
  }
);
