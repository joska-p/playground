import type { PixelCallback, PixelContext } from "../core/pixel.types";

/**
 * Computes a Sobel energy map — a fork example.
 * Each pixel's value represents how much it "matters" structurally.
 * High energy = strong edge. Low energy = safe to remove (seam carving).
 *
 * Uses `sourceData` to read neighbours without being affected by
 * previously modified pixels in the same pass.
 *
 * Usage:
 *   const energyMap = fork(computeEnergy)(imageData)
 */
const callback = (): PixelCallback => (ctx: PixelContext) => {
  const { x, y, width, height, sourceData } = ctx;

  const getPixelLuminance = (px: number, py: number): number => {
    const clampedX = Math.max(0, Math.min(width - 1, px));
    const clampedY = Math.max(0, Math.min(height - 1, py));
    const i = (clampedY * width + clampedX) * 4;
    // Luminance of the source pixel
    return 0.299 * sourceData[i] + 0.587 * sourceData[i + 1] + 0.114 * sourceData[i + 2];
  };

  // Sobel operator — measures gradient in x and y directions
  const gx =
    -1 * getPixelLuminance(x - 1, y - 1) +
    1 * getPixelLuminance(x + 1, y - 1) +
    -2 * getPixelLuminance(x - 1, y) +
    2 * getPixelLuminance(x + 1, y) +
    -1 * getPixelLuminance(x - 1, y + 1) +
    1 * getPixelLuminance(x + 1, y + 1);

  const gy =
    -1 * getPixelLuminance(x - 1, y - 1) +
    -2 * getPixelLuminance(x, y - 1) +
    -1 * getPixelLuminance(x + 1, y - 1) +
    1 * getPixelLuminance(x - 1, y + 1) +
    2 * getPixelLuminance(x, y + 1) +
    1 * getPixelLuminance(x + 1, y + 1);

  const energy = Math.sqrt(gx * gx + gy * gy);

  return { r: energy, g: energy, b: energy, a: 255 };
};

const energyMap = {
  name: "energyMap",
  description: "Computes the energy map of an image.",
  callback,
} as const;

export { energyMap };
