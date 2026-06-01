import { defineNeighbor } from "../../manipulation-factories";
import { clamp, getPixel } from "./helpers";

export const edgeDetect = defineNeighbor("edge-detect", 1, (src, dest, width, height) => {
  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
  const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
  const half = 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let gxR = 0, gyR = 0, gxG = 0, gyG = 0, gxB = 0, gyB = 0;
      for (let ky = 0; ky < 3; ky++) {
        for (let kx = 0; kx < 3; kx++) {
          const wx = sobelX[ky * 3 + kx] ?? 0;
          const wy = sobelY[ky * 3 + kx] ?? 0;
          gxR += getPixel(src, x + kx - half, y + ky - half, width, height, 0) * wx;
          gyR += getPixel(src, x + kx - half, y + ky - half, width, height, 0) * wy;
          gxG += getPixel(src, x + kx - half, y + ky - half, width, height, 1) * wx;
          gyG += getPixel(src, x + kx - half, y + ky - half, width, height, 1) * wy;
          gxB += getPixel(src, x + kx - half, y + ky - half, width, height, 2) * wx;
          gyB += getPixel(src, x + kx - half, y + ky - half, width, height, 2) * wy;
        }
      }
      const i = (y * width + x) * 4;
      dest[i] = clamp(Math.sqrt(gxR * gxR + gyR * gyR));
      dest[i + 1] = clamp(Math.sqrt(gxG * gxG + gyG * gyG));
      dest[i + 2] = clamp(Math.sqrt(gxB * gxB + gyB * gyB));
      dest[i + 3] = getPixel(src, x, y, width, height, 3);
    }
  }
});
