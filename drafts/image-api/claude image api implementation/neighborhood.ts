import { registerManipulation } from "../index";
import type { NeighborhoodFn } from "../types";

const neighborFn = (fn: NeighborhoodFn) => fn;

function clamp(v: number): number {
  return Math.max(0, Math.min(255, v));
}

function getPixel(
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number,
  channel: number
): number {
  const cx = Math.max(0, Math.min(width - 1, x));
  const cy = Math.max(0, Math.min(height - 1, y));
  return data[(cy * width + cx) * 4 + channel] ?? 0;
}

function applyKernel(
  src: Uint8ClampedArray,
  dest: Uint8ClampedArray,
  width: number,
  height: number,
  kernel: number[],
  kernelSize: number,
  divisor: number
): void {
  const half = Math.floor(kernelSize / 2);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0;
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const w = kernel[ky * kernelSize + kx] ?? 0;
          r += getPixel(src, x + kx - half, y + ky - half, width, height, 0) * w;
          g += getPixel(src, x + kx - half, y + ky - half, width, height, 1) * w;
          b += getPixel(src, x + kx - half, y + ky - half, width, height, 2) * w;
        }
      }
      const a = getPixel(src, x, y, width, height, 3);
      const i = (y * width + x) * 4;
      dest[i] = clamp(r / divisor);
      dest[i + 1] = clamp(g / divisor);
      dest[i + 2] = clamp(b / divisor);
      dest[i + 3] = a;
    }
  }
}

// ─── Gaussian blur ────────────────────────────────────────────────────────────
registerManipulation({
  id: "gaussian-blur",
  type: "neighborhood",
  radius: 1,
  fn: neighborFn((src, dest, width, height, opts) => {
    const radius = (opts["radius"] as number) ?? 1;
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
    applyKernel(src, dest, width, height, kernel, size, total);
  }),
});

// ─── Box blur ─────────────────────────────────────────────────────────────────
registerManipulation({
  id: "box-blur",
  type: "neighborhood",
  radius: 1,
  fn: neighborFn((src, dest, width, height, opts) => {
    const radius = (opts["radius"] as number) ?? 1;
    const size = radius * 2 + 1;
    applyKernel(
      src,
      dest,
      width,
      height,
      new Array<number>(size * size).fill(1),
      size,
      size * size
    );
  }),
});

// ─── Sharpen ─────────────────────────────────────────────────────────────────
registerManipulation({
  id: "sharpen",
  type: "neighborhood",
  radius: 1,
  fn: neighborFn((src, dest, width, height, opts) => {
    const s = (opts["strength"] as number) ?? 1;
    const kernel = [0, -s, 0, -s, 1 + 4 * s, -s, 0, -s, 0];
    applyKernel(src, dest, width, height, kernel, 3, 1);
  }),
});

// ─── Edge detect (Sobel) ──────────────────────────────────────────────────────
registerManipulation({
  id: "edge-detect",
  type: "neighborhood",
  radius: 1,
  fn: neighborFn((src, dest, width, height) => {
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    const half = 1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let gxR = 0,
          gyR = 0,
          gxG = 0,
          gyG = 0,
          gxB = 0,
          gyB = 0;
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
  }),
});
