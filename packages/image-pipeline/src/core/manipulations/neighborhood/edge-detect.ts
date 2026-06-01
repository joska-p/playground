import { defineNeighbor } from "../../manipulation-factories";
import { clamp, getPixel } from "./helpers";

export const edgeDetect = defineNeighbor("edge-detect", 1, (_, src, dest, width, height) => {
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  const half = 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const gx = [0, 0, 0],
        gy = [0, 0, 0];
      for (let ky = 0; ky < 3; ky++) {
        for (let kx = 0; kx < 3; kx++) {
          const wx = sobelX[ky * 3 + kx] ?? 0;
          const wy = sobelY[ky * 3 + kx] ?? 0;
          for (let c = 0; c < 3; c++) {
            gx[c] += getPixel(src, x + kx - half, y + ky - half, width, height, c) * wx;
            gy[c] += getPixel(src, x + kx - half, y + ky - half, width, height, c) * wy;
          }
        }
      }
      const i = (y * width + x) * 4;
      for (let c = 0; c < 3; c++) {
        dest[i + c] = clamp(Math.sqrt(gx[c] * gx[c] + gy[c] * gy[c]));
      }
      dest[i + 3] = getPixel(src, x, y, width, height, 3);
    }
  }
});
