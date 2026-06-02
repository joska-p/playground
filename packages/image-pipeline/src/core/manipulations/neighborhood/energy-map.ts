import { defineNeighbor } from "../../manipulation-factories";
import { clamp, getPixel } from "./helpers";

export const energyMap = defineNeighbor(
  "energy-map",
  1,
  ({ source, destination, width, height }) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const getLuminance = (px: number, py: number): number => {
          return (
            0.299 * getPixel(source, px, py, width, height, 0) +
            0.587 * getPixel(source, px, py, width, height, 1) +
            0.114 * getPixel(source, px, py, width, height, 2)
          );
        };

        const gx =
          -1 * getLuminance(x - 1, y - 1) +
          1 * getLuminance(x + 1, y - 1) +
          -2 * getLuminance(x - 1, y) +
          2 * getLuminance(x + 1, y) +
          -1 * getLuminance(x - 1, y + 1) +
          1 * getLuminance(x + 1, y + 1);

        const gy =
          -1 * getLuminance(x - 1, y - 1) +
          -2 * getLuminance(x, y - 1) +
          -1 * getLuminance(x + 1, y - 1) +
          1 * getLuminance(x - 1, y + 1) +
          2 * getLuminance(x, y + 1) +
          1 * getLuminance(x + 1, y + 1);

        const energy = clamp(Math.sqrt(gx * gx + gy * gy));
        const i = (y * width + x) * 4;
        destination[i] = energy;
        destination[i + 1] = energy;
        destination[i + 2] = energy;
        destination[i + 3] = 255;
      }
    }
  },
  {
    name: "Energy Map",
    description: "Computes the Sobel energy map for seam carving.",
    defaultArgs: {},
    argDefinitions: [],
  }
);
