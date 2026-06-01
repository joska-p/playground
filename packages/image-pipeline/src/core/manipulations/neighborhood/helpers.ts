export function clamp(v: number): number {
  return Math.max(0, Math.min(255, v));
}

export function getPixel(
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

export function applyKernel(
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
      let r = 0, g = 0, b = 0;
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
